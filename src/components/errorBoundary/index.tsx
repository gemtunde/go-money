export function ActivityError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="px-1 py-10">
      <p className="text-sm font-semibold">
        Couldn&apos;t load recent activity
      </p>
      <p className="mt-1 text-xs text-[#8b958e]">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-lg bg-[#203020] px-3 py-2 text-xs font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
