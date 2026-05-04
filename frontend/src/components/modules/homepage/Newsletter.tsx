"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-900 dark:bg-black">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FFC222] rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e5ae1e] rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-slate-800/50 dark:bg-slate-950/80 backdrop-blur-md border border-slate-700/50 dark:border-slate-800 rounded-3xl p-8 md:p-16 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Get <span className="text-[#FFC222]">20% Off</span> Your First Order!
            </h2>
            <p className="text-slate-300 text-lg">
              Subscribe to our newsletter to receive exclusive discounts, new menu updates, and special promotions right in your inbox.
            </p>
          </div>

          <div className="w-full md:w-auto flex-1 max-w-md">
            <form className="flex flex-col sm:flex-row gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full pl-12 pr-4 h-14 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:ring-[#FFC222] focus:border-[#FFC222]"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="h-14 px-8 bg-[#FFC222] hover:bg-[#e5ae1e] text-black font-bold text-lg rounded-xl transition-transform active:scale-95 shadow-lg shadow-[#FFC222]/20"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-slate-500 text-sm mt-3 text-center md:text-left">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
