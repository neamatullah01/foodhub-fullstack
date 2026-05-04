"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Phone, Utensils } from "lucide-react";
import { Provider } from "@/types/provider.types";
import Link from "next/link";

export function ProviderList({ providers }: { providers: Provider[] }) {
  return (
    // 1. Reduced md:py-24 to md:py-20 to slightly tighten the section's vertical space
    <section className="py-16 md:py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-[#FFC222] text-sm md:text-base font-bold uppercase tracking-widest mb-2">
            Our Recommendations
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Cafes &amp; Restaurants
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 sm:gap-6 mb-8 md:mb-12">
          {providers.map((item, index) => {
            const isFeatured = index === 0;

            return (
              <div
                key={item.id}
                className={`
                  group overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F9F7F2] dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full
                  ${
                    isFeatured
                      ? "sm:col-span-2 lg:col-span-1 lg:row-span-2"
                      : ""
                  }
                `}
              >
                {/* Image Wrapper */}
                <div
                  className={`relative overflow-hidden flex-shrink-0 w-full ${
                    isFeatured
                      ? // 2. Reduced featured image from lg:h-[80%] to lg:h-[60%]
                        "h-[180px] sm:h-[320px] lg:h-[78%]"
                      : // 3. Reduced standard images from lg:h-[220px] to lg:h-[180px]
                        "h-[180px] sm:h-[200px] lg:h-[180px]"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  />
                  <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white font-semibold border-none px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm z-10 flex items-center gap-1 sm:gap-1.5 backdrop-blur-sm">
                    <Utensils className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FFC222]" />
                    <span className="text-[10px] sm:text-xs">
                      {item._count.meals || 0} Meals
                    </span>
                  </Badge>
                </div>

                {/* Content */}
                {/* 4. Reduced lg:p-6 to lg:p-5 to make the text box slightly tighter */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 bg-[#Fdfbf7] dark:bg-slate-900 lg:relative">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3 group-hover:text-[#FFC222] transition-colors lg:pr-14">
                    {item.restaurantName}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium flex-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#FFC222]" />
                      <span className="line-clamp-1">{item.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 flex-shrink-0 text-[#FFC222]" />
                      <span>{item.phone}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Mobile & tablet: button in normal flow, no overlap */}
                  <div className="flex justify-end mt-3 sm:mt-4 lg:hidden">
                    <Link
                      href={`/providers/${item.id}`}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFC222] hover:bg-[#e5ae1e] text-black flex items-center justify-center shadow-md transition-transform active:scale-95 group-hover:translate-x-1"
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </div>

                  {/* Desktop: original absolute button */}
                  {/* 5. Adjusted button position to match tighter padding */}
                  <div className="hidden lg:block absolute bottom-5 right-5">
                    <Link
                      href={`/providers/${item.id}`}
                      className="w-10 h-10 rounded-full bg-[#FFC222] hover:bg-[#e5ae1e] text-black flex items-center justify-center shadow-md transition-transform active:scale-95 group-hover:translate-x-1"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            className="group rounded-full bg-[#FFC222] text-black px-10 py-6 font-bold text-base shadow-lg transition-all duration-300 ease-out hover:bg-[#e5ae1e] hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,194,34,0.7)] active:scale-95 active:translate-y-0"
          >
            <Link href="/providers" className="flex items-center gap-2">
              View More
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
