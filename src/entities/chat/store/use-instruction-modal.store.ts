import { create } from "zustand";

interface InstructionState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useInstructionModalStore = create<InstructionState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
