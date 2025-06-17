import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useChats } from "@/entities/chat/hooks/queries/use-get-chats.queries";

export default function ChatsList() {
  const filtersRef = useRef<HTMLDivElement>(null);
  const { data: chats = [], isLoading, isError } = useChats();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        // placeholder logic in case you bring back dropdowns later
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-4">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">📢 Мои чаты</h3>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl shadow-sm bg-gray-100 flex flex-col gap-2 animate-pulse"
              >
                <div className="h-4 w-1/3 bg-gray-300 rounded" />
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </>
        ) : isError ? (
          <p className="text-red-500 text-center">Ошибка загрузки чатов</p>
        ) : chats.length > 0 ? (
          chats?.map((chat: any) => (
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
            <p className="text-gray-500">Нет чатов</p>
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
