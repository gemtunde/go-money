"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/shared/forms/FormField";
import { AuthSubmitButton } from "@/shared/forms/AuthSubmitButton";
import { signupSchema, type SignupErrors } from "@/schemas/auth/signupSchema";

export function SignupForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<SignupErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = signupSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    setErrors({});
    router.push("/login");
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start managing your money in minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/"
            className="font-medium text-[#729c37] hover:text-[#4f7624]"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
        <FormField
          id="name"
          name="name"
          label="Full name"
          type="text"
          placeholder="Alex Morgan"
          error={errors.name}
        />
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="alex@example.com"
          error={errors.email}
        />
        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password}
        />
        <FormField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword}
        />
        <AuthSubmitButton>Create account</AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
