"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Pizza, Utensils, Beef, Sandwich, Coffee, Apple } from "lucide-react";
import { CategoryData } from "@/types/category.types";

const iconMap: Record<string, React.ElementType> = {
  fastfood: Sandwich,
  pizza: Pizza,
  asian: Utensils,
  meat: Beef,
  dessert: Coffee,
  healthy: Apple,
  default: Utensils,
};

export function CategoryCarousel({
  categories,
}: {
  categories: CategoryData[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-12 -mt-12 transition-colors duration-300">
      <div className="text-center mb-10 relative z-10 px-4">
        <h3 className="text-[#e63e3e] text-2xl font-handwriting italic mb-2">
          Choose your flavor
        </h3>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white drop-shadow-sm transition-colors duration-300">
          Food Categories
        </h2>
        <div className="w-24 h-1 bg-[#e63e3e] mx-auto mt-4 rounded-full" />
      </div>

      <div className="container mx-auto px-3 sm:px-6">
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {categories.map((cat) => {
              const key = (cat.slug || cat.name).toLowerCase();
              const IconComponent = iconMap[key] || iconMap.default;

              return (
                <CarouselItem
                  key={cat.id}
                  className="pl-2 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="p-1">
                    <Card className="border-none shadow-none bg-[#F3F1EA] dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all duration-300 cursor-pointer group rounded-xl">
                      <CardContent className="flex items-center p-4 sm:p-5 lg:p-6 gap-3 sm:gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#FFC222] group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-slate-800 dark:text-slate-900" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-bold text-sm sm:text-base lg:text-lg text-slate-900 dark:text-slate-100 leading-tight mb-0.5 truncate">
                            {cat.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {cat.count}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-center gap-3 mt-6 sm:gap-4 sm:mt-8">
            <CarouselPrevious className="static translate-y-0 bg-white dark:bg-[#FFC222] text-slate-900 dark:text-white border-slate-200 hover:bg-[#FFC222] hover:text-black dark:hover:bg-primary h-10 w-10 sm:h-12 sm:w-12 cursor-pointer" />
            <CarouselNext className="static translate-y-0 bg-white dark:bg-[#FFC222] text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-[#FFC222] hover:text-black dark:hover:bg-primary h-10 w-10 sm:h-12 sm:w-12 cursor-pointer" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
