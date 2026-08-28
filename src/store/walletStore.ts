"use client";

import { create } from "zustand";

interface WalletState {
  balanceCents: number;

  makePayment: (amountCents: number) => { success: boolean; message?: string };
  withdraw: (amountCents: number) => { success: boolean; message?: string };
}

const STARTING_BALANCE_CENTS = 1_284_062;

export const useWalletStore = create<WalletState>((set, get) => ({
  balanceCents: STARTING_BALANCE_CENTS,

  makePayment: (amountCents) => {
    const { balanceCents } = get();
    if (amountCents > balanceCents) {
      return {
        success: false,
        message: "Insufficient balance for this payment.",
      };
    }
    set({ balanceCents: balanceCents + amountCents });
    return { success: true };
  },

  withdraw: (amountCents) => {
    const { balanceCents } = get();
    if (amountCents > balanceCents) {
      return {
        success: false,
        message: "Insufficient balance to withdraw that amount.",
      };
    }
    set({ balanceCents: balanceCents - amountCents });
    return { success: true };
  },
}));
