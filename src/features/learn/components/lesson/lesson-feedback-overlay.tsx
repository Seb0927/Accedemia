"use client";

import { CircleCheckBig, CircleX } from "lucide-react";
import { useLessonStore } from "@/features/learn/stores/use-lesson-store";
import { LessonStatus } from "@/features/learn/types/lesson";

import ReactMarkdown from "@/components/react-markdown";

interface LessonFeedbackOverlayProps {
  lessonId: string;
  state: Extract<LessonStatus, "correct" | "incorrect">;
  feedbackMessage: string;
}

const titles = {
  correct: "¡Buen trabajo!",
  incorrect: "Inténtalo de nuevo",
};

function LessonFeedbackOverlay({ lessonId, state, feedbackMessage }: LessonFeedbackOverlayProps) {
  const setLessonNotStarted = useLessonStore((store) => store.setLessonNotStarted);

  const bgColor = state === "correct" ? "bg-success" : "bg-error";
  const bgColorOpaque = state === "correct" ? "bg-success/20" : "bg-error/20";
  const icon = state === "correct" ? <CircleCheckBig /> : <CircleX />;

  return (
    <>
      {/* Background overlay */}
      <div className={`
        ${bgColor}
        absolute size-full min-h-full rounded-lg opacity-30
      `} />

      {/* Feedback card*/}
      <div className={"absolute z-1 flex size-full items-center justify-center"}>
        <div className="card bg-base-100 w-96 p-4 shadow-xl">
          <div className="card-body text-center">
            <div className="mb-4 flex justify-center">
              <div className={`
                ${bgColorOpaque}
                rounded-full p-4
              `}>
                {icon}
              </div>
            </div>
            <div className="mb-2">
              <h2 className="card-title justify-center text-xl">{titles[state]}</h2>
              <ReactMarkdown content={feedbackMessage} />
            </div>
            {state === "incorrect" &&
              <div className="mt-2 flex justify-center gap-3">
                <button onClick={() => { setLessonNotStarted(lessonId); }} className={`
                  btn btn-primary
                `}>
                  Reintentar
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default LessonFeedbackOverlay;