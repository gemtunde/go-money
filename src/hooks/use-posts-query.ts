import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/posts-service";

export const postKeys = {
  all: (limit: number) => ["posts", limit] as const,
};

export function usePostsQuery(limit = 6) {
  return useQuery({
    queryKey: postKeys.all(limit),
    queryFn: () => fetchPosts(limit),
    staleTime: 60_000,
  });
}
