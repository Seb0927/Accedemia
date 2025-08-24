import { cn } from "@/utils/cn"

interface CardProps {
  className?: string
  children: React.ReactNode
}

function Card({className, children}: CardProps) {
  return (
    <div className={cn("card card-border shadow-md", className)}>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default Card