import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface SettingsItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  rightElement?: ReactNode;
  showChevron?: boolean;
  className?: string;
  divider?: boolean;
}

export default function SettingsItem({
  icon,
  label,
  onClick,
  rightElement,
  showChevron = true,
  className = "",
  divider = true,
}: SettingsItemProps) {
  return (
    <motion.div
      whileTap={onClick ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : {}}
      className={`${divider ? "border-b border-gray-100" : ""} ${className}`}
    >
      <div
        className={`flex items-center justify-between py-3.5 px-4 ${
          onClick ? "cursor-pointer" : ""
        }`}
        onClick={onClick}
      >
        <div className="flex items-center">
          <div className="mr-3 text-gray-500">{icon}</div>
          <span style={{ color: "var(--color-dark, #121826)" }}>{label}</span>
        </div>

        <div className="flex items-center">
          {rightElement}
          {showChevron && onClick && (
            <ChevronRight size={18} className="text-gray-400 ml-1" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
