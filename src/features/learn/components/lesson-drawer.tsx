"use client";

import { useEffect } from "react";
import { useLessonStore } from "@/features/learn/stores/use-lesson-store";
import DrawerMenu from "@/components/drawer/drawer-menu";
import DrawerItem from "@/components/drawer/drawer-item";
import { Lesson } from "@/types/curriculum";
import { getAllLessons } from "@/features/learn/api/curriculum/get-lessons";
import { getLessonFromUrl } from "@/utils/get-lesson-url";

export default function LessonDrawer() {
  const lessons = useLessonStore((state) => state.lessons);
  const initializeLessons = useLessonStore((state) => state.initializeLessons);
  const setSelectedLesson = useLessonStore((state) => state.setSelectedLesson);

  useEffect(() => {
    async function loadInitialData() {
      const fetchedLessons = await getAllLessons();
      initializeLessons(fetchedLessons);

      const lessonFromUrl = await getLessonFromUrl();
      if (lessonFromUrl) {
        setSelectedLesson(lessonFromUrl);
      } else {
        // Handle case when lesson ID is invalid but exists in URL
        const url = new URL(window.location.href);
        if (url.searchParams.get("lesson")) {
          window.location.href = "/not-found";
        }
      }
    }

    loadInitialData();
  }, [initializeLessons, setSelectedLesson]);

  const onClickDrawerItem = (lesson: Lesson) => {
    // Close drawer
    const drawer = document.getElementById("lessons-drawer") as HTMLInputElement;
    if (drawer) {
      drawer.checked = false;
    }

    setSelectedLesson(lesson);

    // Set query parameters without refreshing the page
    const url = new URL(window.location.href);
    url.searchParams.set("lesson", lesson.id);
    window.history.pushState({}, "", url.toString());
  };

  return (
    <div className="drawer-side">
      <label className="drawer-overlay" htmlFor="lessons-drawer" aria-label="Cerrar barra lateral" />
      <div className={`
        menu bg-base-200 text-base-content flex min-h-full w-88 gap-2 p-4
      `}>
        <DrawerMenu title={"Principio 1: Perceptible"}>
          <ul>
            {lessons
              .filter((lesson) => lesson.principle === "Perceptible")
              .map((lesson) => (
                <DrawerItem
                  key={lesson.id}
                  id={lesson.id.slice(5, 10).replace(/-/g, ".")}
                  title={lesson.title}
                  onClick={() => onClickDrawerItem(lesson)}
                />
              ))}
          </ul>
        </DrawerMenu>
        <DrawerMenu title={"Principio 2: Operable"}>
          <ul>
            {lessons
              .filter((lesson) => lesson.principle === "Operable")
              .map((lesson) => (
                <DrawerItem
                  key={lesson.id}
                  id={lesson.id.slice(5, 10).replace(/-/g, ".")}
                  title={lesson.title}
                  onClick={() => onClickDrawerItem(lesson)}
                />
              ))}
          </ul>
        </DrawerMenu>
        <DrawerMenu title={"Principio 3: Comprensible"}>
          <ul>
            {lessons
              .filter((lesson) => lesson.principle === "Comprensible")
              .map((lesson) => (
                <DrawerItem
                  key={lesson.id}
                  id={lesson.id.slice(5, 10).replace(/-/g, ".")}
                  title={lesson.title}
                  onClick={() => onClickDrawerItem(lesson)}
                />
              ))}
          </ul>
        </DrawerMenu>
        <DrawerMenu title={"Principio 4: Robusto"}>
          <ul>
            {lessons
              .filter((lesson) => lesson.principle === "Robusto")
              .map((lesson) => (
                <DrawerItem
                  key={lesson.id}
                  id={lesson.id.slice(5, 10).replace(/-/g, ".")}
                  title={lesson.title}
                  onClick={() => onClickDrawerItem(lesson)}
                />
              ))}
          </ul>
        </DrawerMenu>
      </div>
    </div>
  );
}