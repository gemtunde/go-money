"use client";

import { create } from "zustand";

interface NavState {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const useNavStore = create<NavState>((set) => ({
  sidebarOpen: false,
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  activeNav: "Overview",
  setActiveNav: (activeNav) => set({ activeNav, sidebarOpen: false }),
}));
