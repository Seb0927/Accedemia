'use client'

import { useEffect } from "react";
import { useLessonStore } from "@/features/learn/stores/useLessonStore";
import { Menu } from "lucide-react";
import { Lesson } from "@/types/curriculum";

export default function Page() {
  const lessons = useLessonStore((state) => state.lessons)
  const initializeLessons = useLessonStore((state) => state.initializeLessons)

  useEffect(() => {
    async function fetchLessons() {
      const response = await fetch('/api/curriculum');
      const lessons: Lesson[] = await response.json();
      initializeLessons(lessons);
    }

    fetchLessons();
  }, []);

  return (
    <div className="h-full">
      <div className="navbar min-h-11 bg-base-100 shadow-sm px-3 py-1">

        <div className="drawer">
          <input id="my-drawer" className="drawer-toggle" type="checkbox" />
          <div className="drawer-content flex flex-row items-center gap-2">
            <div className="drawer-content flex flex-row items-center gap-2">
              <label className="btn p-2 btn-sm drawer-button" htmlFor="my-drawer">
                <Menu className="size-4" />
              </label>
              <div className="breadcrumbs text-xs">
                <ul>
                  <li>Principle 1</li>
                  <li>Criteria 2</li>
                  <li>Success Criteria 3</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label className="drawer-overlay" htmlFor="my-drawer" aria-label="close sidebar" />
            <h2>Principio 1: Perceptible</h2>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {
                lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <a>{lesson.title}</a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}