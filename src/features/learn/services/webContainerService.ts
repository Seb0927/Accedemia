import { WebContainer } from '@webcontainer/api';
import type { FileSystemTree } from '@webcontainer/api';

export type WebContainerStatus = {
  status: string;
  error: string | null;
  isLoading: boolean;
  serverUrl?: string;
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
        status: 'Inactivo',
        error: null,
        isLoading: false,
        ...status
      });
    }
  }

  public setStatusCallback(callback: StatusCallback) {
    this.statusCallback = callback;
  }

  public async start(): Promise<WebContainer> {
    try {
      this.updateStatus({ status: 'Cargando archivos del proyecto...', isLoading: true });
      
      // Fetch the manifest file
      const response = await fetch('/learning-project-manifest.json');
      if (!response.ok) {
        throw new Error('Failed to fetch project manifest');
      }

      const files = await response.json() as FileSystemTree;

      // Boot the WebContainer
      this.updateStatus({ status: 'Iniciando WebContainer...', isLoading: true });
      const instance = await WebContainer.boot();
      this.instance = instance;

      // Mount the files
      this.updateStatus({ status: 'Montando archivos del proyecto...', isLoading: true });
      await instance.mount(files);

      // Install dependencies
      this.updateStatus({ status: 'Instalando dependencias...', isLoading: true });
      const installProcess = await instance.spawn('npm', ['install']);

      // Stream install logs
      installProcess.output.pipeTo(
        new WritableStream({
          write: (data: string) => {
            console.log('npm install:', data);
          }
        })
      );

      const installExitCode = await installProcess.exit;

      if (installExitCode !== 0) {
        throw new Error('Failed to install dependencies');
      }

      // Start the development server
      this.updateStatus({ status: 'Iniciando servidor de desarrollo...', isLoading: true });
      const devProcess = await instance.spawn('npm', ['run', 'dev']);

      // Stream server logs
      devProcess.output.pipeTo(
        new WritableStream({
          write: (data: string) => {
            console.log('dev server:', data);
            // Update status with the server URL
            if (data.includes('Local:')) {
              const urlMatch = data.match(/Local:\s+(http:\/\/localhost:\d+)/);
              if (urlMatch && urlMatch[1]) {
                this.updateStatus({ 
                  status: `Servidor ejecutándose en ${urlMatch[1]}`,
                  serverUrl: urlMatch[1],
                  isLoading: true 
                });
              }
            }
          }
        })
      );

      return instance;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar WebContainer';
      this.updateStatus({ 
        status: 'Error', 
        error: errorMessage, 
        isLoading: false 
      });
      throw error;
    }
  }

  public onServerReady(callback: (url: string) => void): void {
    if (!this.instance) {
      console.error('WebContainer not initialized yet');
      return;
    }

    this.instance.on('server-ready', (port: number, url: string) => {
      this.updateStatus({ 
        status: 'Aplicación ejecutándose', 
        isLoading: false,
        serverUrl: url
      });
      callback(url);
    });
  }

  public teardown(): void {
    if (this.instance) {
      this.instance.teardown();
      this.instance = null;
    }
  }
}

// Create a singleton instance
const webContainerService = new WebContainerService();
export default webContainerService;