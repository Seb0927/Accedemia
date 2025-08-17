import { create } from "zustand";

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
  selectedLesson: Lesson | null
  initializeLessons: (lessons: Lesson[]) => void;
  setSelectedLesson: (lesson: Lesson) => void;
  markCompleted: (lessonId: string) => void;
  markIncomplete: (lessonId: string) => void;
  resetProgress: () => void;
}

export const useLessonStore = create<LessonStore>((set) => ({
  lessons: [],
  lessonStatus: {},
  selectedLesson: null,

  initializeLessons: (lessons) => 
    set({
      lessons: lessons,
      lessonStatus: Object.fromEntries(lessons.map(id => [id, false]))
    }),

  setSelectedLesson: (lesson) => 
    set({ selectedLesson: lesson }),

  markCompleted: (lessonId) =>
    set((state) => ({
      lessonStatus: {
        ...state.lessonStatus,
        [lessonId]: true,
      },
    })),

  markIncomplete: (lessonId) =>
    set((state) => ({
      lessonStatus: {
        ...state.lessonStatus,
        [lessonId]: false,
      },
    })),
    
  resetProgress: () => 
    set((state) => ({ 
      lessonStatus: Object.fromEntries(state.lessons.map(lesson => [lesson.id, false]))
    })),
}));