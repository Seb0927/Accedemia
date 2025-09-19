"use client";

import { useLessonStore } from "@/features/learn/stores/use-lesson-store";
import { useState, useEffect } from "react";
import { getLessonById } from "@/features/learn/api/curriculum/get-lesson";
import { Lesson } from "@/types/curriculum";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";

function LessonContent() {
  const selectedLesson = useLessonStore((state) => state.selectedLesson);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedLesson?.id) {
      setLesson(null);
      return;
    }

    const fetchLesson = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchedLesson = await getLessonById(selectedLesson.id);
        setLesson(fetchedLesson);
      } catch (err) {
        setError("Failed to load lesson");
        console.error("Error fetching lesson:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [selectedLesson?.id]);

  if (!selectedLesson?.id) {
    return (
      <div className='p-8'>
        ¡Selecciona una lección por favor!
      </div>
    );
  }

  return (
    <div className="relative size-full overflow-auto">
      {loading && (
        <div className={`
          bg-opacity-80 bg-base-100 absolute inset-0 z-10 flex items-center
          justify-center
        `}>
          <div className="p-4 text-center">
            <div className="loading loading-lg loading-spinner"></div>
            <p className="mt-2 font-medium">Cargando lección...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className={`
          bg-opacity-80 bg-base-100 absolute inset-0 z-10 flex items-center
          justify-center
        `}>
          <div className="p-4 text-center">
            <div className="text-error mb-2 text-xl">⚠️ Ha ocurrido un error: </div>
            <p>{error}</p>
          </div>
        </div>
      )}

      {lesson && (
        <div className="p-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              h1: (props) => <h1 className={`
                mb-4 text-3xl font-bold text-gray-800
                dark:text-gray-200
              `} {...props} />,
              h2: (props) => <h2 className={`
                mt-5 mb-3 text-2xl font-bold text-gray-800
                dark:text-gray-200
              `} {...props} />,
              h3: (props) => <h3 className={`
                mt-4 mb-2 text-xl font-semibold text-gray-800
                dark:text-gray-200
              `} {...props} />,
              p: (props) => <p className={`
                my-3 text-gray-700
                dark:text-gray-300
              `} {...props} />,
              ul: (props) => <ul className="my-4 list-disc pl-5" {...props} />,
              ol: (props) => <ol className="my-4 list-decimal pl-5" {...props} />,
              li: (props) => <li className="mb-1" {...props} />,
              a: (props) => <a className={`
                text-blue-600
                hover:underline
                dark:text-blue-400
              `} {...props} />,
              blockquote: (props) => <blockquote className={`
                my-4 border-l-4 border-gray-300 pl-4 italic
              `} {...props} />,
              code: (props) => <code className="font-mono text-sm" {...props} />,
              pre: (props) => <pre className={`
                my-4 overflow-x-auto rounded bg-gray-50 p-3 text-xs
              `} {...props} />,
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default LessonContent;