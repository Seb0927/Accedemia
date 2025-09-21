import { CircleCheckBig, CircleX } from "lucide-react";

interface LessonFeedbackOverlayProps {
  state: "correct" | "incorrect";
  feedbackMessage: string;
}

const titles = {
  correct: "¡Buen trabajo!",
  incorrect: "Inténtalo de nuevo",
};

function LessonFeedbackOverlay({ state, feedbackMessage }: LessonFeedbackOverlayProps) {
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
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body text-center">
            <div className="mb-4 flex justify-center">
              <div className={`
                ${bgColorOpaque}
                rounded-full p-4
              `}>
                {icon}
              </div>
            </div>
            <h2 className="card-title justify-center text-xl">{titles[state]}</h2>
            <p className="text-base-content/70">
              {feedbackMessage}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LessonFeedbackOverlay;