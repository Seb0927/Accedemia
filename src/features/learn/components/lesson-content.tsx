"use client";

import { useLessonStore } from "@/features/learn/stores/use-lesson-store";
import { useState, useEffect } from "react";
import { getLessonById } from "@/features/learn/api/curriculum/get-lesson";
import { Lesson } from "@/types/curriculum";
import ReactMarkdown from "@/features/learn/components/react-markdown";
import "highlight.js/styles/github.css";

function LessonContent() {
  const selectedLesson = useLessonStore((state) => state.selectedLesson);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedLesson?.id) {
      setLesson(null);
      return;
    }

    const fetchLesson = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedLesson = await getLessonById(selectedLesson.id);
        setLesson(fetchedLesson);
      } catch (err) {
        setError("Failed to load lesson");
        console.error("Error fetching lesson:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [selectedLesson?.id]);

  if (!selectedLesson?.id) {
    return (
      <div className='p-8'>
        ¡Selecciona una lección por favor!
      </div>
    );
  }

  return (
    <div className="relative z-0 size-full overflow-auto rounded-lg">
      {loading && (
        <div className={`
          bg-opacity-80 bg-base-100 absolute inset-0 z-10 flex items-center
          justify-center
        `}>
          <div className="p-4 text-center">
            <div className="loading loading-lg loading-spinner"></div>
            <p className="mt-2 font-medium">Cargando lección...</p>
          </div>
        </div>
      )}

      {error && (
        <div className={`
          bg-opacity-80 bg-base-100 absolute inset-0 z-10 flex items-center
          justify-center
        `}>
          <div className="p-4 text-center">
            <div className="text-error mb-2 text-xl">⚠️ Ha ocurrido un error: </div>
            <p>{error}</p>
          </div>
        </div>
      )}

      {lesson && (
        <div className="p-8">
          <ReactMarkdown content={lesson.content} />
        </div>
      )}
    </div>
  );
}

export default LessonContent;