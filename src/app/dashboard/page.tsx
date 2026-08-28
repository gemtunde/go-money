import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { fetchPosts } from "@/services/posts-service";
import { postKeys } from "@/hooks/use-posts-query";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { MoneyInMotion } from "@/components/dashboard/MoneyMotion";

const POSTS_LIMIT = 6;

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: postKeys.all(POSTS_LIMIT),
    queryFn: () => fetchPosts(POSTS_LIMIT),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-10 lg:px-14">
        <PageHeader />

        <section className="grid gap-5 xl:grid-cols-[1.35fr_1fr_1fr]">
          <BalanceCard />
          <SummaryCard
            icon={ArrowUpRight}
            iconBg="bg-[#e9f3d6]"
            iconColor="text-[#69942b]"
            label="Money out"
            amount="$2,418.36"
            footer={
              <>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#edf0eb]">
                  <div className="h-full w-[64%] rounded-full bg-[#9bc94b]" />
                </div>
                <p className="mt-2 text-xs text-[#8b958e]">
                  64% of monthly budget
                </p>
              </>
            }
          />
          <SummaryCard
            icon={ArrowDownLeft}
            iconBg="bg-[#fce9df]"
            iconColor="text-[#de7951]"
            label="Money in"
            amount="$3,960.00"
            footer={
              <p className="mt-5 text-xs text-[#8b958e]">
                <span className="font-semibold text-[#4f8a3e]">+$420.00</span>{" "}
                from last month
              </p>
            }
          />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <RecentActivity />
          <QuickActions />
        </section>

        <MoneyInMotion />
      </div>
    </HydrationBoundary>
  );
}
