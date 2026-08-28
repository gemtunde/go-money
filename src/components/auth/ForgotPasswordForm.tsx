"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/shared/forms/FormField";
import { AuthSubmitButton } from "@/shared/forms/AuthSubmitButton";
import {
  forgotPasswordSchema,
  type ForgotPasswordErrors,
} from "@/schemas/auth/forgotPasswordSchema";

export function ForgotPasswordForm() {
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = forgotPasswordSchema.safeParse({
      email: formData.get("email"),
    });

    if (!result.success) {
      setErrors({ email: result.error.flatten().fieldErrors.email?.[0] });
      return;
    }

    setErrors({});
    setSubmittedEmail(result.data.email);
  }

  if (submittedEmail) {
    return (
      <AuthCard
        title="Check your email"
        subtitle={`If an account exists for ${submittedEmail}, we've sent a link to reset your password.`}
        footer={
          <Link
            href="/"
            className="font-medium text-[#729c37] hover:text-[#4f7624]"
          >
            Back to sign in
          </Link>
        }
      >
        <div />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link
          href="/"
          className="font-medium text-[#729c37] hover:text-[#4f7624]"
        >
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="alex@example.com"
          error={errors.email}
        />
        <AuthSubmitButton>Send reset link</AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
