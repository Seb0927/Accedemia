'use client';

import { useEffect, useRef, useState } from 'react';
import webContainerService, { WebContainerStatus } from '@/features/learn/services/webContainerService';

export default function WebContainerComponent() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [containerState, setContainerState] = useState<WebContainerStatus>({
    status: 'Iniciando...',
    error: null,
    isLoading: true
  });

  useEffect(() => {
    // Set up status callback
    webContainerService.setStatusCallback(setContainerState);

    async function initializeContainer() {
      try {
        const instance = await webContainerService.start();
        
        webContainerService.onServerReady((url) => {
          if (iframeRef.current) {
            iframeRef.current.src = url;
          }
        });
      } catch (err) {
        console.error('Failed to initialize WebContainer:', err);
      }
    }

    initializeContainer();

    // Clean up on unmount
    return () => {
      webContainerService.teardown();
    };
  }, []);

  const { status, error, isLoading } = containerState;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative flex-1">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-80 z-10">
            <div className="text-center p-4">
              <div className="loading loading-spinner loading-lg"></div>
              <p className="mt-2 font-medium">{status}</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-80 z-10">
            <div className="text-center p-4">
              <div className="text-error text-xl mb-2">⚠️ Ha ocurrido un error: </div>
              <p>{error}</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="CompraFacilInaccesible Preview"
          sandbox="allow-same-origin allow-scripts allow-forms allow-modals"
          style={{
            transform: 'scale(0.7)', // width/height = (100 / scale) %
            transformOrigin: 'top left',
            width: '142.86%',  // Compensate for scaling to avoid empty space
            height: '142.86%'  // Adjust based on your scale factor
          }}
        />
      </div>
    </div>
  );
}