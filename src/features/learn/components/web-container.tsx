"use client";

import { useEffect, useRef, useState } from "react";
import webContainerService, { WebContainerStatus } from "@/features/learn/services/web-container-service";

export default function WebContainerComponent() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [containerState, setContainerState] = useState<WebContainerStatus>({
    status: "Iniciando...",
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    // Set up status callback
    webContainerService.setStatusCallback(setContainerState);

    async function initializeContainer() {
      try {
        await webContainerService.start();
        
        webContainerService.onServerReady((url) => {
          if (iframeRef.current) {
            iframeRef.current.src = url;
          }
        });
      } catch (err) {
        console.error("Failed to initialize WebContainer:", err);
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
    <div className="flex size-full flex-col">
      <div className="relative z-0 flex-1">
        {isLoading && (
          <div className={`
            bg-opacity-80 bg-base-100 absolute inset-0 z-10 flex items-center
            justify-center
          `}>
            <div className="p-4 text-center">
              <div className="loading loading-lg loading-spinner"></div>
              <p className="mt-2 font-medium">{status}</p>
            </div>
          </div>
        )}
        {error && (
          <div className={`
            bg-opacity-80 bg-base-100 absolute inset-0 z-10 flex items-center
            justify-center
          `}>
            <div className="p-4 text-center">
              <div className="text-error mb-2 text-xl">⚠️ Ha ocurrido un error: </div>
              <p>{error}</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="size-full rounded-xl"
          title="CompraFacilInaccesible Preview"
          sandbox="allow-same-origin allow-scripts allow-forms allow-modals"
          style={{
            transform: "scale(0.7)", // width/height = (100 / scale) %
            transformOrigin: "top left",
            width: "142.86%",  // Compensate for scaling to avoid empty space
            height: "142.86%",  // Adjust based on your scale factor
          }}
        />
      </div>
    </div>
  );
}