import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div className="mx-auto max-w-lg px-5 py-8 sm:px-10">
      <h1 className="text-2xl font-semibold tracking-[-0.04em]">
        Change password
      </h1>
      <p className="mt-2 text-sm text-[#7a867c]">
        Choose a strong password you&apos;re not using anywhere else.
      </p>
      <ChangePasswordForm />
    </div>
  );
}
