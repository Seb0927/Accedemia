import { DetailedLesson } from "@/types/curriculum";

export async function getLessonById(lessonId: string): Promise<DetailedLesson | null> {
  try {
    const response = await fetch(`/api/curriculum/${lessonId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch lesson: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching lesson ${lessonId}:`, error);
    return null;
  }
}