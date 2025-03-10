"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export const buttonVariants = {
  primary:
    "bg-main text-white rounded-full min-w-[260px] py-3 flex items-center justify-center gap-2 font-bold shadow-[0_0_15px_3px_rgba(0,0,255,0.6)]", // Permanent blue glow
  secondary: "text-secondary", // Permanent blue glow
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  text: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", disabled, text, children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(
          "rounded-md font-medium transition-colors focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          buttonVariants[variant],
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {text}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
