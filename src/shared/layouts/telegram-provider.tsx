import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import type { ITelegramUser, IWebApp } from "../types/types";
import { useExpandView } from "../hooks/useExpandView";
import { apiClient } from "@/shared/api/apiClient";
import { useAuthData } from "@/entities/auth/store/use-auth.store";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const navigate = useNavigate();
  const { saveToken, saveUserId, saveRole } = useAuthData();

  useExpandView();

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;

    if (!app) {
      console.warn("❌ Telegram WebApp not detected.");
      return;
    }

    if (!app.initDataUnsafe?.user) {
      const hasRedirected = sessionStorage.getItem("telegramRedirected");

      if (!hasRedirected) {
        sessionStorage.setItem("telegramRedirected", "true");
        console.warn("⚠️ No Telegram user data found! Redirecting...");
      }
      return;
    }

    console.log("✅ Telegram WebApp detected:", app);
    app.expand();
    app.ready();
    setWebApp(app);

    console.log("🗑️ Removing old token...");
    localStorage.removeItem("token");

    console.log("ℹ️ Handling user authentication...");

    const authenticateUserRequest = async () => {
      try {
        const telegramUser = app.initDataUnsafe?.user;
        const telegramUsername =
          telegramUser?.username || String(telegramUser?.id);

        console.log(
          "🔐 Attempting login with Telegram username:",
          telegramUsername
        );

        const { data } = await apiClient.post("/auth/login", {
          telegramUsername,
        });

        console.log("✅ Auth successful, saving token:", data.accessToken);

        saveToken(data.accessToken);
        saveUserId(data.user.userId);
        saveRole(data.user.role);

        navigate("/home");
      } catch (error) {
        console.error("❌ Error in authentication:", error);
      }
    };

    authenticateUserRequest();
  }, []);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  console.log("📌 TelegramProvider rendering with value:", value);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  return useContext(TelegramContext);
};
