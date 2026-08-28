"use client";

import { usePostsQuery } from "@/hooks/use-posts-query";
import { Skeleton } from "@/components/skeleton";
import { ActivityError } from "@/components/errorBoundary";
import { ActivityRow } from "@/components/dashboard/ActivityRow";

export function RecentActivity() {
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = usePostsQuery();

  return (
    <div className="rounded-2xl border border-[#e2e7df] bg-white">
      <div className="flex items-center justify-between border-b border-[#edf0eb] px-6 py-5">
        <div>
          <h2 className="font-semibold">Recent activity</h2>
          <p className="mt-1 text-xs text-[#8b958e]">
            Latest updates from your account
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="text-sm font-semibold text-[#729c37] hover:text-[#4f7624]"
        >
          Refresh
        </button>
      </div>
      <div className="divide-y divide-[#edf0eb] px-6">
        {isLoading ? (
          <Skeleton />
        ) : isError ? (
          <ActivityError message={error.message} onRetry={() => refetch()} />
        ) : (
          posts.map((post, index) => (
            <ActivityRow key={post.id} post={post} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
