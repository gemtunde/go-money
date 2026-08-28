"use client";

import { ArrowDownLeft } from "lucide-react";
import { AmountModal } from "./AmountModal";
import { useWalletStore } from "@/store/walletStore";

export function WithdrawModal() {
  const withdraw = useWalletStore((s) => s.withdraw);

  return (
    <AmountModal
      title="Withdraw funds"
      submitLabel="Withdraw"
      fieldId="withdraw-amount"
      onSubmitAmount={withdraw}
      triggerClassName="flex items-center gap-2 rounded-xl border border-[#dfe6db] bg-white px-4 py-2.5 text-sm font-semibold text-[#203020] shadow-sm transition hover:bg-[#f0f3ed]"
      triggerContent={
        <>
          <ArrowDownLeft size={17} /> Withdraw
        </>
      }
    />
  );
}
