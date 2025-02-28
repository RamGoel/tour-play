import { TUser } from "@/utils/types";
import { create } from "zustand";

interface TStore {
  user: TUser | null;
  setUser: (data: TUser) => void;
}
export const useStore = create<TStore>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
}));
