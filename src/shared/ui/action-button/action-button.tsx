import type { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant: "primary" | "secondary";
}

export default function ActionButton({
  icon,
  label,
  onClick,
  variant,
}: ActionButtonProps) {
  const getStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "var(--color-main, #627ffe)",
          color: "white",
          hoverBg: "rgba(98, 127, 254, 0.9)",
        };
      case "secondary":
        return {
          backgroundColor: "var(--color-secondary, #7bc394)",
          color: "white",
          hoverBg: "rgba(123, 195, 148, 0.9)",
        };
      default:
        return {
          backgroundColor: "var(--color-main, #627ffe)",
          color: "white",
          hoverBg: "rgba(98, 127, 254, 0.9)",
        };
    }
  };

  const styles = getStyles();

  return (
    <button
      onClick={onClick}
      className="flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-md"
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      }}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}
