import { CircleMinus, CircleX, Check } from "lucide-react";
import { LessonStatus } from "@/features/learn/types/lesson";

interface LessonBadgeProps {
  state: LessonStatus;
}

function LessonBadge({ state }: LessonBadgeProps) {
  if (state === "not_started") {
    return (
      <div className="badge badge-xs badge-soft badge-neutral gap-1">
        <CircleMinus size={12} />
        Pendiente
      </div>
    );
  }

  if (state === "incorrect") {
    return (
      <div className="badge badge-xs badge-soft badge-error gap-1">
        <CircleX size={12} />
        Corregir
      </div>
    );
  }

  if (state === "correct") {
    return (
      <div className="badge badge-xs badge-soft badge-success gap-1">
        <Check size={12} />
        Hecho
      </div>
    );
  }
}

export default LessonBadge;