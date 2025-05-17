"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Tag,
  User,
  Clock,
  ArrowLeft,
  Share2,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/shared/layouts/toast-provider";
import { useGetAnnouncement } from "@/entities/announcement/hooks/queries/use-get-announcement.query";

export const InnerAnnouncementBlock = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: announcement,
    isLoading,
    isError,
    error,
  } = useGetAnnouncement(id || "");
  const { addToast } = useToast();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: announcement?.title || "Объявление",
          text: announcement?.description || "",
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Ошибка при попытке поделиться:", error);
        });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        addToast({
          title: "Ссылка скопирована",
          description: "Ссылка на объявление скопирована в буфер обмена",
          type: "success",
        });
      });
    }
  };

  const handleContact = () => {
    if (announcement?.telegramUsername) {
      window.open(`https://t.me/${announcement.telegramUsername}`, "_blank");
    } else {
      addToast({
        title: "Контакт недоступен",
        description: "Информация о контакте отсутствует",
        type: "error",
      });
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-main border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Ошибка загрузки
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          {error instanceof Error
            ? error.message
            : "Не удалось загрузить объявление"}
        </p>
        <button
          onClick={handleGoBack}
          className="py-2 px-4 rounded-lg text-white font-medium"
          style={{ backgroundColor: "var(--color-main, #627ffe)" }}
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
          <AlertCircle size={32} className="text-yellow-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Объявление не найдено
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Запрашиваемое объявление не существует или было удалено
        </p>
        <button
          onClick={handleGoBack}
          className="py-2 px-4 rounded-lg text-white font-medium"
          style={{ backgroundColor: "var(--color-main, #627ffe)" }}
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pb-24">
      <div className="container mx-auto max-w-md">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleGoBack}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Объявление</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Announcement Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {/* Image */}
          {announcement.image && (
            <div className="relative w-full h-56">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin h-8 w-8 border-4 border-main border-t-transparent rounded-full"></div>
                </div>
              )}
              <img
                src={announcement.image || "/placeholder.svg"}
                alt={announcement.title}
                className="w-full h-full object-cover"
                onLoad={() => setIsImageLoading(false)}
                style={{ display: isImageLoading ? "none" : "block" }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-4">
            {/* Status Badge */}
            <div className="mb-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  announcement.status === "Одобрено"
                    ? "bg-green-100 text-green-800"
                    : announcement.status === "Отклонено"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {announcement.status}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {announcement.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-4">{announcement.description}</p>

            {/* Meta Information */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-2" />
                <span>Опубликовано: {announcement.date}</span>
              </div>

              {announcement.categories &&
                announcement.categories.length > 0 && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Tag size={16} className="mr-2" />
                    <span>Категории: {announcement.categories.join(", ")}</span>
                  </div>
                )}

              {announcement.telegramUsername && (
                <div className="flex items-center text-sm text-gray-500">
                  <User size={16} className="mr-2" />
                  <span>Автор: @{announcement.telegramUsername}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-3 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContact}
                className="flex-1 py-2.5 px-4 rounded-lg text-white font-medium flex items-center justify-center"
                style={{ backgroundColor: "var(--color-main, #627ffe)" }}
              >
                <MessageCircle size={18} className="mr-2" />
                Связаться
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="py-2.5 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium flex items-center justify-center"
              >
                <Share2 size={18} className="mr-2" />
                Поделиться
              </motion.button>
            </div>
          </div>
        </div>

        {/* Related Announcements (placeholder) */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">
              Похожие объявления
            </h3>
            <div className="text-center py-6 text-gray-500">
              <Clock size={24} className="mx-auto mb-2 text-gray-400" />
              <p>Скоро здесь появятся похожие объявления</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
