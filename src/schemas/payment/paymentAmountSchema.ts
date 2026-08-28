import { z } from "zod";

export const paymentAmountSchema = z.object({
  amount: z.coerce
    .number({ error: "Enter a valid amount" })
    .positive("Amount must be greater than 0")
    .max(1_000_000, "Amount is too large")
    .refine(
      (val) => Number(val.toFixed(2)) === val,
      "Enter at most 2 decimal places",
    ),
});

export type PaymentAmountInput = z.infer<typeof paymentAmountSchema>;
export type PaymentAmountErrors = Partial<
  Record<keyof PaymentAmountInput, string>
>;
