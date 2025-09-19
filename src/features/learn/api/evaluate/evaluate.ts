import { EvaluationResult } from "@/types/evaluation";

export async function evaluateCode(
  successCriterion: string, 
  studentCode: string,
): Promise<EvaluationResult | null> {
  try {
    const response = await fetch("/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        successCriterion,
        studentCode,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al evaluar el código");
    }
    
    return await response.json();
  } catch (err) {
    console.error("Error evaluating code:", err);
    throw err;
  }
}