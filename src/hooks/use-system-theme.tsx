import { useState, useEffect } from "react";

export function useSystemTheme() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true; // fallback for SSR
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    alert("Media query: " + mediaQuery.matches)
    
    const updateTheme = () => {
      setIsDarkMode(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', updateTheme);
    
    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);

  return isDarkMode;
}