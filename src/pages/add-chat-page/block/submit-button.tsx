"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SubmitButtonProps {
  isPending: boolean;
}

export function SubmitButton({ isPending }: SubmitButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isPending}
      className="w-full py-3.5 px-6 rounded-xl text-white font-medium flex items-center justify-center"
      style={{
        backgroundColor: "var(--color-main, #627ffe)",
        boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
      }}
    >
      {isPending ? (
        <>
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
          Проверка...
        </>
      ) : (
        <>
          <Search size={18} className="mr-2" />
          Добавить чат
        </>
      )}
    </motion.button>
  );
}
