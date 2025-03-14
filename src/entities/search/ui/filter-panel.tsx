"use client";

export interface FilterValues {
  category: string;
  priceRange: [number, number];
  location: string;
  status: string;
}

interface FilterPanelProps {
  filters: FilterValues;
  onFilterChange: <K extends keyof FilterValues>(
    filterName: K,
    value: FilterValues[K]
  ) => void;
  onReset: () => void;
  categories: string[];
  locations: string[];
  className?: string;
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
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Категория
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onFilterChange("category", category)}
                className={`py-1.5 px-3 rounded-lg text-sm ${
                  filters.category === category
                    ? "text-white"
                    : "text-gray-700 bg-gray-100"
                }`}
                style={{
                  backgroundColor:
                    filters.category === category
                      ? "var(--color-main, #627ffe)"
                      : undefined,
                }}
              >
                {category === "all" ? "Все категории" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Цена
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value);
                onFilterChange("priceRange", [
                  isNaN(value) ? 0 : value,
                  filters.priceRange[1],
                ]);
              }}
              placeholder="От"
              className="w-full py-2 px-3 rounded-lg border border-gray-200 text-sm"
            />
            <span className="text-gray-500">—</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value);
                onFilterChange("priceRange", [
                  filters.priceRange[0],
                  isNaN(value) ? 1000000 : value,
                ]);
              }}
              placeholder="До"
              className="w-full py-2 px-3 rounded-lg border border-gray-200 text-sm"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Местоположение
          </label>
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

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Статус
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => onFilterChange("status", "all")}
              className={`py-1.5 px-3 rounded-lg text-sm ${
                filters.status === "all"
                  ? "text-white"
                  : "text-gray-700 bg-gray-100"
              }`}
              style={{
                backgroundColor:
                  filters.status === "all"
                    ? "var(--color-main, #627ffe)"
                    : undefined,
              }}
            >
              Все
            </button>
            <button
              type="button"
              onClick={() => onFilterChange("status", "active")}
              className={`py-1.5 px-3 rounded-lg text-sm ${
                filters.status === "active"
                  ? "text-white"
                  : "text-gray-700 bg-gray-100"
              }`}
              style={{
                backgroundColor:
                  filters.status === "active"
                    ? "var(--color-secondary, #7bc394)"
                    : undefined,
              }}
            >
              Активные
            </button>
            <button
              type="button"
              onClick={() => onFilterChange("status", "inactive")}
              className={`py-1.5 px-3 rounded-lg text-sm ${
                filters.status === "inactive"
                  ? "text-white"
                  : "text-gray-700 bg-gray-100"
              }`}
              style={{
                backgroundColor:
                  filters.status === "inactive" ? "#6b7280" : undefined,
              }}
            >
              Неактивные
            </button>
          </div>
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
  );
}
