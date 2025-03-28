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

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    // Implement logout logic here
    setShowLogoutDialog(false);
    // Redirect to login page
    // router.push('/login');
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account...");
    // Implement account deletion logic here
    setShowDeleteDialog(false);
    // Redirect to login page
    // router.push('/login');
  };

  const navigateToPersonalData = () => {
    navigate("/settings/personal-data");
  };

  return (
    <div className="min-h-screen pb-20 w-full">
      <div className="container mx-auto w-full">
        <SettingsSection title="Аккаунт">
          <SettingsItem
            icon={<User size={20} />}
            label="Личная информация"
            onClick={navigateToPersonalData}
          />
        </SettingsSection>
        {/* Notifications Section */}
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

        {/* Privacy Section */}
        <SettingsSection title="Приватность">
          <SettingsItem
            icon={<Lock size={20} />}
            label="Безопасность"
            onClick={() => console.log("Navigate to security")}
            divider={false}
          />
        </SettingsSection>

        {/* Appearance Section */}
        <SettingsSection title="Внешний вид">
          <SettingsItem
            icon={<Moon size={20} />}
            label="Тема"
            showChevron={false}
            rightElement={<ThemeToggle />}
            divider={false}
          />
        </SettingsSection>

        {/* Support Section */}
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

        {/* Account Actions */}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 px-4 rounded-xl flex items-center justify-center bg-red-400 text-white font-medium"
          >
            <LogOut size={18} className="mr-2" />
            Выйти из аккаунта
          </button>

          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full py-3 px-4 rounded-xl flex items-center justify-center bg-red-400 text-white font-medium"
          >
            <Trash2 size={18} className="mr-2" />
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  );
}
