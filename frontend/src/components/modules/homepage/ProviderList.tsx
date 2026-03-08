"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowRight, MapPin, Phone, Utensils } from "lucide-react";
import { Provider } from "@/types/provider.types";
import Link from "next/link";

export function ProviderList({ providers }: { providers: Provider[] }) {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-[#FFC222] text-sm md:text-base font-bold uppercase tracking-widest mb-2">
            Our Recommendations
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Cafes & Restaurants
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-none lg:grid-rows-2 gap-6 mb-12 h-auto">
          {providers.map((item, index) => {
            const isFeatured = index === 0;

            return (
              <div
                key={item.id}
                className={`
                  group relative overflow-hidden rounded-3xl bg-[#F9F7F2] dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col
                  ${
                    isFeatured
                      ? "lg:row-span-2 lg:col-span-1 min-h-[500px]"
                      : "col-span-1 min-h-[350px]"
                  }
                `}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    isFeatured ? "flex-1" : "h-[55%]"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  />

                  <Badge className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white font-semibold border-none px-3 py-1.5 rounded-full shadow-sm z-10 flex items-center gap-1.5 backdrop-blur-sm">
                    <Utensils className="h-3.5 w-3.5 text-[#FFC222]" />
                    <span className="text-xs">
                      {item._count.meals || 0} Meals
                    </span>
                  </Badge>
                </div>

                <div className="p-6 flex flex-col justify-between bg-[#Fdfbf7] dark:bg-slate-900 relative">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-[#FFC222] transition-colors">
                      {item.restaurantName}
                    </h3>

                    <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 mt-0.5 text-[#FFC222]" />
                        <span className="line-clamp-1">{item.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-[#FFC222]" />
                        <span>{item.phone}</span>
                      </div>
                      <p className="pt-2 text-xs text-slate-400 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6">
                    <Link
                      href={`/providers/${item.id}`}
                      className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#FFC222] hover:bg-[#e5ae1e] text-black flex items-center justify-center shadow-md transition-transform active:scale-95 group-hover:translate-x-1"
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
            className="group rounded-full bg-[#FFC222] text-black px-10 py-6 font-bold text-base shadow-lg transition-all duration-300 ease-out hover:bg-[#ffcd44] hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,194,34,0.7)] active:scale-95 active:translate-y-0"
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
