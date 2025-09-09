import { cn } from "@/utils/cn";

interface CardProps {
  className?: string
  children: React.ReactNode
}

function Card({ className, children }: CardProps) {
  return (
    <div className={cn("h-full card card-border shadow-md relative", className)}>
      <div className="card-body relative h-full p-0">
        <div className="h-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;