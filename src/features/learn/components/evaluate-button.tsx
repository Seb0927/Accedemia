"use client";

import { useLessonStore } from "@/features/learn/stores/use-lesson-store";
import { useCodeEvaluation } from "@/features/learn/hooks/use-evaluation";
import { useProgressSaving } from "@/features/learn/hooks/use-progress-saving";
import { CheckCircle, XCircle, Loader2, Save } from "lucide-react";

interface EvaluateButtonProps {
  lessonId: string;
  filePath: string;
}

export default function EvaluateButton({ lessonId, filePath }: EvaluateButtonProps) {
  const selectedLesson = useLessonStore(state => state.selectedLesson);

  const { isEvaluating, result, error, evaluateCode, resetEvaluation } = useCodeEvaluation(filePath);
  const { isSaving, saveError, saveProgress } = useProgressSaving();

  const handleEvaluate = async () => {
    if (!selectedLesson) { return; }

    resetEvaluation();

    const evaluationResult = await evaluateCode(selectedLesson.id);

    if (evaluationResult) {
      // Save progress with the evaluation result and feedback
      await saveProgress(
        lessonId,
        evaluationResult.explanation,
        evaluationResult.success,
      );
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
    </>
  );
}