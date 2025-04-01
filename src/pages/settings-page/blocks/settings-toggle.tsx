import { useState } from "react";
import { motion } from "framer-motion";

interface SettingsToggleProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
}

export default function SettingsToggle({
  isOn,
  onToggle,
  activeColor = "var(--color-main, #627ffe)",
  inactiveColor = "#e5e7eb",
  className = "",
}: SettingsToggleProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      className={`relative w-11 h-6 rounded-full cursor-pointer ${className}`}
      style={{
        backgroundColor: isOn ? activeColor : inactiveColor,
        justifyContent: isOn ? "flex-end" : "flex-start",
        transition: "background-color 0.2s",
      }}
      onClick={() => onToggle(!isOn)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 w-4 h-4 rounded-full bg-white"
        initial={false}
        animate={{
          x: isOn ? 22 : 4,
          scale: isPressed ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.div>
  );
}
