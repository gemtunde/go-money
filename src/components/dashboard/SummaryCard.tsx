import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SummaryCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  amount: string;
  footer: ReactNode;
}

export function SummaryCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  amount,
  footer,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-[#e2e7df] bg-white p-7">
      <div className="flex items-center justify-between">
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon size={19} />
        </span>
        <span className="text-xs font-medium text-[#7a867c]">This month</span>
      </div>
      <p className="mt-7 text-2xl font-semibold tracking-[-0.04em]">{amount}</p>
      <p className="mt-1 text-sm text-[#7a867c]">{label}</p>
      {footer}
    </div>
  );
}
