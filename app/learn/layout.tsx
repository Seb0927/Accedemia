"use client";

import { ReactNode, useEffect } from "react";
import { useLessonStore } from "@/features/learn/stores/useLessonStore";
import DrawerMenu from "@/features/learn/components/Drawer/DrawerMenu";
import DrawerItem from "@/features/learn/components/Drawer/DrawerItem";

import { Lesson } from "@/types/curriculum";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const lessons = useLessonStore((state) => state.lessons);
  const initializeLessons = useLessonStore((state) => state.initializeLessons);
  const setSelectedLesson = useLessonStore((state => state.setSelectedLesson));

  const onClickDrawerItem = (lesson: Lesson) => {
    // Close drawer
    const drawer = document.getElementById("lessons-drawer") as HTMLInputElement;
    if (drawer) {
      drawer.checked = false;
    }

    // Set selected lesson
    setSelectedLesson(lesson);

    // Set query parameters without refreshing the page
    const url = new URL(window.location.href);
    url.searchParams.set("lesson", lesson.id);
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    async function fetchLessons() {
      const response = await fetch("/api/curriculum");
      const lessons: Lesson[] = await response.json();
      initializeLessons(lessons);
    }

    async function fetchInitialLesson() {
      const url = new URL(window.location.href);
      const lessonId = url.searchParams.get("lesson");
      if (lessonId) {
        const response = await fetch(`/api/curriculum/${lessonId}`);
        if (response.ok) {
          const lesson: Lesson = await response.json();
          setSelectedLesson(lesson);
        } else {
          window.location.href = "/not-found";
        }
      }
    }

    fetchLessons();
    fetchInitialLesson();
  }, [initializeLessons]);

  return (
    <div className="h-full">
      <div className="drawer h-full">
        <input id="lessons-drawer" className="drawer-toggle" type="checkbox" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {children}
        </div>

        {/* Drawer Content */}
        <div className="drawer-side">
          <label className="drawer-overlay" htmlFor="lessons-drawer" aria-label="Cerrar barra lateral" />
          <div className="menu bg-base-200 text-base-content flex min-h-full w-88 gap-2 p-4">
            <DrawerMenu title={"Principio 1: Perceptible"}>
              <ul>
                {
                  lessons
                    .filter((lesson) => lesson.principle === "Perceptible")
                    .map((lesson) => (
                      <DrawerItem
                        key={lesson.id}
                        id={lesson.id.slice(5, 10).replace(/-/g, ".")}
                        title={lesson.title}
                        onClick={() => onClickDrawerItem(lesson)}
                      />
                    ))
                }
              </ul>
            </DrawerMenu>
            <DrawerMenu title={"Principio 2: Operable"}>
              <ul>
                {
                  lessons
                    .filter((lesson) => lesson.principle === "Operable")
                    .map((lesson) => (
                      <DrawerItem
                        key={lesson.id}
                        id={lesson.id.slice(5, 10).replace(/-/g, ".")}
                        title={lesson.title}
                        onClick={() => onClickDrawerItem(lesson)}
                      />
                    ))
                }
              </ul>
            </DrawerMenu>
            <DrawerMenu title={"Principio 3: Comprensible"}>
              <ul>
                {
                  lessons
                    .filter((lesson) => lesson.principle === "Comprensible")
                    .map((lesson) => (
                      <DrawerItem
                        key={lesson.id}
                        id={lesson.id.slice(5, 10).replace(/-/g, ".")}
                        title={lesson.title}
                        onClick={() => onClickDrawerItem(lesson)}
                      />
                    ))
                }
              </ul>
            </DrawerMenu>
            <DrawerMenu title={"Principio 4: Robusto"}>
              <ul>
                {
                  lessons
                    .filter((lesson) => lesson.principle === "Robusto")
                    .map((lesson) => (
                      <DrawerItem
                        key={lesson.id}
                        id={lesson.id.slice(5, 10).replace(/-/g, ".")}
                        title={lesson.title}
                        onClick={() => onClickDrawerItem(lesson)}
                      />
                    ))
                }
              </ul>
            </DrawerMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;