import { create } from "zustand";
import { persist } from "zustand/middleware";
import webContainerService from "../services/web-container-service";

interface LessonProgress {
  [lessonId: string]: boolean;
}

interface Lesson {
  id: string,
  title: string,
  content: string | null,
  principle: string,
  guideline: string,
  success_criteria: string,
}

interface LessonStore {
  lessons: Lesson[];
  lessonStatus: LessonProgress;
  selectedLesson: Lesson | null;
  initializeLessons: (lessons: Lesson[]) => void;
  setSelectedLesson: (lesson: Lesson) => void;
  markCompleted: (lessonId: string) => void;
  markIncomplete: (lessonId: string) => void;
  resetProgress: () => void;
}

export const useLessonStore = create<LessonStore>()(
  persist(
    (set) => ({
      lessons: [],
      lessonStatus: {},
      selectedLesson: null,

      initializeLessons: (lessons) =>
        set((state) => {
          // Keep existing progress if available
          const existingStatus = state.lessonStatus;
          const newStatus = Object.fromEntries(
            lessons.map(lesson => [
              lesson.id,
              // Use existing status if available, otherwise false
              existingStatus[lesson.id] || false,
            ]),
          );

          return {
            lessons: lessons,
            lessonStatus: newStatus,
          };
        }),

      setSelectedLesson: (lesson) =>
        set({ selectedLesson: lesson }),

      markCompleted: async (lessonId) => {
        // Save WebContainer state when a lesson is completed
        await webContainerService.saveFilesToStorage();

        set((state) => ({
          lessonStatus: {
            ...state.lessonStatus,
            [lessonId]: true,
          },
        }));
      },

      markIncomplete: (lessonId) =>
        set((state) => ({
          lessonStatus: {
            ...state.lessonStatus,
            [lessonId]: false,
          },
        })),

      resetProgress: async () => {
        // Reset WebContainer to original state
        await webContainerService.resetToOriginal();

        set((state) => ({
          lessonStatus: Object.fromEntries(state.lessons.map(lesson => [lesson.id, false])),
        }));
      },
    }),
    {
      name: "accedemia-lesson-progress",
      // Only persist these fields
      partialize: (state) => ({
        lessonStatus: state.lessonStatus,
      }),
    },
  ),
);