import { TUser } from "@/utils/types";
import { create } from "zustand";

interface TStore {
  // Auth States
  user: TUser | null;
  setUser: (data: TUser) => void;

  // UI States
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
  showSadFace: boolean;
  setShowSadFace: (show: boolean) => void;

  // Progress Tracker
  incorrectAnswers: number;
  correctAnswers: number;
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

  incorrectAnswers: 0,
  correctAnswers: 0,
}));
