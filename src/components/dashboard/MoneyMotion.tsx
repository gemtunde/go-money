"use client";

import { Sparkles } from "lucide-react";
import { usePostsQuery } from "@/hooks/use-posts-query";

export function MoneyInMotion() {
  const { data: posts = [], isLoading, isError, refetch } = usePostsQuery();

  return (
    <section className="mt-6 rounded-2xl border border-[#e2e7df] bg-[#eef5df] p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c8f169] text-[#425d25]">
          <Sparkles size={17} />
        </span>
        <div>
          <h2 className="text-sm font-semibold">Your money, in motion</h2>
          <p className="mt-1 text-xs text-[#71806f]">
            A quick look at what&apos;s happening in your world
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {isLoading ? (
          [1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-xl bg-white/70"
            />
          ))
        ) : isError ? (
          <div className="flex items-center justify-between rounded-xl border border-[#f1c6b2] bg-white/70 p-4 sm:col-span-3">
            <p className="text-xs font-medium text-[#9a5d44]">
              Insights are temporarily unavailable.
            </p>
            <button
              onClick={() => refetch()}
              className="text-xs font-semibold text-[#729c37]"
            >
              Retry
            </button>
          </div>
        ) : (
          posts.slice(0, 3).map((post, index) => (
            <div
              key={post.id}
              className="rounded-xl border border-[#dfe9d0] bg-white/70 p-4"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8da356]">
                Insight 0{index + 1}
              </p>
              <p className="mt-2 line-clamp-2 text-xs font-medium capitalize leading-5">
                {post.body}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
