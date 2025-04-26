"use client"

import type React from "react"

import { AnimatePresence, motion } from "framer-motion"
import { Clock, Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  recentSearches?: string[]
  onRecentSearchClick?: (query: string) => void
  onClearRecentSearches?: () => void
  placeholder?: string
  className?: string
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  recentSearches = [],
  onRecentSearchClick,
  onClearRecentSearches,
  placeholder = "Поиск...",
  className = "",
}: SearchBarProps) {
  const [showRecentSearches, setShowRecentSearches] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowRecentSearches(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle search submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowRecentSearches(false)
    onSearch()
  }

  return (
    <div className={`relative  ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => value && recentSearches.length > 0 && setShowRecentSearches(true)}
            placeholder={placeholder}
            className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: "white",
            }}
          />
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-main, #627ffe)" }}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("")
                setShowRecentSearches(false)
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Recent Searches Dropdown */}
        <AnimatePresence>
          {showRecentSearches && recentSearches.length > 0 && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-20 overflow-hidden"
            >
              <div className="p-2">
                <div className="flex justify-between items-center px-2 py-1 mb-1">
                  <span className="text-xs text-gray-500">Недавние запросы</span>
                  {onClearRecentSearches && (
                    <button
                      type="button"
                      onClick={onClearRecentSearches}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Очистить
                    </button>
                  )}
                </div>
                {recentSearches.map((query, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      if (onRecentSearchClick) {
                        onRecentSearchClick(query)
                      } else {
                        onChange(query)
                        setShowRecentSearches(false)
                        onSearch()
                      }
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center"
                  >
                    <Clock size={14} className="mr-2 text-gray-400" />
                    <span>{query}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}
