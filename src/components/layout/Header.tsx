"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { useNavStore } from "@/store/NavStore";

export function Header() {
  const openSidebar = useNavStore((s) => s.openSidebar);

  return (
    <header className="flex h-20 items-center justify-between border-b border-[#e2e7df] bg-[#fbfcfa] px-5 sm:px-10">
      <button
        onClick={openSidebar}
        className="lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="hidden text-sm text-[#7a867c] sm:block">
        Thursday, August 29, 2024
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button aria-label="Notifications" className="relative text-[#68736b]">
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#f18b63]" />
        </button>
        <div className="hidden h-6 w-px bg-[#e2e7df] sm:block" />
        <button className="flex items-center gap-2 text-sm font-medium">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f3c7ab] text-xs font-semibold">
            TE
          </span>
          <span className="hidden sm:block">Tunde Elesho</span>
          <ChevronDown size={15} className="text-[#8b958e]" />
        </button>
      </div>
    </header>
  );
}
