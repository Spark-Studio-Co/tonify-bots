import { create } from "zustand"

export interface NavStore {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const useNavStore = create<NavStore>((set) => ({
  activeTab: "home",
  createCallback: undefined,
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
