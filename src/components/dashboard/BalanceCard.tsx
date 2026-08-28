"use client";

import { useState } from "react";
import { useWalletStore } from "@/store/walletStore";
import { formatMoney } from "@/lib/money";

export function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const balanceCents = useWalletStore((s) => s.balanceCents);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#203020] p-7 text-white shadow-[0_12px_35px_rgba(32,48,32,0.12)] sm:p-8">
      <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border-[34px] border-[#9fce50]/20" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#bec9b9]">Total balance</p>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-xs text-[#bec9b9] underline underline-offset-4"
          >
            {showBalance ? "Hide" : "Show"}
          </button>
        </div>
        <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
          {showBalance ? formatMoney(balanceCents) : "••••••••"}
        </p>
        <p className="mt-2 text-sm text-[#afc0ab]">Available to spend</p>
        <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-xs text-[#afc0ab]">•••• 4829</span>
          <span className="rounded-full bg-[#c8f169] px-3 py-1 text-xs font-bold text-[#30431f]">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}
