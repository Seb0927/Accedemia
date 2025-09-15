// In EvaluateButton.tsx
"use client";

import { useState, useEffect } from "react";
import { useLessonStore } from "../stores/useLessonStore";
import webContainerService from "../services/webContainerService";
import { CheckCircle, XCircle, Loader2, Save } from "lucide-react";

interface EvaluateButtonProps {
  lessonId: string;
  filePath: string;
}

export default function EvaluateButton({ lessonId, filePath }: EvaluateButtonProps) {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<{ success: boolean; explanation: string; technique: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  const markCompleted = useLessonStore(state => state.markCompleted);
  const selectedLesson = useLessonStore(state => state.selectedLesson);
  
  // Show toast when there's a result or error
  useEffect(() => {
    if (result || error) {
      setShowToast(true);
      
      // Auto-dismiss toast after 10 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [result, error]);
  
  async function evaluateCode() {
    if (!selectedLesson) return;
    
    setIsEvaluating(true);
    setResult(null);
    setError(null);
    setShowToast(false);
    
    try {
      // Get the current code from the WebContainer
      const studentCode = await webContainerService.readFile(filePath);
      
      // Call the evaluation API
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          successCriterion: selectedLesson.id,
          studentCode,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al evaluar el código");
      }
      
      const evaluationResult = await response.json();
      setResult(evaluationResult);
      
      // If successful, mark lesson as completed and save state
      if (evaluationResult.success) {
        setIsSaving(true);
        try {
          await markCompleted(lessonId);
          // Add a small delay to show saving status
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (saveError) {
          console.error("Error saving progress:", saveError);
          setError("Tu solución es correcta, pero hubo un error al guardar tu progreso.");
        } finally {
          setIsSaving(false);
        }
      }
      
    } catch (err) {
      console.error("Error evaluating code:", err);
      setError(err instanceof Error ? err.message : "Error desconocido al evaluar");
    } finally {
      setIsEvaluating(false);
    }
  }
  
  return (
    <>
      <button 
        onClick={evaluateCode}
        disabled={isEvaluating || isSaving}
        className="btn btn-xs btn-primary"
      >
        {isEvaluating ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Evaluando...
          </>
        ) : isSaving ? (
          <>
            <Save size={14} className="animate-pulse" />
            Guardando...
          </>
        ) : (
          "Evaluar"
        )}
      </button>
      
      {/* Toast notifications */}
      {showToast && (
        <div className="toast toast-end toast-bottom z-50 max-w-2xl">
          {result && (
            <div className={`alert ${result.success ? 'alert-success' : 'alert-error'} shadow-lg`}>
              <div className="flex w-full justify-between">
                <div className="flex items-start gap-2">
                  {result.success ? (
                    <CheckCircle className="h-6 w-6 shrink-0 stroke-current" />
                  ) : (
                    <XCircle className="h-6 w-6 shrink-0 stroke-current" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold">{result.success ? "¡Correcto!" : "Incorrecto"}</span>
                    <span className="text-sm">{result.explanation}</span>
                    {result.technique && (
                      <span className="mt-1 text-xs font-medium">Técnica: {result.technique}</span>
                    )}
                    {result.success && (
                      <span className="mt-1 text-xs font-medium text-success-content">
                        Progreso guardado correctamente
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  className="btn btn-circle btn-ghost btn-xs" 
                  onClick={() => setShowToast(false)}
                >✕</button>
              </div>
            </div>
          )}
          
          {error && (
            <div className="alert alert-error shadow-lg">
              <div className="flex w-full justify-between">
                <div className="flex items-start gap-2">
                  <XCircle className="h-6 w-6 shrink-0 stroke-current" />
                  <div className="flex flex-col">
                    <span className="font-bold">Error</span>
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
                <button 
                  className="btn btn-circle btn-ghost btn-xs" 
                  onClick={() => setShowToast(false)}
                >✕</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}