"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Handshake, AlertCircle, MessageCircle } from "lucide-react";
import { useChats } from "@/entities/chat/hooks/queries/use-get-chats.queries";
import { useCreateDeal } from "@/entities/deals/hooks/use-create-deal";
import { useToast } from "@/shared/layouts/toast-provider";
import CustomDropdown from "@/shared/ui/custom-dropdown";

interface CreateDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcementId: number;
  announcementTitle: string;
  announcementPrice?: number;
}

export const CreateDealModal = ({
  isOpen,
  onClose,
  announcementId,
  announcementTitle,
  announcementPrice = 0,
}: CreateDealModalProps) => {
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<string>(
    announcementPrice.toString()
  );

  const { data: chats = [], isLoading: isChatsLoading } = useChats();
  const { mutate: createDeal, isPending: isCreating } = useCreateDeal();
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSelectedChatId("");
      setCustomPrice(announcementPrice.toString());
    }
  }, [isOpen, announcementPrice]);

  const handleCreateDeal = () => {
    if (!selectedChatId) {
      addToast({
        title: "Ошибка",
        description: "Выберите чат для размещения",
        type: "error",
      });
      return;
    }

    if (
      !customPrice ||
      isNaN(Number(customPrice)) ||
      Number(customPrice) <= 0
    ) {
      addToast({
        title: "Ошибка",
        description: "Укажите корректную сумму сделки",
        type: "error",
      });
      return;
    }

    createDeal(
      {
        announcementId,
        chatId: selectedChatId,
        price: Number(customPrice),
      },
      {
        onSuccess: () => {
          addToast({
            title: "Сделка создана!",
            description: "Сделка успешно создана и отправлена владельцу чата",
            type: "success",
          });
          onClose();
        },
        onError: (error: any) => {
          addToast({
            title: "Ошибка создания сделки",
            description: error.response?.data?.message || "Попробуйте позже",
            type: "error",
          });
        },
      }
    );
  };

  const chatOptions = chats.map((chat) => chat.name);
  const selectedChatName =
    chats.find((chat) => chat.chatId === selectedChatId)?.name || "";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50 max-w-md mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Handshake size={16} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Создать сделку
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Announcement Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Объявление:
                </p>
                <p className="text-sm text-gray-600">{announcementTitle}</p>
              </div>

              {/* Chat Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Выберите чат для размещения
                </label>
                {isChatsLoading ? (
                  <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                ) : chats.length > 0 ? (
                  <CustomDropdown
                    options={chatOptions}
                    value={selectedChatName}
                    onChange={(chatName) => {
                      const chat = chats.find((c) => c.name === chatName);
                      if (chat) setSelectedChatId(chat.chatId);
                    }}
                    placeholder="Выберите чат"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle size={16} className="text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-800">
                      У вас пока нет доступных чатов. Добавьте бота в чат
                      сначала.
                    </p>
                  </div>
                )}
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сумма сделки (TON)
                </label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Info */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-start">
                  <MessageCircle
                    size={16}
                    className="text-blue-600 mr-2 mt-0.5"
                  />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Как это работает:</p>
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Сделка будет отправлена владельцу выбранного чата
                      </li>
                      <li>• После одобрения объявление будет размещено</li>
                      <li>• Комиссия платформы: 10%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateDeal}
                disabled={isCreating || !selectedChatId || !customPrice}
                className="flex-1 py-2.5 px-4 rounded-lg text-white font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--color-main, #627ffe)" }}
              >
                {isCreating ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Handshake size={16} className="mr-2" />
                    Создать сделку
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
