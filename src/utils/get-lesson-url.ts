import { getLessonById } from "@/features/learn/api/curriculum/get-lesson";

export async function getLessonFromUrl() {
  const url = new URL(window.location.href);
  const lessonId = url.searchParams.get("lesson");
  
  if (!lessonId) return null;
  return getLessonById(lessonId);
}