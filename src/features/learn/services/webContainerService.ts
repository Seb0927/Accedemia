import { WebContainer, FileSystemTree } from "@webcontainer/api";

// Constants for localStorage
const LS_WEBCONTAINER_FILES = "accedemia_webcontainer_files";
const LS_WEBCONTAINER_LAST_MODIFIED = "accedemia_webcontainer_last_modified";

// Helper to check if code is running in browser
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

export type WebContainerStatus = {
  status: string;
  error: string | null;
  isLoading: boolean;
  serverUrl?: string;
};

export type FileEntry = {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileEntry[];
};

type StatusCallback = (status: WebContainerStatus) => void;

export class WebContainerService {
  private instance: WebContainer | null = null;
  private statusCallback: StatusCallback | null = null;

  constructor() {
    this.updateStatus = this.updateStatus.bind(this);
  }

  private updateStatus(status: Partial<WebContainerStatus>) {
    if (this.statusCallback) {
      this.statusCallback({
        status: "Inactivo",
        error: null,
        isLoading: false,
        ...status,
      });
    }
  }

  public setStatusCallback(callback: StatusCallback) {
    this.statusCallback = callback;
  }

  // Check if there are saved files in localStorage
  private hasSavedFiles(): boolean {
    if (!isBrowser) {return false;}
    return localStorage.getItem(LS_WEBCONTAINER_FILES) !== null;
  }

  // Load files from localStorage
  private loadFilesFromStorage(): FileSystemTree | null {
    if (!isBrowser) {return null;}

    try {
      const savedFiles = localStorage.getItem(LS_WEBCONTAINER_FILES);
      if (savedFiles) {
        return JSON.parse(savedFiles) as FileSystemTree;
      }
    } catch (error) {
      console.error("Error loading files from localStorage:", error);
    }
    return null;
  }

  // Save the current file system to localStorage
  public async saveFilesToStorage(): Promise<boolean> {
    if (!isBrowser) {return false;}
    if (!this.instance) {
      console.error("Cannot save files: WebContainer not initialized");
      return false;
    }

    try {
      // Get file system structure directly in the required format
      const files = await this.getFileSystemTree("/");

      // Save to localStorage
      localStorage.setItem(LS_WEBCONTAINER_FILES, JSON.stringify(files));
      localStorage.setItem(LS_WEBCONTAINER_LAST_MODIFIED, Date.now().toString());
      return true;
    } catch (error) {
      console.error("Error saving files to localStorage:", error);
      return false;
    }
  }

  // Reset to original project state
  public async resetToOriginal(): Promise<boolean> {
    if (!isBrowser) {return false;}

    try {
      // Clear localStorage
      localStorage.removeItem(LS_WEBCONTAINER_FILES);
      localStorage.removeItem(LS_WEBCONTAINER_LAST_MODIFIED);

      // Restart the WebContainer with original files
      this.teardown();
      await this.start(true); // Force using original files

      return true;
    } catch (error) {
      console.error("Error resetting to original files:", error);
      return false;
    }
  }

  // Start the WebContainer
  public async start(forceUseOriginal = false): Promise<WebContainer> {
    try {
      this.updateStatus({ status: "Cargando archivos del proyecto...", isLoading: true });

      let files: FileSystemTree;

      // Check if we should use saved files or load the original
      if (!forceUseOriginal && this.hasSavedFiles()) {
        const savedFiles = this.loadFilesFromStorage();
        if (savedFiles) {
          this.updateStatus({ status: "Cargando archivos guardados...", isLoading: true });
          files = savedFiles;
        } else {
          // Fetch the manifest file if saved files are invalid
          this.updateStatus({ status: "Descargando proyecto original...", isLoading: true });
          files = await this.fetchOriginalFiles();
        }
      } else {
        // Fetch the original manifest
        this.updateStatus({ status: "Descargando proyecto original...", isLoading: true });
        files = await this.fetchOriginalFiles();
      }

      // Boot the WebContainer
      this.updateStatus({ status: "Iniciando WebContainer...", isLoading: true });
      const instance = await WebContainer.boot();
      this.instance = instance;

      // Mount the files
      this.updateStatus({ status: "Montando archivos del proyecto...", isLoading: true });
      await instance.mount(files);

      // Install dependencies
      this.updateStatus({ status: "Instalando dependencias...", isLoading: true });
      const installProcess = await instance.spawn("npm", ["install"]);

      const installExitCode = await installProcess.exit;

      if (installExitCode !== 0) {
        throw new Error("Failed to install dependencies");
      }

      // Start the development server
      this.updateStatus({ status: "Iniciando servidor de desarrollo...", isLoading: true });
      const devProcess = await instance.spawn("npm", ["run", "dev"]);

      // Stream server logs
      devProcess.output.pipeTo(
        new WritableStream({
          write: (data: string) => {
            if (data.includes("Local:")) {
              const urlMatch = data.match(/Local:\s+(http:\/\/localhost:\d+)/);
              if (urlMatch && urlMatch[1]) {
                this.updateStatus({
                  status: `Servidor ejecutándose en ${urlMatch[1]}`,
                  serverUrl: urlMatch[1],
                  isLoading: true,
                });
              }
            }
          },
        }),
      );

      return instance;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al iniciar WebContainer";
      this.updateStatus({
        status: "Error",
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  }

  // Fetch original manifest file - now returns files directly
  private async fetchOriginalFiles(): Promise<FileSystemTree> {
    const response = await fetch("/learning-project-manifest.json");
    if (!response.ok) {
      throw new Error("Failed to fetch project manifest");
    }
    return await response.json() as FileSystemTree;
  }

  // Register a callback for when the server is ready
  public onServerReady(callback: (url: string) => void): void {
    if (!this.instance) {
      console.error("WebContainer not initialized yet");
      return;
    }

    this.instance.on("server-ready", (port: number, url: string) => {
      this.updateStatus({
        status: "Aplicación ejecutándose",
        isLoading: false,
        serverUrl: url,
      });
      callback(url);
    });
  }

 // Recursively get the file tree for UI display (FileExplorer)
  public async getFileTree(path = "/"): Promise<FileEntry[]> {
    if (!this.instance) {
      throw new Error("WebContainer not initialized");
    }

    // Directories to exclude from saving
    const excludedDirs = ["node_modules", ".git", "audio", ".github"];

    try {
      const entries = await this.instance.fs.readdir(path, { withFileTypes: true });
      const result: FileEntry[] = [];

      for (const entry of entries) {
        const entryPath = path === "/" ? `/${entry.name}` : `${path}/${entry.name}`;

        // Skip excluded directories
        if (entry.isDirectory() && excludedDirs.includes(entry.name)) {
          continue;
        }

        if (entry.isDirectory()) {
          const children = await this.getFileTree(entryPath);
          result.push({
            name: entry.name,
            path: entryPath,
            type: "directory",
            children,
          });
        } else {
          result.push({
            name: entry.name,
            path: entryPath,
            type: "file",
          });
        }
      }

      // Sort: directories first, then files, both alphabetically
      return result.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "directory" ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
    } catch (error) {
      console.error(`Error reading directory ${path}:`, error);
      throw error;
    }
  }

  // Read a file's content
  public async readFile(path: string): Promise<string> {
    if (!this.instance) {
      throw new Error("WebContainer not initialized");
    }

    try {
      const file = await this.instance.fs.readFile(path, "utf-8");
      return file;
    } catch (error) {
      console.error(`Error reading file ${path}:`, error);
      throw error;
    }
  }

  // Write content to a file
  public async writeFile(path: string, content: string): Promise<void> {
    if (!this.instance) {
      throw new Error("WebContainer not initialized");
    }

    try {
      await this.instance.fs.writeFile(path, content);
    } catch (error) {
      console.error(`Error writing file ${path}:`, error);
      throw error;
    }
  }

  // Check if WebContainer is ready
  public isReady(): boolean {
    return this.instance !== null;
  }

  // Teardown the WebContainer
  public teardown(): void {
    if (this.instance) {
      this.instance.teardown();
      this.instance = null;
    }
  }

  // Recursively get the full file system tree for WebContainer API
  public async getFileSystemTree(path = "/"): Promise<FileSystemTree> {
    if (!this.instance) {
      throw new Error("WebContainer not initialized");
    }

    // Directories to exclude from saving
    const excludedDirs = ["node_modules", ".git", "audio", ".github", "dist", "build", ".cache"];

    try {
      const entries = await this.instance.fs.readdir(path, { withFileTypes: true });
      const result: FileSystemTree = {};

      for (const entry of entries) {
        // Skip excluded directories
        if (entry.isDirectory() && excludedDirs.includes(entry.name)) {
          continue;
        }

        // Calculate relative path
        const entryPath = path === "/" ? `/${entry.name}` : `${path}/${entry.name}`;

        if (entry.isDirectory()) {
          // Recursively process directories
          result[entry.name] = {
            directory: await this.getFileSystemTree(entryPath),
          };
        } else {
          // Read file contents
          try {
            const content = await this.readFile(entryPath);
            result[entry.name] = {
              file: {
                contents: content,
              },
            };
          } catch (error) {
            console.error(`Error reading file ${entryPath}:`, error);
            // For files that can't be read, store as empty
            result[entry.name] = {
              file: {
                contents: "",
              },
            };
          }
        }
      }

      return result;
    } catch (error) {
      console.error(`Error reading directory ${path}:`, error);
      throw error;
    }
  }
}

// Create a singleton instance
const webContainerService = new WebContainerService();
export default webContainerService;