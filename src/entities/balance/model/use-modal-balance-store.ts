import { create } from "zustand";

interface BalanceState {
  balance: number;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalBalanceStore = create<BalanceState>((set) => ({
  // Initial state
  balance: 153.0,
  isModalOpen: false,

  // Actions
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
