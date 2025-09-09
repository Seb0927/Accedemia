import { WebContainer, FileSystemTree } from "@webcontainer/api";

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

  public async start(): Promise<WebContainer> {
    try {
      this.updateStatus({ status: "Cargando archivos del proyecto...", isLoading: true });
      
      // Fetch the manifest file
      const response = await fetch("/learning-project-manifest.json");
      if (!response.ok) {
        throw new Error("Failed to fetch project manifest");
      }

      const files = await response.json() as FileSystemTree;

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

      // Stream install logs
      installProcess.output.pipeTo(
        new WritableStream({
          write: (data: string) => {
            console.log("npm install:", data);
          },
        }),
      );

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
            console.log("dev server:", data);
            // Update status with the server URL
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

  // New methods for file operations
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

  public isReady(): boolean {
    return this.instance !== null;
  }

  public teardown(): void {
    if (this.instance) {
      this.instance.teardown();
      this.instance = null;
    }
  }

  public async getFileTree(path = "/"): Promise<FileEntry[]> {
    if (!this.instance) {
      throw new Error("WebContainer not initialized");
    }
    
    try {
      const entries = await this.instance.fs.readdir(path, { withFileTypes: true });
      const result: FileEntry[] = [];
      
      for (const entry of entries) {
        const entryPath = path === "/" ? `/${entry.name}` : `${path}/${entry.name}`;
        
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
}

// Create a singleton instance
const webContainerService = new WebContainerService();
export default webContainerService;