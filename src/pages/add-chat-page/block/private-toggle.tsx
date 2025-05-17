"use client";

import { Lock } from "lucide-react";

interface PrivateToggleProps {
  isPrivate: boolean;
  onToggle: () => void;
}

export function PrivateToggle({ isPrivate, onToggle }: PrivateToggleProps) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Lock
            size={18}
            className={`mr-2 ${isPrivate ? "text-main" : "text-gray-500"}`}
          />
          <label
            htmlFor="private-toggle"
            className="text-sm font-medium text-gray-700"
          >
            Приватный чат
          </label>
        </div>

        {/* Toggle Switch - Implemented as a button for better accessibility */}
        <button
          type="button"
          onClick={onToggle}
          className="relative inline-block w-12 h-6 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-main focus:ring-opacity-50"
          aria-pressed={isPrivate}
          aria-labelledby="private-chat-label"
        >
          <span
            className={`block w-full h-full rounded-full transition-colors duration-200 ${
              isPrivate ? "bg-main" : "bg-gray-300"
            }`}
          />
          <span
            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${
              isPrivate ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className={`mt-2 ${isPrivate ? "block" : "hidden"}`}>
        <p className="text-xs text-gray-500">
          Отметьте, если это закрытый чат или канал с ограниченным доступом
        </p>
      </div>
    </div>
  );
}
