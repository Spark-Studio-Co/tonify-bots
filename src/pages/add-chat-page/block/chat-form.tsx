"use client";

import { MessageCircle, LinkIcon } from "lucide-react";
import { PrivateToggle } from "./private-toggle";

interface ChatFormProps {
  chatName: string;
  chatLink: string;
  isPrivate: boolean;
  error: string;
  onChangeChatName: (value: string) => void;
  onChangeChatLink: (value: string) => void;
  onTogglePrivate: () => void;
}

export function ChatForm({
  chatName,
  chatLink,
  isPrivate,
  error,
  onChangeChatName,
  onChangeChatLink,
  onTogglePrivate,
}: ChatFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 space-y-4">
        {/* Chat Name */}
        <div>
          <label
            htmlFor="chatName"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Название чата
          </label>
          <div className="relative">
            <input
              type="text"
              id="chatName"
              value={chatName}
              onChange={(e) => onChangeChatName(e.target.value)}
              placeholder="Название чата"
              className={`w-full py-3 pl-10 pr-4 rounded-xl border ${
                error ? "border-red-500" : "border-gray-200"
              } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
            />
            <MessageCircle
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* Chat Link */}
        <div>
          <label
            htmlFor="chatLink"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Ссылка на чат*
          </label>
          <div className="relative">
            <input
              type="text"
              id="chatLink"
              value={chatLink}
              onChange={(e) => onChangeChatLink(e.target.value)}
              placeholder="https://t.me/yourchat"
              className={`w-full py-3 pl-10 pr-4 rounded-xl border ${
                error ? "border-red-500" : "border-gray-200"
              } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
            />
            <LinkIcon
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
        <PrivateToggle isPrivate={isPrivate} onToggle={onTogglePrivate} />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
