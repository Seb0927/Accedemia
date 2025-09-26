import { cn } from "@/utils/cn";

interface CardProps {
  className?: string
  children: React.ReactNode
}

function Card({ className, children }: CardProps) {
  return (
    <div className={cn("card-border card relative shadow-md", className)}>
      <div className="card-body relative h-full p-0">
          {children}
      </div>
    </div>
  );
}

export default Card;