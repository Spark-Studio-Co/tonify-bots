import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IProfileStore {
  isChatOwner: boolean;
  isPromoter: boolean;
  setIsChatOwner: () => void;
  setIsPromoter: () => void;
}

export const useProfileStore = create<IProfileStore>()(
  persist(
    (set) => ({
      isChatOwner: false,
      isPromoter: true,
      setIsChatOwner: () => set({ isChatOwner: true, isPromoter: false }), // 🔄 Toggle logic
      setIsPromoter: () => set({ isPromoter: true, isChatOwner: false }), // 🔄 Toggle logic
    }),
    {
      name: "profile-store", // 🔹 Key used in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isChatOwner: state.isChatOwner,
        isPromoter: state.isPromoter,
      }), // 🔄 Persist both
    }
  )
);
