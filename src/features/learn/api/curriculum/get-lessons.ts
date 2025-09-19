import { Lesson } from "@/types/curriculum";

export async function getAllLessons(): Promise<Lesson[]> {
  try {
    const response = await fetch("/api/curriculum");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch lessons: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
}