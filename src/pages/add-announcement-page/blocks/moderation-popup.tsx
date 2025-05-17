"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

interface ModerationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  autoCloseDelay?: number;
}

export const ModerationPopup = ({
  isOpen,
  onClose,
  autoCloseDelay = 5000,
}: ModerationPopupProps) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoCloseDelay]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="flex flex-col items-center text-center pt-2 pb-6">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Спасибо!
                </h3>
                <p className="text-gray-600">
                  Ваше объявление было отправлено на модерацию
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: "var(--color-main, #627ffe)" }}
              >
                Понятно
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
