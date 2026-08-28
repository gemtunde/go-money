import type { Post } from "@/services/posts-service";

export function ActivityRow({ post, index }: { post: Post; index: number }) {
  const isIncoming = index % 2 === 1;

  return (
    <div className="flex items-center gap-3 py-4">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold ${
          isIncoming
            ? "bg-pink-100 text-pink-700"
            : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {isIncoming ? "IN" : "GO"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold capitalize">
          {post.title}
        </p>
        <p className="mt-0.5 truncate text-xs text-[#8b958e]">
          JSONPlaceholder activity · Post {post.id}
        </p>
      </div>
      <p className="text-sm font-semibold text-[#28332b]">
        {isIncoming ? "+$240.00" : "-$86.24"}
      </p>
    </div>
  );
}
