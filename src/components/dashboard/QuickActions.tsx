import { Send, Sparkles, Users, WalletCards } from "lucide-react";

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-[#e2e7df] bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold">Quick actions</h2>
          <p className="mt-1 text-xs text-[#8b958e]">
            Make money movement simple
          </p>
        </div>
        <WalletCards size={20} className="text-[#9abf50]" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex flex-col items-start gap-4 rounded-xl border border-[#e5eae1] p-4 text-left transition hover:border-[#b7d77b] hover:bg-[#f8fbf3]">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#edf4df] text-[#6e9a32]">
            <Send size={16} />
          </span>
          <span className="text-xs font-semibold">Send money</span>
        </button>
        <button className="flex flex-col items-start gap-4 rounded-xl border border-[#e5eae1] p-4 text-left transition hover:border-[#b7d77b] hover:bg-[#f8fbf3]">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#fce9df] text-[#dc8057]">
            <Users size={16} />
          </span>
          <span className="text-xs font-semibold">Split a bill</span>
        </button>
      </div>
      <div className="mt-5 rounded-xl bg-[#f5f8f1] p-4">
        <div className="flex gap-3">
          <Sparkles size={16} className="mt-0.5 shrink-0 text-[#8db33d]" />
          <div>
            <p className="text-xs font-semibold">A little goes a long way</p>
            <p className="mt-1 text-xs leading-5 text-[#71806f]">
              You&apos;re spending 12% less on subscriptions this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
