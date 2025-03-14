"use client";

interface LoadingIndicatorProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function LoadingIndicator({
  size = "medium",
  className = "",
}: LoadingIndicatorProps) {
  const sizeMap = {
    small: "h-6 w-6",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className={`flex justify-center items-center py-8 ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 ${sizeMap[size]}`}
        style={{ borderColor: "var(--color-main, #627ffe)" }}
      ></div>
    </div>
  );
}
