"use client";

import { useSearchStore } from "@/entities/search/model/use-search-store";
import FilterPanel from "@/entities/search/ui/filter-panel";
import FilterToggle from "@/entities/search/ui/filter-toggle";
import SearchBar from "@/entities/search/ui/search-bar";
import SortControls, { SortOption } from "@/entities/search/ui/sort-controlts";
import SearchResults from "@/widgets/search-results/search-results";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SearchBlock() {
  const {
    searchQuery,
    filters,
    results,
    isLoading,
    recentSearches,
    setSearchQuery,
    updateFilter,
    resetFilters,
    performSearch,
    clearRecentSearches,
    addToRecentSearches,
  } = useSearchStore();

  const [showFilters, setShowFilters] = useState(false);

  // Categories for filter
  const categories = [
    "all",
    "Транспорт",
    "Недвижимость",
    "Электроника",
    "Услуги",
    "Мебель",
    "Животные",
  ];

  // Locations for filter
  const locations = [
    "all",
    "Москва",
    "Санкт-Петербург",
    "Екатеринбург",
    "Казань",
    "Новосибирск",
    "Онлайн",
  ];

  // Perform search when component mounts
  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // Handle search submit
  const handleSearch = () => {
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery);
    }
    performSearch();
  };

  // Handle recent search click
  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    performSearch();
  };

  // Toggle sort order
  const handleSortOrderToggle = () => {
    updateFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc");
    performSearch();
  };

  // Handle sort by change
  const handleSortByChange = (sortBy: SortOption) => {
    updateFilter("sortBy", sortBy);
    performSearch();
  };

  // Handle filter change
  const handleFilterChange = <K extends keyof typeof filters>(
    filterName: K,
    value: (typeof filters)[K]
  ) => {
    updateFilter(filterName, value);
    performSearch();
  };

  // Handle reset filters
  const handleResetFilters = () => {
    resetFilters();
    performSearch();
  };

  // Handle reset all
  const handleResetAll = () => {
    resetFilters();
    setSearchQuery("");
    performSearch();
  };

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.location !== "all") count++;
    if (filters.status !== "all") count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000) count++;
    return count;
  };

  // Handle announcement click
  const handleAnnouncementClick = (announcement: any) => {
    console.log("Announcement clicked:", announcement);
    // Navigate to announcement details or show modal
  };

  return (
    <div className="flex flex-col w-full mt-8 min-h-screen">
      {/* Search Header */}
      <div className="sticky p-4 top-4 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            recentSearches={recentSearches}
            onRecentSearchClick={handleRecentSearchClick}
            onClearRecentSearches={clearRecentSearches}
            placeholder="Поиск объявлений..."
          />

          {/* Filter Bar */}
          <div className="flex justify-between items-center mt-3">
            <FilterToggle
              onClick={() => setShowFilters(!showFilters)}
              activeFiltersCount={countActiveFilters()}
              isActive={showFilters}
            />
            <SortControls
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSortByChange={handleSortByChange}
              onSortOrderToggle={handleSortOrderToggle}
            />
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-t border-b border-gray-200 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 max-w-md">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange as any}
                onReset={handleResetFilters}
                categories={categories}
                locations={locations}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <div className="flex-1 container mx-auto px-4 py-4 max-w-md">
        <SearchResults
          results={results}
          isLoading={isLoading}
          onAnnouncementClick={handleAnnouncementClick}
          onReset={handleResetAll}
        />
      </div>
    </div>
  );
}
