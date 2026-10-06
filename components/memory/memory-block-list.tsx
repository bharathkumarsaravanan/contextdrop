"use client";
import { useState, useRef, useEffect } from "react";
import { MemoryBlock } from "@/types/memory-block";
import { MemoryBlockCard } from "./memory-block-card";
import { Button } from "../ui/button";

import { toast } from "sonner";
import { Workspace } from "@/types/workspace";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { getMoreMemoryBlocks } from "@/app/dashboard/actions/get-more-memory-blocks";
import { MemoryBlockSkeleton } from "./memory-block-skeleton";

type Props = {
  blocks: MemoryBlock[];
  workspace: Workspace;
  searchQuery?: string;
  hasMore: boolean;
  totalMemories: number;

  selectable?: boolean;
  onSelectionChange?: (ids: Set<string>, memories: MemoryBlock[]) => void;
};

export function MemoryBlockList({
  blocks,
  workspace,
  searchQuery = "",
  hasMore,
  totalMemories,
  selectable,
  onSelectionChange
}: Props) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState(searchQuery);
  const [loadedBlocks, setLoadedBlocks] = useState(blocks);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreBlocks, setHasMoreBlocks] = useState(hasMore);

  async function handleLoadMore() {

    if (loadingMore || !hasMoreBlocks) {
      return;
    }

    try {
      setLoadingMore(true);

      const nextPage = currentPage + 1;

      const result = await getMoreMemoryBlocks(
        workspace.id,
        searchQuery,
        nextPage,
      );

      setLoadedBlocks((prev) => [...prev, ...result.data]);
      setCurrentPage(nextPage);
      setHasMoreBlocks(result.hasMore);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load more memories");
    } finally {
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (search.trim()) {
        params.set("q", search.trim());
      } else {
        params.delete("q");
      }

      const query = params.toString();

      router.push(query ? `?${query}` : window.location.pathname, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, router]);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasMoreBlocks || loadingMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        rootMargin: "300px"
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    }

  }, [hasMoreBlocks, loadingMore, currentPage, searchQuery]);

  function notifySelection(next: Set<string>) {
    const selectedMemories = loadedBlocks.filter(block => next.has(block.id));

    onSelectionChange?.(next, selectedMemories);
  }


  function handleSelect(blockId: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (checked) {
        next.add(blockId);
      } else {
        next.delete(blockId);
      }

      notifySelection(next)

      return next;
    });
  }

  

  function handleSelectAll() {
    const next = new Set(loadedBlocks.map(block => block.id));

    setSelectedIds(next);
    notifySelection(next)
  }

  function handleDeselect() {
    const next = new Set<string>();

    setSelectedIds(next);
    notifySelection(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search memories..."
            className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-zinc-500">
            {totalMemories} {totalMemories === 1 ? "memory" : "memories"}
          </div>

          {selectable && (<div className="flex items-center gap-2">
            {selectedIds.size > 0 && (
              <span className="text-sm text-zinc-500">
                {selectedIds.size} selected
              </span>
            )}

            {selectedIds.size < loadedBlocks.length ? (
              <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                Select All
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleDeselect}>
                Clear All
              </Button>
            )}
          </div>)}
        </div>
        
      </div>
      {loadedBlocks.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 px-6 text-center">
          <Search className="h-8 w-8 text-zinc-600" />

          <h3 className="mt-4 font-semibold text-zinc-300">
            No memories found
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
            No memories match{" "}
            <span className="text-zinc-300">&quot;{searchQuery}&quot;</span>. Try a
            different search.
          </p>

          <Button
            variant="ghost"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearch("");
            }}
          >
            Clear search
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {loadedBlocks.map((block) => (
            <MemoryBlockCard
              key={block.id}
              block={block}
              selected={selectedIds.has(block.id)}
              onSelect={handleSelect}
              selectable={selectable}
            />
          ))}
        </div>
      )}

      {hasMoreBlocks && (
        <div ref={loadMoreRef} className="p-4">
          {loadingMore && (
            <div className="grid gap-4 md:grid-cols-2">
              <MemoryBlockSkeleton />
              <MemoryBlockSkeleton />
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}
