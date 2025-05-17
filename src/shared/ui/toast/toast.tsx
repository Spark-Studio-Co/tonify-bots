"use client";

import type React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";
import { ToastProps, ToastType } from "@/shared/layouts/toast-provider";

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />,
};

const toastStyles: Record<
  ToastType,
  { bg: string; iconColor: string; borderColor: string }
> = {
  success: {
    bg: "bg-white",
    iconColor: "var(--color-secondary, #7bc394)",
    borderColor: "var(--color-secondary, #7bc394)",
  },
  error: {
    bg: "bg-white",
    iconColor: "#f87171",
    borderColor: "#f87171",
  },
  info: {
    bg: "bg-white",
    iconColor: "var(--color-main, #627ffe)",
    borderColor: "var(--color-main, #627ffe)",
  },
  warning: {
    bg: "bg-white",
    iconColor: "#f59e0b",
    borderColor: "#f59e0b",
  },
};

interface ToastComponentProps extends ToastProps {
  onClose: () => void;
}

export function Toast({
  id,
  title,
  description,
  type,
  onClose,
}: ToastComponentProps) {
  const { bg, iconColor, borderColor } = toastStyles[type];

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`${bg} w-full rounded-xl shadow-sm overflow-hidden flex items-start p-4 border-l-4`}
      style={{ borderLeftColor: borderColor }}
    >
      <div className="flex-shrink-0 mr-3" style={{ color: iconColor }}>
        {toastIcons[type]}
      </div>
      <div className="flex-1 mr-2">
        <h4 className="font-medium text-gray-900">{title}</h4>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 rounded-full p-1 hover:bg-gray-100 transition-colors"
      >
        <X size={16} className="text-gray-500" />
      </button>
    </motion.div>
  );
}
