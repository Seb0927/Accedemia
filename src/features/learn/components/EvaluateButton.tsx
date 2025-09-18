"use client";

import { useEffect } from "react";
import { useLessonStore } from "@/features/learn/stores/useLessonStore";
import { useCodeEvaluation } from "@/features/learn/hooks/useEvaluation";
import { useProgressSaving } from "@/features/learn/hooks/useProgressSaving";
import { useToast } from "@/features/learn/hooks/useToast";
import { CheckCircle, XCircle, Loader2, Save } from "lucide-react";

interface EvaluateButtonProps {
  lessonId: string;
  filePath: string;
}

export default function EvaluateButton({ lessonId, filePath }: EvaluateButtonProps) {
  const selectedLesson = useLessonStore(state => state.selectedLesson);
  
  const { isEvaluating, result, error, evaluateCode, resetEvaluation } = useCodeEvaluation(filePath);
  const { isSaving, saveError, saveProgress } = useProgressSaving();
  const { showToast, showToastMessage, hideToast } = useToast();

  // Handle combined state from both hooks
  useEffect(() => {
    if (result || error || saveError) {
      // Don't call showToast directly - use the provided function
      if (result) {
        showToastMessage(
          result.success ? "success" : "error",
          "Evaluation complete",
        );
      } else if (error || saveError) {
        showToastMessage("error", error || saveError || "");
      }
    }
  }, [result, error, saveError, showToastMessage]);
  
  const handleEvaluate = async () => {
    if (!selectedLesson) {return;}
    
    // Reset previous states
    resetEvaluation();
    hideToast(); // Use hideToast instead of showToast(false)
    
    // Evaluate code
    const evaluationResult = await evaluateCode(selectedLesson.id);
    
    // If successful, save progress
    if (evaluationResult?.success) {
      await saveProgress(lessonId);
    }
  };
  
  return (
    <>
      <button 
        onClick={handleEvaluate}
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
        <div className="toast-end toast-bottom toast z-50 max-w-2xl">
          {result && (
            <div className={`
              alert
              ${result.success ? "alert-success" : "alert-error"}
              shadow-lg
            `}>
              <div className="flex w-full justify-between">
                <div className="flex items-start gap-2">
                  {result.success ? (
                    <CheckCircle className="size-6 shrink-0 stroke-current" />
                  ) : (
                    <XCircle className="size-6 shrink-0 stroke-current" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold">{result.success ? "¡Correcto!" : "Incorrecto"}</span>
                    <span className="text-sm">{result.explanation}</span>
                    {result.technique && (
                      <span className="mt-1 text-xs font-medium">Técnica: {result.technique}</span>
                    )}
                    {result.success && !saveError && (
                      <span className={`
                        mt-1 text-xs font-medium text-success-content
                      `}>
                        Progreso guardado correctamente
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  className="btn btn-circle btn-ghost btn-xs" 
                  onClick={hideToast}
                >✕</button>
              </div>
            </div>
          )}
          
          {(error || saveError) && (
            <div className="alert alert-error shadow-lg">
              <div className="flex w-full justify-between">
                <div className="flex items-start gap-2">
                  <XCircle className="size-6 shrink-0 stroke-current" />
                  <div className="flex flex-col">
                    <span className="font-bold">Error</span>
                    <span className="text-sm">{error || saveError}</span>
                  </div>
                </div>
                <button 
                  className="btn btn-circle btn-ghost btn-xs" 
                  onClick={hideToast}
                >✕</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}