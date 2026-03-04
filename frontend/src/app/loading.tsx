import { UtensilsCrossed } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute inset-0 bg-[#FFC222]/20 rounded-full blur-xl animate-pulse"></div>

        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>

        <div className="absolute inset-0 rounded-full border-4 border-[#FFC222] border-t-transparent animate-spin"></div>

        <div className="absolute bg-white dark:bg-slate-900 w-14 h-14 rounded-full shadow-sm flex items-center justify-center">
          <UtensilsCrossed className="w-7 h-7 text-[#FFC222]" />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center animate-pulse">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          FoodHub <span className="text-[#FFC222]">Pro</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Warming up the ovens...
        </p>
      </div>
    </div>
  );
};

export default Loading;
