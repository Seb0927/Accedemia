import { useState } from "react";
import { useLessonStore } from "../stores/use-lesson-store";

export function useProgressSaving() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const markCompleted = useLessonStore(state => state.markCompleted);

  const saveProgress = async (lessonId: string) => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      await markCompleted(lessonId);
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