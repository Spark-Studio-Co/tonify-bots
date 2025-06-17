"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import CustomDropdown from "@/shared/ui/custom-dropdown";

export type SortOption = "relevance" | "date" | "price";
export type SortOrder = "asc" | "desc";

interface SortControlsProps {
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortByChange: (sortBy: SortOption) => void;
  onSortOrderToggle: () => void;
  className?: string;
}

export default function SortControls({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderToggle,
  className = "",
}: SortControlsProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <CustomDropdown
        options={[
          { value: "relevance", label: "По релевантности" },
          { value: "date", label: "По дате" },
          { value: "price", label: "По цене" },
        ].map((opt) => opt.label)}
        value={
          sortBy === "relevance"
            ? "По релевантности"
            : sortBy === "date"
            ? "По дате"
            : "По цене"
        }
        onChange={(label) => {
          const value =
            label === "По релевантности"
              ? "relevance"
              : label === "По дате"
              ? "date"
              : "price";
          onSortByChange(value as SortOption);
        }}
        placeholder="Сортировка"
        className="text-sm"
      />

      <button
        type="button"
        onClick={onSortOrderToggle}
        className="p-1.5 rounded-lg border border-gray-200 bg-white"
        aria-label={sortOrder === "asc" ? "По возрастанию" : "По убыванию"}
      >
        {sortOrder === "asc" ? (
          <ArrowUp size={16} className="text-gray-600" />
        ) : (
          <ArrowDown size={16} className="text-gray-600" />
        )}
      </button>
    </div>
  );
}
