"use server";

import { createClient } from "@/lib/supabase/server";

const PAGE_SIZE = 20;

export async function getMoreMemoryBlocks(
  workspaceId: string,
  search: string,
  page: number,
) {
  const supabase = await createClient();

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  let query = supabase
    .from("memory_blocks")
    .select("*", { count: "exact" })
    .eq("workspace_id", workspaceId)
    .order("created_at", {
      ascending: false,
    })
    .range(from, to - 1);

  const normalizedSearch = search.trim();

  if (normalizedSearch) {
    query = query.or(
      `title.ilike.%${normalizedSearch}%,content.ilike.%${normalizedSearch}%,category.ilike.%${normalizedSearch}%`,
    );
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error.message);

    return {
      data: [],
      hasMore: false,
      total: 0,
    };
  }

  return {
    data: data ?? [],
    hasMore: (count ?? 0) > to,
    total: count ?? 0,
  };
}