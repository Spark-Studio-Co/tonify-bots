"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, Search, ExternalLink, MessageCircle, Lock } from "lucide-react";
import { useToast } from "@/shared/layouts/toast-provider";
import { useCreateChat } from "@/entities/chat/hooks/mutations/use-create-chat.mutation";
import { useTelegram } from "@/shared/layouts/telegram-provider";

export default function AddChatBlock() {
  const [chatLink, setChatLink] = useState("");
  const [chatName, setChatName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState("");
  const { addToast } = useToast();
  const { user } = useTelegram();

  const { mutate: createChat, isPending } = useCreateChat();

  // Debug logging to verify state changes
  useEffect(() => {
    console.log("isPrivate state changed:", isPrivate);
  }, [isPrivate]);

  const handleChangeChatLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatLink(e.target.value);
    if (error) setError("");
  };

  const handleChangeChatName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
    if (error) setError("");
  };

  const handleTogglePrivate = () => {
    setIsPrivate((prevState) => !prevState);
    // Show toast for debugging
    addToast({
      title: "Настройка приватности",
      description: `Чат отмечен как ${!isPrivate ? "приватный" : "публичный"}`,
      type: "info",
      duration: 2000,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatName.trim() || !chatLink.trim()) {
      setError("Пожалуйста, заполните оба поля.");
      addToast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните оба поля.",
        type: "error",
      });
      return;
    }

    const payload = {
      name: chatName.trim(),
      link: chatLink.trim(),
      status: "active",
      isPrivate: isPrivate,
      imageUrl: "/default-chat.png",
      telegramUsername: user?.username || String(user?.id || ""),
    };

    console.log("Submitting payload:", payload);

    createChat(payload, {
      onSuccess: () => {
        addToast({
          title: "Успешно!",
          description: `Чат "${chatName}" добавлен как ${
            isPrivate ? "приватный" : "публичный"
          }`,
          type: "success",
        });
        setChatName("");
        setChatLink("");
        setIsPrivate(false);
      },
      onError: (error) => {
        if (error.message?.includes("Ссылка на чат")) {
          setError(error.message);
        }
      },
    });
  };

  return (
    <div className="min-h-screen w-full pb-16">
      <div className="w-full">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
              <Link size={40} style={{ color: "var(--color-main, #627ffe)" }} />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <p className="text-gray-600 text-sm">
                Добавьте существующий чат, введя ссылку на него. Убедитесь, что
                бот <code>@AdsTonify_bot</code> добавлен в чат и имеет права
                администратора.
              </p>
            </div>
          </div>

          {/* Inputs */}
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
                    onChange={handleChangeChatName}
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
                    onChange={handleChangeChatLink}
                    placeholder="https://t.me/yourchat"
                    className={`w-full py-3 pl-10 pr-4 rounded-xl border ${
                      error ? "border-red-500" : "border-gray-200"
                    } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
                  />
                  <Link
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>

              {/* Private Chat Toggle - Fixed Implementation */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock
                      size={18}
                      className={`mr-2 ${
                        isPrivate ? "text-main" : "text-gray-500"
                      }`}
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
                    onClick={handleTogglePrivate}
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
                    Отметьте, если это закрытый чат или канал с ограниченным
                    доступом
                  </p>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">Примеры ссылок</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <ExternalLink size={14} className="mr-2 text-gray-400" />
                  https://t.me/example_chat
                </li>
                <li className="flex items-center">
                  <ExternalLink size={14} className="mr-2 text-gray-400" />
                  t.me/example_group
                </li>
                <li className="flex items-center">
                  <ExternalLink size={14} className="mr-2 text-gray-400" />
                  @example_chat
                </li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-6 rounded-xl text-white font-medium flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-main, #627ffe)",
              boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
            }}
          >
            {isPending ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                Проверка...
              </>
            ) : (
              <>
                <Search size={18} className="mr-2" />
                Добавить чат
              </>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
