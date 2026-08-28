import { type ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";

export function AuthSubmitButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      type="submit"
      className="w-full rounded-xl bg-[#203020] py-3 text-sm font-semibold text-white hover:bg-[#344a20]"
      {...props}
    >
      {children}
    </Button>
  );
}
