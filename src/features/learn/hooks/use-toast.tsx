import { useState, useEffect } from "react";

export function useToast(autoHideTime = 10000) {
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState<{
    type: "success" | "error" | "info";
    message: React.ReactNode;
  } | null>(null);
  
  // Auto-dismiss toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, autoHideTime);
      
      return () => clearTimeout(timer);
    }
  }, [showToast, autoHideTime]);

  const showToastMessage = (type: "success" | "error" | "info", message: React.ReactNode) => {
    setToastContent({ type, message });
    setShowToast(true);
  };

  return {
    showToast,
    toastContent,
    showToastMessage,
    hideToast: () => setShowToast(false),
  };
}