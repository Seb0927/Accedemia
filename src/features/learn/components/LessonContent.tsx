"use client";

import { useState, useEffect } from 'react';
import { useLessonStore } from '../stores/useLessonStore';
import { Lesson } from '@/types/curriculum';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github.css';


function LessonContent() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const selectedLesson = useLessonStore((state) => state.selectedLesson);

  useEffect(() => {
    async function fetchLesson() {
      if (selectedLesson?.id) {
        const response = await fetch("/api/curriculum/" + selectedLesson.id);
        const lesson: Lesson = await response.json();
        setLesson(lesson);
      }
    }

    fetchLesson();
  }, [selectedLesson?.id]);

  if (!lesson) {
    return (
      <div>
        ¡Selecciona una lección por favor!
      </div>
    );
  }

  return (
    <div className="p-8 overflow-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4 text-gray-800" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3 text-gray-800" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800" {...props} />,
          p: ({ node, ...props }) => <p className="my-3 text-gray-700" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
          code: ({ node, ...props }) => <code className="text-sm font-mono" {...props} />,
          pre: ({ node, ...props }) => <pre className="text-xs bg-gray-50 p-3 rounded my-4 overflow-x-auto" {...props} />
        }}
      >
        {lesson.content}
      </ReactMarkdown>
    </div >
  );
}

export default LessonContent;