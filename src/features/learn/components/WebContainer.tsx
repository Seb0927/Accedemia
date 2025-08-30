'use client';

import { useEffect, useRef, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

export default function WebContainerComponent() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [webcontainerInstance, setWebcontainerInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    async function startWebContainer() {
      try {
        setIsLoading(true);

        // Fetch the manifest file
        setStatus('Loading project files...');
        const response = await fetch('/learning-project-manifest.json');
        if (!response.ok) {
          throw new Error('Failed to fetch project manifest');
        }

        const files = await response.json();

        // Boot the WebContainer
        setStatus('Booting WebContainer...');
        const instance = await WebContainer.boot();
        setWebcontainerInstance(instance);

        // Mount the files
        setStatus('Mounting project files...');
        await instance.mount(files);

        // Install dependencies
        setStatus('Installing dependencies...');
        const installProcess = await instance.spawn('npm', ['install']);

        // Stream install logs
        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log('npm install:', data);
            }
          })
        );

        const installExitCode = await installProcess.exit;

        if (installExitCode !== 0) {
          throw new Error('Failed to install dependencies');
        }

        // Start the development server
        setStatus('Starting development server...');
        const devProcess = await instance.spawn('npm', ['run', 'dev']);

        // Stream server logs
        devProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log('dev server:', data);
              // Update status with the server URL
              if (data.includes('Local:')) {
                const urlMatch = data.match(/Local:\s+(http:\/\/localhost:\d+)/);
                if (urlMatch && urlMatch[1]) {
                  setStatus(`Server running at ${urlMatch[1]}`);
                }
              }
            }
          })
        );

        // Wait for the server to be ready
        instance.on('server-ready', (port, url) => {
          if (iframeRef.current) {
            iframeRef.current.src = url;
          }
          setStatus('Application running');
          setIsLoading(false);
        });

      } catch (err: any) {
        console.error('WebContainer error:', err);
        setError(err.message || 'Failed to start WebContainer');
        setIsLoading(false);
      }
    }

    startWebContainer();

    return () => {
      // Cleanup when component unmounts
      if (webcontainerInstance) {
        webcontainerInstance.teardown();
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative flex-1">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-200 bg-opacity-80 z-10">
            <div className="text-center p-4 rounded-lg bg-base-100 shadow-lg">
              <div className="loading loading-spinner loading-lg"></div>
              <p className="mt-2 font-medium">{status}</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-200 bg-opacity-80 z-10">
            <div className="text-center p-4 rounded-lg bg-base-100 shadow-lg">
              <div className="text-error text-xl mb-2">⚠️ Error</div>
              <p>{error}</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="CompraFacilInaccesible Preview"
          sandbox="allow-same-origin allow-scripts allow-forms allow-modals"
        />
      </div>
    </div>
  );
}