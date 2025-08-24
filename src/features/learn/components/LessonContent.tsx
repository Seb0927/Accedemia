"use client";

import { useState, useEffect } from 'react';
import { useLessonStore } from '../stores/useLessonStore';
import { Lesson } from '@/types/curriculum';

function LessonContent() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const selectedLesson = useLessonStore((state) => state.selectedLesson);

  useEffect(() => {
    async function fetchLesson() {
      if (selectedLesson?.id) {
        const response = await fetch("/api/curriculum/" + selectedLesson.id);
        const lesson: Lesson = await response.json();
        setLesson(lesson);
      }
    }

    fetchLesson();
  }, [selectedLesson?.id]);

  if (!lesson) {
    return (
      <div>
        ¡Selecciona una lección por favor!
      </div>
    );
  }

  return (
    <div>
      {lesson.content}
    </div>
  )
}

export default LessonContent;