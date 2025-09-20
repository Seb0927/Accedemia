import { create } from "zustand";
import { persist } from "zustand/middleware";
import webContainerService from "@/features/learn/services/webcontainer-service";

type LessonProgressState =
  | { status: "not_started" }
  | { status: "incorrect", feedbackMessage: string }
  | { status: "correct", feedbackMessage: string };

interface LessonProgress {
  [lessonId: string]: LessonProgressState;
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
  setLessonCorrect: (lessonId: string, feedbackMessage: string) => void;
  setLessonIncorrect: (lessonId: string, feedbackMessage: string) => void;
  setLessonNotStarted: (lessonId: string) => void;
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
              // Use existing status if available, otherwise not_started
              existingStatus[lesson.id] || { status: "not_started" },
            ]),
          );

          return {
            lessons: lessons,
            lessonStatus: newStatus,
          };
        }),

      setSelectedLesson: (lesson) =>
        set({ selectedLesson: lesson }),

      setLessonCorrect: async (lessonId, feedbackMessage) => {
        // Save WebContainer state when a lesson is completed
        await webContainerService.saveFilesToStorage();

        set((state) => ({
          lessonStatus: {
            ...state.lessonStatus,
            [lessonId]: { status: "correct", feedbackMessage },
          },
        }));
      },

      setLessonIncorrect: (lessonId, feedbackMessage) =>
        set((state) => ({
          lessonStatus: {
            ...state.lessonStatus,
            [lessonId]: { status: "incorrect", feedbackMessage },
          },
        })),

      setLessonNotStarted: (lessonId) =>
        set((state) => ({
          lessonStatus: {
            ...state.lessonStatus,
            [lessonId]: { status: "not_started" },
          },
        })),

      resetProgress: async () => {
        // Reset WebContainer to original state
        await webContainerService.resetToOriginal();

        set((state) => ({
          lessonStatus: Object.fromEntries(
            state.lessons.map(lesson => [lesson.id, { status: "not_started" }]),
          ),
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