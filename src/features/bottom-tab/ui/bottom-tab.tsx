"use client";

import { motion } from "framer-motion";
import { Home, Plus, Search, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNavStore } from "../model/use-navigation-store";

export default function BottomTab() {
  const { activeTab, setActiveTab } = useNavStore();
  const navigate = useNavigate();

  const tabs = [
    { id: "home", icon: Home, label: "Главная" },
    { id: "search", icon: Search, label: "Поиск" },
    { id: "profile", icon: User, label: "Профиль" },
    { id: "settings", icon: Settings, label: "Настройки" },
  ];

  const handleNavigate = (id: string) => {
    setActiveTab(id);
    navigate(`/${id}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      {/* FAB Button */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-7 z-10">
        <motion.button
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-main, #627ffe)",
            boxShadow: "0 2px 10px rgba(98, 127, 254, 0.3)",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 4px 15px rgba(98, 127, 254, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={24} color="white" />
        </motion.button>
      </div>
      <div
        className="bg-white h-16 relative"
        style={{
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Center cutout for FAB */}
        <div
          className="absolute -top-7 left-1/2 w-16 h-16 -translate-x-1/2"
          style={{
            background: "white",
            borderRadius: "50%",
            boxShadow: "inset 0 4px 10px -2px rgba(0, 0, 0, 0.05)",
          }}
        />

        {/* Navigation Items */}
        <div className="relative h-full max-w-md mx-auto px-6 flex justify-between items-center">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            // Add extra margin for center gap
            const isLeftOfCenter = index === 1;
            const isRightOfCenter = index === 2;
            const marginClass = isLeftOfCenter
              ? "mr-16"
              : isRightOfCenter
              ? "ml-16"
              : "";

            return (
              <motion.button
                key={tab.id}
                onClick={() => handleNavigate(tab.id)}
                className={`flex flex-col items-center justify-center ${marginClass}`}
                whileTap={{ scale: 0.9 }}
              >
                <Icon
                  size={24}
                  strokeWidth={1.5}
                  style={{
                    color: isActive
                      ? "var(--color-main, #627ffe)"
                      : "var(--color-dark, #121826)",
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
