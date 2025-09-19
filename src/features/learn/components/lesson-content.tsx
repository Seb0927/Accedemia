"use client";

import { useLessonStore } from "../stores/use-lesson-store";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function LessonContent() {
  const selectedLesson = useLessonStore((state) => state.selectedLesson);

  const { data: lesson } = useSWR(
    selectedLesson?.id ? `/api/curriculum/${selectedLesson.id}` : null,
    fetcher,
    { suspense: true },
  );

  if (!selectedLesson?.id) {
    return (
      <div className='p-8'>
        ¡Selecciona una lección por favor!
      </div>
    );
  }

  return (
    <div className="overflow-auto p-8">
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
    </div >
  );
}

export default LessonContent;
