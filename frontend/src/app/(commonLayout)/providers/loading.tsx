import { Filter } from "lucide-react";

export default function LoadingProviders() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-[#FFC222] font-bold text-sm tracking-widest uppercase mb-2">
            Our Recommendations
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Cafes & Restaurants
          </h1>
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300 mr-2 shrink-0">
            <Filter className="w-5 h-5 text-[#FFC222]" />
            Filters
          </div>
          <div className="relative flex-1 w-full">
            <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse"></div>
          </div>
          <div className="w-full md:w-48 shrink-0">
            <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Providers Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 animate-pulse"
            >
              <div className="h-56 w-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>

              <div className="p-6 flex flex-col flex-1">
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 mb-4"></div>
                <div className="space-y-3 mb-4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3"></div>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full mt-auto mb-2"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
