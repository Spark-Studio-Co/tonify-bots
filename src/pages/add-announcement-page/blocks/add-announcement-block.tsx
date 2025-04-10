import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Image, Users, X, Check } from "lucide-react";
import { useAddAnnouncement } from "@/entities/announcement/hooks/mutations/use-add-announcement.mutation";
import WebApp from "@twa-dev/sdk";

export const AddAnnouncementBlock = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    scheduledDate: "",
    scheduledTime: "",
    telegramUsername: "",
    categories: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: addAnnouncement, isPending: isLoading } =
    useAddAnnouncement();

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
      const isSelected = prev.categories.includes(chatId);

      if (isSelected) {
        return {
          ...prev,
          categories: prev.categories.filter((id) => id !== chatId),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, chatId],
        };
      }
    });

    // Clear error when user selects chats
    if (errors.categories) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.categories;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите заголовок объявл��ния";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Введите текст объявления";
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "Выберите хотя бы один чат";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    const hasSchedule = formData.scheduledDate && formData.scheduledTime;

    const payload = {
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imageUrl,
      telegramUsername: WebApp.initDataUnsafe.user?.username || "",
      categories: formData.categories,
      ...(hasSchedule && {
        scheduledAt: new Date(
          `${formData.scheduledDate}T${formData.scheduledTime}`
        ).toISOString(),
      }),
    };

    addAnnouncement(payload as any);
  };

  return (
    <div className="min-h-screen w-full pb-24">
      {/* Form */}
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & description */}
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
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введите заголовок объявления"
                  className={`w-full py-3 px-4 rounded-xl border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Текст объявления*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Введите текст объявления"
                  rows={4}
                  className={`w-full py-3 px-4 rounded-xl border ${
                    errors.description ? "border-red-500" : "border-gray-200"
                  } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
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
                  Выбрано: {formData.categories.length}
                </span>
              </div>
              {errors.categories && (
                <p className="text-sm text-red-500">{errors.categories}</p>
              )}
              <div className="space-y-2">
                {availableChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatToggle(chat.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.categories.includes(chat.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users size={18} className="text-gray-500 mr-2" />
                        <span className="text-gray-900">{chat.name}</span>
                      </div>
                      {formData.categories.includes(chat.id) && (
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
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl text-white font-medium flex items-center justify-center disabled:opacity-50"
            style={{
              backgroundColor: "var(--color-main, #627ffe)",
              boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
            }}
          >
            {isLoading ? "Публикуем..." : "Опубликовать объявление"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};
