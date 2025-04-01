import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ITelegramUser, IWebApp } from "../types/types";
// import { useRegisterUser } from "@/entities/auth/hooks/mutations/use-register.mutation";
// import { useAuthData } from "@/entities/auth/store/use-auth.store";
import { useExpandView } from "../hooks/useExpandView";

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
  useExpandView();

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;

    if (!app) {
      console.warn("❌ Telegram WebApp not detected.");
      return;
    }

    // Check if the redirect has already happened in this session
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

        if (!telegramUser) {
          console.warn("⚠️ No Telegram user data found!");
          return;
        }

        // const userData = {
        //   telegramUsername: telegramUser.username || telegramUser.id,
        // };

        console.log("🔄 Authenticating user...");
        // const response = await register(userData as any);
        // saveToken(response.accessToken as any);
        // test

        // console.log("✅ Token updated and saved:", response.token);
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
