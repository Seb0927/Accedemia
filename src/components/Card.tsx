import { cn } from "@/utils/cn"

interface CardProps {
  className?: string
  children: React.ReactNode
}

function Card({ className, children }: CardProps) {
  return (
    <div className={cn("h-full card card-border shadow-md relative", className)}>
      <div className="h-full card-body p-0 relative">
        <div className="overflow-auto p-6 h-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card