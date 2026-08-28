import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
}));
