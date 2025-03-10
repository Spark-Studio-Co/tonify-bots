import { InputHTMLAttributes, forwardRef } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            type="checkbox"
            ref={ref}
            className={`h-4 w-4 rounded border-gray-300 text-[var(--color-main)] 
                      focus:ring-[var(--color-main)] focus:outline-none
                      ${className}`}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-2 text-sm">
            <label htmlFor={id} className="font-medium text-dark">
              {label}
            </label>
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
