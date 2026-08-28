export function Skeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="flex items-center gap-3 py-4">
          <span className="h-10 w-10 animate-pulse rounded-full bg-[#edf0eb]" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/5 animate-pulse rounded bg-[#edf0eb]" />
            <div className="h-2.5 w-3/5 animate-pulse rounded bg-[#f2f4f0]" />
          </div>
        </div>
      ))}
    </>
  );
}
