"use client";

import { Deal } from "@/shared/types/types";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, DollarSign, Eye } from "lucide-react";

interface DealItemProps {
  deal: Deal;
  onSelect: (dealId: number) => void;
}

export function DealItem({ deal, onSelect }: DealItemProps) {
  const formattedDate = new Date(deal.createdAt).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(deal.price);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Calendar size={16} className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{formattedDate}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {deal.ad?.title || `Объявление #${deal.adId}`}
        </div>
        <div className="text-xs text-gray-500">ID: {deal.adId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <MessageCircle size={16} className="text-gray-400 mr-2" />
          <div>
            <div className="text-sm text-gray-900">
              {deal.chat?.name || `Чат #${deal.chatId}`}
            </div>
            <div className="text-xs text-gray-500 truncate max-w-[200px]">
              {deal.chatId}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <DollarSign size={16} className="text-gray-400 mr-1" />
          <span className="text-sm font-medium text-gray-900">
            {formattedPrice}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Комиссия: {deal.feePercent}%
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            deal.isCompleted
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {deal.isCompleted ? "Завершена" : "В процессе"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(deal.id)}
          className="text-main hover:text-main-dark flex items-center ml-auto"
        >
          <Eye size={16} className="mr-1" />
          Детали
        </motion.button>
      </td>
    </tr>
  );
}
