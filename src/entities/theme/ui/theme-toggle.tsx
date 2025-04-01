import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeStore } from "../model/use-theme-store";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    );
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={18} />;
      case "dark":
        return <Moon size={18} />;
      case "system":
        return <Monitor size={18} />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Светлая";
      case "dark":
        return "Темная";
      case "system":
        return "Системная";
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`flex items-center gap-2 py-1.5 px-3 rounded-lg ${className}`}
      style={{
        backgroundColor: "var(--color-main-light, #eff3fc)",
        color: "var(--color-main, #627ffe)",
      }}
    >
      {getIcon()}
      <span className="text-sm font-medium">{getLabel()}</span>
    </motion.button>
  );
}
