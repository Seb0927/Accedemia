"use client";

import { useLessonStore } from "@/features/learn/stores/use-lesson-store";
import ReactMarkdown from "@/features/learn/components/react-markdown";
import LessonFeedbackOverlay from "@/features/learn/components/lesson-feedback-overlay";
import welcomeContent from "@/assets/markdown/welcome.md";
import "highlight.js/styles/github.css";

function LessonContent() {
  const selectedLesson = useLessonStore((state) => state.selectedLesson);
  const lessonStatus = useLessonStore((state) => state.lessonStatus);
  const selectedLessonStatus = selectedLesson ? lessonStatus[selectedLesson.id] : null;

  const isFeedbackVisible = (selectedLessonStatus?.status === ("correct")
    || selectedLessonStatus?.status === "incorrect");

  if (!selectedLesson?.id) {
    return (
      <div className="relative z-0 rounded-lg">
        <div className="p-8">
          <ReactMarkdown content={welcomeContent} />
        </div>
      </div>
    );
  }

  return (
    <>
      {isFeedbackVisible &&
        <LessonFeedbackOverlay
          lessonId={selectedLesson.id}
          state={selectedLessonStatus.status}
          feedbackMessage={selectedLessonStatus.feedbackMessage}
        />
      }


      <div className="relative z-0 rounded-lg">
        {selectedLesson && (
          <div
            inert
            aria-disabled={isFeedbackVisible}
            aria-hidden={isFeedbackVisible}
            className={`
              ${isFeedbackVisible ? "opacity-5" : ""}
              p-8
            `}>
            <ReactMarkdown content={selectedLesson.content} />
          </div>
        )}
      </div>
    </>
  );
}

export default LessonContent;