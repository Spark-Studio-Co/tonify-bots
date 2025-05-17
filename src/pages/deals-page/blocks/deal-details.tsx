"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  MessageCircle,
  User,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useGetDeal } from "@/entities/deals/hooks/use-get-deal";
import { useCompleteDeal } from "@/entities/deals/hooks/use-complete-deal";
import LoadingIndicator from "@/shared/ui/loading-indicator/loading-indicator";
import { useToast } from "@/shared/layouts/toast-provider";

interface DealDetailsProps {
  dealId: number;
  onClose: () => void;
  onStatusChange: () => void;
}

export function DealDetails({
  dealId,
  onClose,
  onStatusChange,
}: DealDetailsProps) {
  const { data: deal, isLoading, isError } = useGetDeal(dealId);
  const { addToast } = useToast();
  const { mutate: completeDeal, isPending: isCompleting } = useCompleteDeal();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Блокировка прокрутки при открытом модальном окне
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleCompleteDeal = () => {
    setShowConfirmation(true);
  };

  const confirmCompleteDeal = () => {
    if (!deal) return;

    completeDeal(
      { dealId: deal.id },
      {
        onSuccess: () => {
          addToast({
            title: "Успешно!",
            description: "Сделка успешно завершена",
            type: "success",
          });
          onStatusChange();
          onClose();
        },
        onError: (error) => {
          addToast({
            title: "Ошибка",
            description: error.message || "Не удалось завершить сделку",
            type: "error",
          });
          setShowConfirmation(false);
        },
      }
    );
  };

  const cancelCompleteDeal = () => {
    setShowConfirmation(false);
  };

  const formattedDate = deal
    ? new Date(deal.createdAt).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const formattedPrice = deal
    ? new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
      }).format(deal.price)
    : "";

  const feeAmount = deal ? (deal.price * deal.feePercent) / 100 : 0;
  const formattedFee = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(feeAmount);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading ? (
            <div className="flex justify-center items-center p-10">
              <LoadingIndicator size="large" />
            </div>
          ) : isError ? (
            <div className="p-6 text-center">
              <AlertTriangle size={40} className="mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ошибка загрузки
              </h3>
              <p className="text-gray-500 mb-4">
                Не удалось загрузить данные сделки
              </p>
              <button
                onClick={onClose}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800"
              >
                Закрыть
              </button>
            </div>
          ) : deal ? (
            <>
              {/* Заголовок */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Детали сделки #{deal.id}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Содержимое */}
              <div className="p-6">
                {/* Основная информация */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Дата создания
                      </h3>
                      <div className="flex items-center">
                        <Calendar size={18} className="text-gray-400 mr-2" />
                        <span className="text-gray-900">{formattedDate}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Объявление
                      </h3>
                      <div className="text-gray-900">
                        {deal.ad?.title || `Объявление #${deal.adId}`}
                        <div className="text-sm text-gray-500">
                          ID: {deal.adId}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Чат
                      </h3>
                      <div className="flex items-center">
                        <MessageCircle
                          size={18}
                          className="text-gray-400 mr-2"
                        />
                        <div>
                          <div className="text-gray-900">
                            {deal.chat?.name || `Чат #${deal.chatId}`}
                          </div>
                          <div className="text-sm text-gray-500 break-all">
                            {deal.chatId}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Рекламодатель
                      </h3>
                      <div className="flex items-center">
                        <User size={18} className="text-gray-400 mr-2" />
                        <div className="text-gray-900">
                          {deal.advertiser?.name ||
                            `Пользователь #${deal.advertiserId}`}
                          <div className="text-sm text-gray-500">
                            ID: {deal.advertiserId}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Владелец чата
                      </h3>
                      <div className="flex items-center">
                        <User size={18} className="text-gray-400 mr-2" />
                        <div className="text-gray-900">
                          {deal.owner?.name || `Пользователь #${deal.ownerId}`}
                          <div className="text-sm text-gray-500">
                            ID: {deal.ownerId}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Финансовая информация
                      </h3>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">Сумма сделки:</span>
                          <span className="font-medium text-gray-900">
                            {formattedPrice}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">
                            Комиссия ({deal.feePercent}%):
                          </span>
                          <span className="text-gray-900">{formattedFee}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="font-medium text-gray-700">
                            К выплате владельцу:
                          </span>
                          <span className="font-medium text-gray-900">
                            {new Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: "RUB",
                              minimumFractionDigits: 0,
                            }).format(deal.price - feeAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Статус */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          deal.isCompleted ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      ></div>
                      <span className="font-medium text-gray-900">
                        Статус: {deal.isCompleted ? "Завершена" : "В процессе"}
                      </span>
                    </div>
                    {!deal.isCompleted && (
                      <button
                        onClick={handleCompleteDeal}
                        disabled={isCompleting}
                        className="py-2 px-4 bg-main hover:bg-main-dark text-white rounded-lg flex items-center disabled:opacity-50"
                      >
                        {isCompleting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                            Обработка...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} className="mr-2" />
                            Завершить сделку
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Дополнительная информация */}
                <div className="text-sm text-gray-500">
                  <p>
                    ID сделки: {deal.id}
                    <br />
                    Последнее обновление:{" "}
                    {new Date(
                      deal.updatedAt || deal.createdAt
                    ).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Кнопки */}
              <div className="p-6 border-t bg-gray-50 flex justify-end">
                <button
                  onClick={onClose}
                  className="py-2 px-4 border border-gray-300 hover:bg-gray-100 rounded-lg text-gray-700 mr-3"
                >
                  Закрыть
                </button>
              </div>
            </>
          ) : null}

          {/* Подтверждение завершения сделки */}
          {showConfirmation && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Подтверждение
                </h3>
                <p className="text-gray-600 mb-4">
                  Вы уверены, что хотите завершить эту сделку? Это действие
                  нельзя отменить.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelCompleteDeal}
                    className="py-2 px-4 border border-gray-300 hover:bg-gray-100 rounded-lg text-gray-700"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={confirmCompleteDeal}
                    disabled={isCompleting}
                    className="py-2 px-4 bg-main hover:bg-main-dark text-white rounded-lg flex items-center disabled:opacity-50"
                  >
                    {isCompleting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Обработка...
                      </>
                    ) : (
                      "Подтвердить"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
