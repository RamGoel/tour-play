import { TUser } from "@/utils/types";
import { create } from "zustand";

interface TStore {
  user: TUser | null;
  setUser: (data: TUser) => void;
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
  showSadFace: boolean;
  setShowSadFace: (show: boolean) => void;
}
export const useStore = create<TStore>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
  showConfetti: false,
  setShowConfetti(show) {
    set({ showConfetti: show });
  },
  showSadFace: false,
  setShowSadFace(show) {
    set({ showSadFace: show });
  },
}));
