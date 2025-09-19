import { EvaluationResult } from "@/types/evaluation";
import { useState } from "react";
import webContainerService from "@/features/learn/services/web-container-service";
import { evaluateCode as apiEvaluateCode } from "@/features/learn/api/evaluate/evaluate";

export function useCodeEvaluation(filePath: string) {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const evaluateCode = async (lessonId: string) => {
    if (!lessonId) {
      return null;
    }
    
    setIsEvaluating(true);
    setResult(null);
    setError(null);
    
    try {
      // Read the student code from the WebContainer
      const studentCode = await webContainerService.readFile(filePath);
      
      // Use the API utility function to evaluate the code
      const evaluationResult = await apiEvaluateCode(lessonId, studentCode);
      
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

  const resetEvaluation = () => {
    setResult(null);
    setError(null);
  };

  return {
    isEvaluating,
    result,
    error,
    evaluateCode,
    resetEvaluation,
  };
}