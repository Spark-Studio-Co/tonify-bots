"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useChats } from "@/entities/chat/hooks/queries/use-get-chats.queries";

const filters = [
  { value: "all", label: "Все", icon: "📢" },
  { value: "work", label: "Работа", icon: "💼" },
  { value: "gaming", label: "Игры", icon: "🎮" },
  { value: "travel", label: "Путешествия", icon: "🌍" },
  { value: "books", label: "Книги", icon: "📚" },
  { value: "sports", label: "Спорт", icon: "⚽" },
  { value: "art", label: "Искусство", icon: "🎨" },
];

export default function ChatsList() {
  const [filter, setFilter] = useState<string>("all");
  const [showAllFilters, setShowAllFilters] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  const { data: chats = [], isLoading, isError } = useChats();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node) &&
        showAllFilters
      ) {
        setShowAllFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAllFilters]);

  const filteredChats =
    filter === "all" ? chats : chats.filter((chat) => chat.category === filter);

  const currentFilter = filters.find((f) => f.value === filter) || filters[0];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">📢 Мои чаты</h3>
        <div className="sm:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllFilters(!showAllFilters)}
            className="flex items-center gap-1 py-1.5 px-3 rounded-full text-sm"
            style={{
              backgroundColor: "var(--color-main, #627ffe)",
              color: "white",
            }}
          >
            <span>{currentFilter.icon}</span>
            <span>{currentFilter.label}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${
                showAllFilters ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.button>

          {showAllFilters && (
            <div
              ref={filtersRef}
              className="absolute right-4 mt-1 z-10 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="p-1">
                {filters.map((f) => (
                  <motion.button
                    key={f.value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFilter(f.value);
                      setShowAllFilters(false);
                    }}
                    className={`flex items-center w-full text-left px-4 py-2 rounded-lg text-sm ${
                      filter === f.value ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    style={{
                      color:
                        filter === f.value
                          ? "var(--color-main, #627ffe)"
                          : "var(--color-dark, #121826)",
                    }}
                  >
                    <span className="mr-2">{f.icon}</span>
                    {f.label}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden sm:block mb-4 overflow-x-auto pb-1 scrollbar-hide">
        <div className="flex space-x-2 min-w-max">
          {filters.map((f) => (
            <motion.button
              key={f.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.value)}
              className={`flex items-center py-2 px-4 rounded-full text-sm transition-all duration-200 ${
                filter === f.value ? "shadow-md" : ""
              }`}
              style={{
                backgroundColor:
                  filter === f.value
                    ? "var(--color-main, #627ffe)"
                    : "rgba(98, 127, 254, 0.1)",
                color:
                  filter === f.value ? "white" : "var(--color-dark, #121826)",
                boxShadow:
                  filter === f.value
                    ? "0 4px 10px rgba(98, 127, 254, 0.3)"
                    : "none",
              }}
            >
              <span className="mr-1.5">{f.icon}</span>
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <p className="text-gray-500 text-center">Загрузка чатов...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">Ошибка загрузки чатов</p>
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat: any) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl shadow-sm cursor-pointer transition-all duration-200 bg-white"
              style={{
                borderLeft: `4px solid ${getCategoryColor(chat.category)}`,
              }}
            >
              <h4 className="font-medium text-gray-900">{chat.name}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {chat.lastMessage || "Нет сообщений"}
              </p>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-gray-500">Нет чатов в этой категории</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function getCategoryColor(category: string): string {
  switch (category) {
    case "work":
      return "#4f46e5";
    case "gaming":
      return "#8b5cf6";
    case "travel":
      return "#3b82f6";
    case "books":
      return "#10b981";
    case "sports":
      return "#ef4444";
    case "art":
      return "#f59e0b";
    default:
      return "#6b7280";
  }
}
