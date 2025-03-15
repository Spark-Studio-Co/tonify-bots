"use client";

import { motion } from "framer-motion";
import TONCounter from "./ton-counter";

interface TONEarningsGridProps {
  values: number[];
  title: string;
  className?: string;
}

export default function TONEarningsGrid({
  values,
  title,
  className = "",
}: TONEarningsGridProps) {
  return (
    <div className={className}>
      <h2
        className="text-lg font-semibold mb-3"
        style={{ color: "var(--color-dark, #121826)" }}
      >
        {title}
      </h2>

      <div className="grid grid-cols-4 gap-3">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(98, 127, 254, 0.15)",
              backgroundColor: "white",
            }}
            className="aspect-square rounded-xl flex items-center justify-center relative overflow-hidden cursor-pointer"
            style={{
              backgroundColor: "var(--color-main-light, #eff3fc)",
            }}
          >
            {/* Animated background */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 2,
                delay: index * 0.2 + 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 5,
              }}
              className="absolute inset-0 rounded-xl"
              style={{ backgroundColor: "var(--color-main, #627ffe)" }}
            />

            {/* Animated TON counter */}
            <TONCounter value={value} duration={1.5} delay={index * 0.3} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
