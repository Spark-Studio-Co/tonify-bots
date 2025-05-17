"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, X, Filter } from "lucide-react";
import { FilterOptions } from "../deals-page";

interface DealsFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

export function DealsFilters({ filters, onFilterChange }: DealsFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleStatusChange = (status: FilterOptions["status"]) => {
    onFilterChange({ status });
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setDateFrom(e.target.value);
    onFilterChange({
      dateRange: {
        ...filters.dateRange,
        from: date,
      },
    });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setDateTo(e.target.value);
    onFilterChange({
      dateRange: {
        ...filters.dateRange,
        to: date,
      },
    });
  };

  const clearFilters = () => {
    setDateFrom("");
    setDateTo("");
    onFilterChange({
      status: "all",
      dateRange: {
        from: null,
        to: null,
      },
      search: "",
    });
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.search !== "" ||
    filters.dateRange.from !== null ||
    filters.dateRange.to !== null;

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Поиск */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Поиск по сделкам..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
          />
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Кнопка фильтров */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`py-2.5 px-4 rounded-xl border flex items-center justify-center ${
            hasActiveFilters
              ? "border-main bg-main-light text-main"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Filter size={18} className="mr-2" />
          Фильтры
          {hasActiveFilters && (
            <span className="ml-2 bg-main text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {(filters.status !== "all" ? 1 : 0) +
                (filters.search !== "" ? 1 : 0) +
                (filters.dateRange.from !== null ||
                filters.dateRange.to !== null
                  ? 1
                  : 0)}
            </span>
          )}
        </motion.button>

        {/* Кнопка сброса */}
        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearFilters}
            className="py-2.5 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50"
          >
            <X size={18} className="mr-2" />
            Сбросить
          </motion.button>
        )}
      </div>

      {/* Расширенные фильтры */}
      {showFilters && (
        <div className="mt-4 bg-white rounded-xl shadow-sm p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Статус */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Статус
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange("all")}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  filters.status === "all"
                    ? "bg-main text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Все
              </button>
              <button
                onClick={() => handleStatusChange("completed")}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  filters.status === "completed"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Завершенные
              </button>
              <button
                onClick={() => handleStatusChange("pending")}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  filters.status === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                В процессе
              </button>
            </div>
          </div>

          {/* Дата от */}
          <div>
            <label
              htmlFor="date-from"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Дата от
            </label>
            <div className="relative">
              <input
                type="date"
                id="date-from"
                value={dateFrom}
                onChange={handleDateFromChange}
                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
              />
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Дата до */}
          <div>
            <label
              htmlFor="date-to"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Дата до
            </label>
            <div className="relative">
              <input
                type="date"
                id="date-to"
                value={dateTo}
                onChange={handleDateToChange}
                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
              />
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
