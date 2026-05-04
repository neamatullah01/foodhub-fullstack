"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ProviderFilters({
  currentParams,
}: {
  currentParams: {
    search: string;
    sortOrder: string;
    sortBy: string;
    rating: string;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(currentParams.search);

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "all") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== currentParams.search) {
        updateFilters({ search: searchTerm });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentParams.search, updateFilters]);

  // Derive a combined sort value for the dropdown
  const currentSortValue = `${currentParams.sortBy}-${currentParams.sortOrder}`;

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 mb-8">
      <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300 mr-2 shrink-0">
        <Filter className="w-5 h-5 text-[#FFC222]" />
        Filters
      </div>

      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search providers by name, description or address..."
          className="pl-9 w-full bg-slate-50 dark:bg-slate-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full md:w-40 shrink-0">
        <select
          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={currentParams.rating || "all"}
          onChange={(e) => updateFilters({ rating: e.target.value })}
        >
          <option value="all">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
        </select>
      </div>

      <div className="w-full md:w-48 shrink-0">
        <select
          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={currentSortValue}
          onChange={(e) => {
            const [newSortBy, newSortOrder] = e.target.value.split("-");
            updateFilters({
              sortBy: newSortBy,
              sortOrder: newSortOrder,
            });
          }}
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="rating-asc">Lowest Rated</option>
        </select>
      </div>
    </div>
  );
}
