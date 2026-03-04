import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, ArrowLeft, UtensilsCrossed } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 text-center">
      <div className="relative flex items-center justify-center w-32 h-32 mb-8">
        <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-2xl"></div>

        <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm"></div>
        <div className="absolute inset-2 bg-slate-50 dark:bg-slate-950 rounded-full border border-slate-100 dark:border-slate-800/50 flex items-center justify-center">
          {/* Main Icon */}
          <div className="relative">
            <UtensilsCrossed className="w-10 h-10 text-slate-300 dark:text-slate-700" />
            <SearchX className="w-8 h-8 text-[#e11d48] absolute -bottom-2 -right-2 bg-slate-50 dark:bg-slate-950 rounded-full p-1 shadow-sm" />
          </div>
        </div>
      </div>

      <h1 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
        4<span className="text-[#FFC222]">0</span>4
      </h1>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3 tracking-tight">
        This page is off the menu!
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg">
        We searched the entire kitchen, but we couldn&apos;t find the page you
        were looking for. It might have been devoured or moved.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          asChild
          size="lg"
          className="bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold rounded-xl shadow-sm w-full sm:w-auto"
        >
          <Link href="/">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-xl w-full sm:w-auto border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <Link href="/providers">Visit the Restaurants</Link>
        </Button>
      </div>
    </div>
  );
}
