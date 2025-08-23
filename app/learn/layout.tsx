'use client';

import { ReactNode } from 'react'
import { useEffect } from "react";
import { useLessonStore } from "@/features/learn/stores/useLessonStore";
import DrawerMenu from '@/features/learn/components/Drawer/DrawerMenu';
import DrawerItem from '@/features/learn/components/Drawer/DrawerItem';

import { Lesson } from "@/types/curriculum";

interface LayoutProps {
  children: ReactNode;
}

function layout({ children }: LayoutProps) {

  const lessons = useLessonStore((state) => state.lessons)
  const initializeLessons = useLessonStore((state) => state.initializeLessons)
  const setSelectedLesson = useLessonStore((state => state.setSelectedLesson))

  const onClickDrawerItem = (lesson: Lesson) => {setSelectedLesson(lesson)}

  useEffect(() => {
    async function fetchLessons() {
      const response = await fetch('/api/curriculum');
      const lessons: Lesson[] = await response.json();
      initializeLessons(lessons);
    }

    fetchLessons();
  }, []);

  console.log(lessons)
  return (
    <div className="h-full">
      <div className="drawer">
        <input id="lessons-drawer" className="drawer-toggle" type="checkbox" />

        {/* Main Content */}
        <div className="drawer-content">
          {children}
        </div>

        {/* Drawer Content */}
        <div className="drawer-side">
          <label className="drawer-overlay" htmlFor="lessons-drawer" aria-label="cerrar barra lateral" />
          <div className="menu flex gap-2 bg-base-200 text-base-content min-h-full w-88 p-4">
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
  )
}

export default layout