
import { Search } from "lucide-react"

interface EmptyStateProps {
  title?: string
  message?: string
  onReset?: () => void
  resetButtonText?: string
  className?: string
}

export default function EmptyState({
  title = "Ничего не найдено",
  message = "Попробуйте изменить параметры поиска или сбросить фильтры",
  onReset,
  resetButtonText = "Сбросить все фильтры",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--color-main-light, #eff3fc)" }}
      >
        <Search size={24} style={{ color: "var(--color-main, #627ffe)" }} />
      </div>
      <h3 className="text-lg font-medium mb-2" style={{ color: "var(--color-dark, #121826)" }}>
        {title}
      </h3>
      <p className="text-gray-500 max-w-xs">{message}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 py-2 px-4 rounded-lg text-sm font-medium"
          style={{ color: "var(--color-main, #627ffe)" }}
        >
          {resetButtonText}
        </button>
      )}
    </div>
  )
}
