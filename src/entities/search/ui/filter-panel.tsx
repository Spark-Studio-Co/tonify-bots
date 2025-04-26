"use client"

export interface FilterValues {
  category: string
  priceRange: [number, number]
  location: string
  status: string
}

interface FilterPanelProps {
  filters: FilterValues
  onFilterChange: <K extends keyof FilterValues>(filterName: K, value: FilterValues[K]) => void
  onReset: () => void
  categories: string[]
  locations: string[]
  className?: string
}

export default function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  categories,
  locations,
  className = "",
}: FilterPanelProps) {
  return (
    <div className={`bg-white ${className}`}>
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Категория</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onFilterChange("category", category)}
                className={`py-1.5 px-3 rounded-lg text-sm ${
                  filters.category === category ? "text-white" : "text-gray-700 bg-gray-100"
                }`}
                style={{
                  backgroundColor: filters.category === category ? "var(--color-main, #627ffe)" : undefined,
                }}
              >
                {category === "all" ? "Все категории" : category}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Местоположение</label>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
            className="w-full py-2 px-3 rounded-lg border border-gray-200 text-sm"
          >
            <option value="all">Все города</option>
            {locations
              .filter((loc) => loc !== "all")
              .map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
          </select>
        </div>
        {/* Reset Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onReset}
            className="py-2 px-4 rounded-lg text-sm font-medium"
            style={{ color: "var(--color-main, #627ffe)" }}
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  )
}
