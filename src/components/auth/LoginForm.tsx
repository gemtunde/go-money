"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/shared/forms/FormField";
import { AuthSubmitButton } from "@/shared/forms/AuthSubmitButton";
import { loginSchema, type LoginErrors } from "@/schemas/auth/loginSchema";

function LoginFormFields() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errors, setErrors] = useState<LoginErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    router.push(searchParams.get("from") ?? "/dashboard");
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to access your financial home."
      footer={
        <>
          <Link
            href="/forgot-password"
            className="font-medium text-[#729c37] hover:text-[#4f7624]"
          >
            Forgot password?
          </Link>
          <span className="mx-2">·</span>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#729c37] hover:text-[#4f7624]"
          >
            Sign up
          </Link>
        </>
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
        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password}
        />
        <AuthSubmitButton>Sign in</AuthSubmitButton>
      </form>
    </AuthCard>
  );
}

export function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormFields />
    </Suspense>
  );
}
