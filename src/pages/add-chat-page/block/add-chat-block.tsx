import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Search, ExternalLink, MessageCircle } from "lucide-react";

export default function AddChatBlock() {
  const [chatLink, setChatLink] = useState("");
  const [chatName, setChatName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleChangeChatLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatLink(e.target.value);
    if (error) setError("");
  };

  const handleChangeChatName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="min-h-screen w-full">
      <div className="w-full">
        <form className="space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
              <Link size={40} style={{ color: "var(--color-main, #627ffe)" }} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <p className="text-gray-600 text-sm">
                Добавьте существующий чат, введя ссылку на него. Убедитесь, что
                бот @AdsTonify_bot добавлен в чат и имеет права администратора.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 space-y-4">
              <div>
                <label
                  htmlFor="chatLink"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Название чата
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="chatMessage"
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
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
            </div>
            <div className="p-4 space-y-4">
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
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </div>
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
              </ul>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 px-6 rounded-xl text-white font-medium flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-main, #627ffe)",
              boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
            }}
          >
            {isVerifying ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            ) : (
              <Search size={18} className="mr-2" />
            )}
            {isVerifying ? "Проверка..." : "Добавить чат"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
