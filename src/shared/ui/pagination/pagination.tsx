import type React from "react"
import { cn } from "../../lib/utils" // Ensure you have a utility for class merging

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  activeColor?: string // Active dot color
  inactiveColor?: string // Inactive dot color
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  activeColor = "bg-blue-500 border-blue-500",
  inactiveColor = "border-blue-500",
}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1
        const isActive = page === currentPage

        return (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={cn(
              "border-2 rounded-full transition-all duration-300",
              isActive ? `${activeColor} w-[12px] h-[12px]` : `${inactiveColor} w-[12px] h-[12px]`,
            )}
          />
        )
      })}
    </div>
  )
}

export default Pagination
