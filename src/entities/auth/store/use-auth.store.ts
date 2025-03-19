import reactQueryClient from "@/shared/api/query-client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  requestId: string | null;
  role: string | null;
  userId: string | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
  saveRequestId: (requestId: string) => void;
  removeRequestId: () => void;
  loadToken: () => Promise<string | null>;
  saveUserId: (userId: string) => void;
  removeUserId: () => void;
  saveRole: (role: string) => void;
  removeRole: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      requestId: null,
      role: null,
      userId: null,

      saveToken: (token: string) => set({ token }),

      removeToken: () => {
        set({ token: null });
        localStorage.removeItem("auth-storage");
        reactQueryClient.resetQueries();
        reactQueryClient.clear();
      },

      saveRequestId: (requestId: string) => set({ requestId }),

      removeRequestId: () => set({ requestId: null }),

      loadToken: async () => {
        return get().token;
      },

      saveUserId: (userId: string) => set({ userId }),

      removeUserId: () => set({ userId: null }),

      saveRole: (role: string) => {
        set({ role });
      },

      removeRole: () => {
        set({ role: null });

        setTimeout(() => {
          localStorage.removeItem("role");
          localStorage.setItem(
            "auth-storage",
            JSON.stringify({ state: get(), version: 0 })
          );
        }, 0);

        reactQueryClient.resetQueries();
        reactQueryClient.clear();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        requestId: state.requestId,
        role: state.role,
        userId: state.userId,
      }),
    }
  )
);

export const useAuthData = () => useAuthStore();
