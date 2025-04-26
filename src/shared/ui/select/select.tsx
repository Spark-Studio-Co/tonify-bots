import { forwardRef, type SelectHTMLAttributes } from "react"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options?: SelectOption[] // Accepts options dynamically
  label?: string
  id?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", options = [], label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-main">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-main)] focus:border-transparent 
                      bg-white text-gray-900 
                      ${className}`}
          {...props}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No options available
            </option>
          )}
        </select>
      </div>
    )
  },
)

Select.displayName = "Select"
