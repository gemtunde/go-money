"use client";

import { useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/shared/forms/FormField";
import { AuthSubmitButton } from "@/shared/forms/AuthSubmitButton";
import {
  changePasswordSchema,
  type ChangePasswordErrors,
} from "@/schemas/auth/changePasswordSchema";

export function ChangePasswordForm() {
  const [errors, setErrors] = useState<ChangePasswordErrors>({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = changePasswordSchema.safeParse({
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      confirmNewPassword: formData.get("confirmNewPassword"),
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        currentPassword: fieldErrors.currentPassword?.[0],
        newPassword: fieldErrors.newPassword?.[0],
        confirmNewPassword: fieldErrors.confirmNewPassword?.[0],
      });
      setSuccess(false);
      return;
    }

    setErrors({});
    setSuccess(true);
    event.currentTarget.reset();
  }

  return (
    <Card className="mt-6 rounded-2xl border-[#e2e7df] shadow-sm">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <FormField
            id="currentPassword"
            name="currentPassword"
            label="Current password"
            type="password"
            error={errors.currentPassword}
          />
          <FormField
            id="newPassword"
            name="newPassword"
            label="New password"
            type="password"
            error={errors.newPassword}
          />
          <FormField
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confirm new password"
            type="password"
            error={errors.confirmNewPassword}
          />

          {success && (
            <p className="text-sm font-medium text-[#4f8a3e]">
              Password updated successfully.
            </p>
          )}

          <AuthSubmitButton>Update password</AuthSubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
