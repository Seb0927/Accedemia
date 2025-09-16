import { useState } from "react";
import webContainerService from "../services/webContainerService";

type EvaluationResult = { 
  success: boolean; 
  explanation: string; 
  technique: string 
};

export function useCodeEvaluation(filePath: string) {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const evaluateCode = async (lessonId: string) => {
    if (!lessonId) {return null;}
    
    setIsEvaluating(true);
    setResult(null);
    setError(null);
    
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
          successCriterion: lessonId,
          studentCode,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al evaluar el código");
      }
      
      const evaluationResult = await response.json();
      setResult(evaluationResult);
      return evaluationResult;
      
    } catch (err) {
      console.error("Error evaluating code:", err);
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al evaluar";
      setError(errorMessage);
      return null;
    } finally {
      setIsEvaluating(false);
    }
  };

  return {
    isEvaluating,
    result,
    error,
    evaluateCode,
    resetEvaluation: () => {
      setResult(null);
      setError(null);
    },
  };
}