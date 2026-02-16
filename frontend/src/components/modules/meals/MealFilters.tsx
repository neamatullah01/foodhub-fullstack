"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export function MealFilters({
  currentParams,
  categories,
}: {
  currentParams: {
    search: string;
    categoryId: string;
    sortOrder: string;
    sortBy: string;
  };
  categories: Array<{ id: string; name: string }>;
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

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 mb-8">
      <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300 mr-2 shrink-0">
        <Filter className="w-5 h-5 text-[#FFC222]" />
        Filters
      </div>

      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search meals by name or description..."
          className="pl-9 w-full bg-slate-50 dark:bg-slate-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full md:w-48 shrink-0">
        <select
          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={currentParams.categoryId}
          onChange={(e) => updateFilters({ categoryId: e.target.value })}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-48 shrink-0">
        <select
          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={currentParams.sortOrder}
          onChange={(e) =>
            updateFilters({
              sortBy: "price",
              sortOrder: e.target.value,
            })
          }
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
