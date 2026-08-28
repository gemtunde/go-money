import { api } from "@/lib/api";

export type Post = {
  id: number;
  title: string;
  body: string;
};

export async function fetchPosts(limit = 6): Promise<Post[]> {
  const { data } = await api.get<Post[]>("/posts", {
    params: { _limit: limit },
  });

  return data;
}
