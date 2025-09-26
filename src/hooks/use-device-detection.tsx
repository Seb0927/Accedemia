"use client";

import { useState, useEffect } from "react";

export function useDeviceDetection() {
  const [isMounted, setIsMounted] = useState(false);
  const [isIOS, setIsIOS] = useState(true);
  
  useEffect(() => {
    setIsMounted(true);
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) || 
      (userAgent.includes("mac") && navigator.maxTouchPoints > 1); // Detect iPad with iPadOS
    
    setIsIOS(isIOSDevice);
  }, []);
  
  return { isIOS, isMounted };
}