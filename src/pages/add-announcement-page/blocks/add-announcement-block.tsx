import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Image, Users, Send, X, Check } from "lucide-react";

export const AddAnnouncementBlock = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    imageUrl: "",
    scheduledDate: "",
    scheduledTime: "",
    targetChats: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available chats for targeting
  const availableChats = [
    { id: "chat1", name: "💼 Работа и вакансии" },
    { id: "chat2", name: "🎮 Геймеры России" },
    { id: "chat3", name: "🌍 Путешествия и туризм" },
    { id: "chat4", name: "📚 Книжный клуб" },
    { id: "chat5", name: "⚽ Фанаты футбола" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
          setFormData((prev) => ({
            ...prev,
            imageUrl: URL.createObjectURL(file),
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChatToggle = (chatId: string) => {
    setFormData((prev) => {
      const isSelected = prev.targetChats.includes(chatId);

      if (isSelected) {
        return {
          ...prev,
          targetChats: prev.targetChats.filter((id) => id !== chatId),
        };
      } else {
        return {
          ...prev,
          targetChats: [...prev.targetChats, chatId],
        };
      }
    });

    // Clear error when user selects chats
    if (errors.targetChats) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.targetChats;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Введите заголовок объявл��ния";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Введите текст объявления";
    }

    if (formData.targetChats.length === 0) {
      newErrors.targetChats = "Выберите хотя бы один чат";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
  };

  return (
    <div className="min-h-screen w-full pb-24">
      {/* Form */}
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Message */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Заголовок*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Введите заголовок объявления"
                  className={`w-full py-3 px-4 rounded-xl border ${
                    errors.title ? "border-red-500" : "border-gray-200"
                  } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Текст объявления*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Введите текст объявления"
                  rows={4}
                  className={`w-full py-3 px-4 rounded-xl border ${
                    errors.message ? "border-red-500" : "border-gray-200"
                  } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>
            </div>
          </div>
          {/* Image Upload */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Изображение
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-blue-500"
                >
                  Выбрать
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData((prev) => ({ ...prev, imageUrl: "" }));
                    }}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex flex-col items-center justify-center cursor-pointer"
                >
                  <Image size={24} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Нажмите, чтобы добавить изображение
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">
                  Выберите категории*
                </h3>
                <span className="text-sm text-gray-500">
                  Выбрано: {formData.targetChats.length}
                </span>
              </div>
              {errors.targetChats && (
                <p className="text-sm text-red-500">{errors.targetChats}</p>
              )}
              <div className="space-y-2">
                {availableChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatToggle(chat.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.targetChats.includes(chat.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users size={18} className="text-gray-500 mr-2" />
                        <span className="text-gray-900">{chat.name}</span>
                      </div>
                      {formData.targetChats.includes(chat.id) && (
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl text-white font-medium flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-main, #627ffe)",
              boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
            }}
          >
            Опубликовать объявление
          </motion.button>
        </form>
      </div>
    </div>
  );
};
