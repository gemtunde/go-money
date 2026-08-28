"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  ReceiptText,
  Send,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useNavStore } from "@/store/NavStore";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  {
    label: "Change Password",
    icon: ReceiptText,
    href: "/dashboard/change-password",
  },
  { label: "Payments", icon: Send, href: null },
  { label: "Activity", icon: ReceiptText, href: null },
  { label: "People", icon: Users, href: null },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useNavStore((s) => s.sidebarOpen);
  const closeSidebar = useNavStore((s) => s.closeSidebar);

  return (
    <>
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-[#e2e7df] bg-[#fbfcfa] px-6 py-7 transition-transform lg:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#c8f169] text-lg font-bold">
              g
            </span>
            <span className="text-xl font-semibold tracking-[-0.04em]">
              go<span className="text-[#95b946]">.</span>money
            </span>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-14 flex items-center gap-3 border-b border-[#e2e7df] pb-7">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#f3c7ab] text-sm font-semibold">
            TE
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Tunde Elesho</p>
            <p className="text-xs text-[#7a867c]">Personal account</p>
          </div>
          <ChevronDown size={16} className="text-[#7a867c]" />
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map(({ label, icon: Icon, href }) => {
            const active = href !== null && pathname === href;

            if (href === null) {
              return (
                <button
                  key={label}
                  disabled
                  title="Coming soon"
                  className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#b5bdb2]"
                >
                  <Icon size={18} strokeWidth={1.8} />
                  {label}
                </button>
              );
            }

            return (
              <Link
                key={label}
                href={href}
                onClick={closeSidebar}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#edf4df] text-[#344a20]"
                    : "text-[#68736b] hover:bg-[#f0f3ed]"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-1">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#68736b] hover:bg-[#f0f3ed]">
            <Settings size={18} strokeWidth={1.8} />
            Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#68736b] hover:bg-[#f0f3ed]">
            <CircleHelp size={18} strokeWidth={1.8} />
            Help center
          </button>
          <div className="mt-5 flex items-center gap-2 border-t border-[#e2e7df] pt-5 text-xs text-[#8b958e]">
            <Sparkles size={15} className="text-[#a9cb55]" />
            Your money, your way
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={closeSidebar}
          className="fixed inset-0 z-10 bg-black/20 lg:hidden"
        />
      )}
    </>
  );
}
