import { Filter } from "lucide-react";

interface FilterToggleProps {
  onClick: () => void;
  activeFiltersCount: number;
  isActive?: boolean;
  className?: string;
}

export default function FilterToggle({
  onClick,
  activeFiltersCount,
  isActive = false,
  className = "",
}: FilterToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center py-1.5 px-3 rounded-lg text-sm ${className}`}
      style={{
        backgroundColor:
          activeFiltersCount > 0 || isActive
            ? "var(--color-main-light, #eff3fc)"
            : "transparent",
        color: "var(--color-dark, #121826)",
      }}
    >
      <Filter size={16} className="mr-1.5" />
      Фильтры
      {activeFiltersCount > 0 && (
        <span
          className="ml-1.5 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white"
          style={{ backgroundColor: "var(--color-main, #627ffe)" }}
        >
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
}
