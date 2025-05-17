"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  FileText,
  Wallet,
  HelpCircle,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMenuStore } from "../model/use-menu-store";
import WebApp from "@twa-dev/sdk";

export function BurgerMenu() {
  const { isOpen, closeMenu } = useMenuStore();
  const menuRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeMenu]);

  const handleNavigate = (path: string) => {
    navigate(path);
    closeMenu();
  };

  const handleSupportChat = () => {
    WebApp.openTelegramLink("https://t.me/support_username");
    closeMenu();
  };

  const handleProjectChannel = () => {
    WebApp.openTelegramLink("https://t.me/project_channel");
    closeMenu();
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("accessToken");
      navigate("/");
      closeMenu();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={closeMenu}
          />

          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-xl flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--color-main, #627ffe)" }}
              >
                Menu
              </h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} style={{ color: "var(--color-dark, #121826)" }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-4 py-2">
                <button
                  onClick={() => handleNavigate("/wallet")}
                  className="w-full flex items-center py-3 px-2 rounded-lg hover:bg-gray-100"
                >
                  <Wallet size={20} className="mr-3 text-gray-500" />
                  <span className="text-gray-900">Кошельке</span>
                </button>
                <button
                  onClick={() => handleNavigate("/drafts")}
                  className="w-full flex items-center py-3 px-2 rounded-lg hover:bg-gray-100"
                >
                  <FileText size={20} className="mr-3 text-gray-500" />
                  <span className="text-gray-900">Черновики</span>
                </button>
                <button
                  onClick={() => handleNavigate("/deals")}
                  className="w-full flex items-center py-3 px-2 rounded-lg hover:bg-gray-100"
                >
                  <FileText size={20} className="mr-3 text-gray-500" />
                  <span className="text-gray-900">Сделки</span>
                </button>
              </div>
              <div className="border-t border-gray-100 my-2"></div>
              <div className="px-4 py-2">
                <button
                  onClick={handleSupportChat}
                  className="w-full flex items-center py-3 px-2 rounded-lg hover:bg-gray-100"
                >
                  <MessageCircle size={20} className="mr-3 text-gray-500" />
                  <span className="text-gray-900">Support</span>
                </button>

                <button
                  onClick={handleProjectChannel}
                  className="w-full flex items-center py-3 px-2 rounded-lg hover:bg-gray-100"
                >
                  <HelpCircle size={20} className="mr-3 text-gray-500" />
                  <span className="text-gray-900">Project Channel</span>
                </button>
              </div>
            </div>
            <div className="border-t border-gray-100 p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center py-3 px-2 rounded-lg hover:bg-gray-100 text-red-500"
              >
                <LogOut size={20} className="mr-3" />
                <span>Выйти</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
