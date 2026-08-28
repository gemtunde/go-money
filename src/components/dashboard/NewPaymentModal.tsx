"use client";

import { Plus } from "lucide-react";
import { AmountModal } from "./AmountModal";
import { useWalletStore } from "@/store/walletStore";

export function NewPaymentModal() {
  const makePayment = useWalletStore((s) => s.makePayment);

  return (
    <AmountModal
      title="New payment"
      submitLabel="Pay"
      fieldId="payment-amount"
      onSubmitAmount={makePayment}
      triggerClassName="flex items-center gap-2 rounded-xl bg-[#203020] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#344a20]"
      triggerContent={
        <>
          <Plus size={17} /> New payment
        </>
      }
    />
  );
}
