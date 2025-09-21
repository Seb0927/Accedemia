export interface Lesson {
  id: string;
  title: string,
  principle: string;
  guideline: string;
  success_criteria: string;
}

export interface DetailedLesson extends Lesson {
  content: string | null;
  file_path: string;
}