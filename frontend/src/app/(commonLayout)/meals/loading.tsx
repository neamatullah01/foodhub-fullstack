import { Filter } from "lucide-react";

export default function LoadingMeals() {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Skeleton */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Explore Meals
          </h1>
          <p className="text-slate-500">
            Find the best food from local providers.
          </p>
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
          <div className="w-full md:w-48 shrink-0">
            <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Meals Grid Skeleton */}
        <div className="flex flex-col gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse"
            >
              <div className="sm:w-[280px] h-[200px] sm:h-auto bg-slate-200 dark:bg-slate-800 shrink-0"></div>
              
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6 mb-6"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-full w-32 mt-auto"></div>
              </div>
              
              <div className="sm:w-[220px] bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 flex flex-row sm:flex-col items-center justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 sm:flex-col sm:gap-0 text-left sm:text-center">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-slate-200 dark:bg-slate-800 sm:mb-3 shrink-0"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-24 sm:mb-2"></div>
                </div>
                
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16 sm:mt-2 shrink-0"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
