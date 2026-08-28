import { NewPaymentModal } from "./NewPaymentModal";
import { WithdrawModal } from "./WithdrawModal";

export function PageHeader() {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <p className="mb-2 text-sm font-medium text-[#8b958e]">
          Good morning, Alex
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Your financial home
        </h1>
      </div>
      <div className="hidden items-center gap-3 sm:flex">
        <WithdrawModal />
        <NewPaymentModal />
      </div>
    </div>
  );
}
