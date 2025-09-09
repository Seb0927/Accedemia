import { cn } from "@/utils/cn";

interface CardProps {
  className?: string
  children: React.ReactNode
}

function Card({ className, children }: CardProps) {
  return (
    <div className={cn("card-border card relative h-full shadow-md", className)}>
      <div className="relative card-body h-full p-0">
        <div className="h-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;