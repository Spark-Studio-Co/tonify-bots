import { create } from "zustand";

interface OnboardingState {
  currentState: number;
  setCurrentState: (state: number) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentState: 1,
  setCurrentState: (state) => set({ currentState: state }),
}));
