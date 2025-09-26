"use client";

import React from "react";
import { useDeviceDetection } from "@/hooks/use-device-detection";

interface IOSWrapperProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export default function IOSWrapper({ fallback, children }: IOSWrapperProps) {
  const { isIOS, isMounted } = useDeviceDetection();

  if (!isMounted) {
    return (
      <div className={`
        bg-opacity-80 bg-base-100 absolute inset-0 z-10 flex items-center
        justify-center
      `}>
        <div className="p-4 text-center">
          <div className="loading loading-lg loading-spinner"></div>
          <p className="mt-2 font-medium">Verificando navegador</p>
        </div>
      </div>
    );
  }

  return isIOS ? fallback : children;
}