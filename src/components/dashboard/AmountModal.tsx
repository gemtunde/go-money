"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormField } from "@/shared/forms/FormField";
import { AuthSubmitButton } from "@/shared/forms/AuthSubmitButton";
import {
  paymentAmountSchema,
  type PaymentAmountErrors,
} from "@/schemas/payment/paymentAmountSchema";

interface AmountModalProps {
  triggerContent: ReactNode;
  triggerClassName: string;
  title: string;
  submitLabel: string;
  fieldId: string;
  onSubmitAmount: (
    amountKobo: number,
  ) => void | { success: boolean; message?: string };
}

export function AmountModal({
  triggerContent,
  triggerClassName,
  title,
  submitLabel,
  fieldId,
  onSubmitAmount,
}: AmountModalProps) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<PaymentAmountErrors>({});

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setErrors({});
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = paymentAmountSchema.safeParse({
      amount: formData.get("amount"),
    });

    if (!result.success) {
      setErrors({ amount: result.error.flatten().fieldErrors.amount?.[0] });
      return;
    }

    const amountKobo = Math.round(result.data.amount * 100);
    const outcome = onSubmitAmount(amountKobo);

    if (outcome && !outcome.success) {
      setErrors({ amount: outcome.message });
      return;
    }

    setErrors({});
    event.currentTarget.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className={triggerClassName}>
        {triggerContent}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <FormField
            id={fieldId}
            name="amount"
            label="Amount (NGN)"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            error={errors.amount}
          />
          <DialogFooter>
            <AuthSubmitButton>{submitLabel}</AuthSubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
