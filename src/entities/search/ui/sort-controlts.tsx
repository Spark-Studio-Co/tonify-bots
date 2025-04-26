"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

export type SortOption = "relevance" | "date" | "price"
export type SortOrder = "asc" | "desc"

interface SortControlsProps {
  sortBy: SortOption
  sortOrder: SortOrder
  onSortByChange: (sortBy: SortOption) => void
  onSortOrderToggle: () => void
  className?: string
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
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortOption)}
        className="text-sm py-1.5 px-3 rounded-lg border border-gray-200 bg-white focus:outline-none"
      >
        <option value="relevance">По релевантности</option>
        <option value="date">По дате</option>
        <option value="price">По цене</option>
      </select>

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
  )
}
