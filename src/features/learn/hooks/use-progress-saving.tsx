import { useState } from "react";
import { useLessonStore } from "@/features/learn/stores/use-lesson-store";

export function useProgressSaving() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const setLessonCorrect = useLessonStore(state => state.setLessonCorrect);
  const setLessonIncorrect = useLessonStore(state => state.setLessonIncorrect);

  const saveProgress = async (lessonId: string, feedbackMessage: string, isCorrect: boolean) => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      if (isCorrect) {
        await setLessonCorrect(lessonId, feedbackMessage);
      } else {
        setLessonIncorrect(lessonId, feedbackMessage);
      }
      // Small delay to show saving status
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      console.error("Error saving progress:", error);
      setSaveError("Hubo un error al guardar tu progreso.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    saveError,
    saveProgress,
    resetSaveState: () => setSaveError(null),
  };
}