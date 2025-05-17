"use client";

import { motion } from "framer-motion";
import { RefreshCw, Download } from "lucide-react";

interface DealsHeaderProps {
  onRefresh: () => void;
}

export function DealsHeader({ onRefresh }: DealsHeaderProps) {
  const handleExport = () => {
    // Логика экспорта данных в CSV/Excel
    console.log("Exporting deals data...");
  };

  return (
    <div className="flex justify-between items-center py-6">
      <h1 className="text-2xl font-bold text-gray-900">Сделки</h1>
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRefresh}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          aria-label="Обновить"
        >
          <RefreshCw size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExport}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          aria-label="Экспорт"
        >
          <Download size={18} />
        </motion.button>
      </div>
    </div>
  );
}
