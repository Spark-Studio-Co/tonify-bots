import { create } from "zustand"

interface BalanceState {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useModalBalanceStore = create<BalanceState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))
