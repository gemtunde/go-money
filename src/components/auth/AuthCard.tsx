import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f6] p-6 text-[#17211b]">
      <Card className="w-full max-w-sm rounded-2xl border-[#e2e7df] shadow-sm">
        <CardContent className="p-8">
          <div className="mb-8 flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#c8f169] text-lg font-bold">
              g
            </span>
            <span className="text-xl font-semibold tracking-[-0.04em]">
              go<span className="text-[#95b946]">.</span>money
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h1>
          <p className="mt-2 text-sm text-[#7a867c]">{subtitle}</p>

          {children}

          {footer && (
            <div className="mt-6 text-center text-sm text-[#7a867c]">
              {footer}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
