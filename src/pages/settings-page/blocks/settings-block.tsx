"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Moon,
  HelpCircle,
  Info,
  LogOut,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SettingsSection from "./settings-section";
import SettingsItem from "./settings-item";
import SettingsToggle from "./settings-toggle";
import ThemeToggle from "@/entities/theme/ui/theme-toggle";

export default function SettingsBlock() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    newMessages: true,
    newOrders: true,
    promotions: true,
    updates: true,
  });

  return (
    <div className="min-h-screen pb-20 w-full">
      <div className="container mx-auto w-full">
        <SettingsSection title="Уведомления">
          <SettingsItem
            icon={<Bell size={20} />}
            label="Уведомления"
            showChevron={false}
            rightElement={
              <SettingsToggle
                isOn={notifications.promotions}
                onToggle={(value) =>
                  setNotifications({ ...notifications, promotions: value })
                }
                activeColor="var(--color-secondary, #7bc394)"
              />
            }
            divider={false}
          />
        </SettingsSection>
        <SettingsSection title="Внешний вид">
          <SettingsItem
            icon={<Moon size={20} />}
            label="Тема"
            showChevron={false}
            rightElement={<ThemeToggle />}
            divider={false}
          />
        </SettingsSection>
        <SettingsSection title="Поддержка">
          <SettingsItem
            icon={<HelpCircle size={20} />}
            label="Помощь"
            onClick={() => console.log("Navigate to help")}
          />
          <SettingsItem
            icon={<Info size={20} />}
            label="О приложении"
            onClick={() => console.log("Navigate to about")}
            divider={false}
          />
        </SettingsSection>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 px-4 rounded-xl flex items-center justify-center bg-red-400 text-white font-medium"
          >
            <LogOut size={18} className="mr-2" />
            Выйти из аккаунта
          </button>
          <button className="w-full py-3 px-4 rounded-xl flex items-center justify-center bg-red-400 text-white font-medium">
            <Trash2 size={18} className="mr-2" />
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  );
}
