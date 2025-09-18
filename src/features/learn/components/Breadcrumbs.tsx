"use client";

import { useLessonStore } from "@/features/learn/stores/useLessonStore";

function Breadcrumbs() {
  const selectedLesson = useLessonStore((state) => state.selectedLesson);

  if (selectedLesson === null) {
    return null;
  }

  return (
    <div className="breadcrumbs text-xs">
      <ul>
        <li>{selectedLesson.principle}</li>
        <li>{selectedLesson.guideline}</li>
        <li>{selectedLesson.success_criteria}</li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;