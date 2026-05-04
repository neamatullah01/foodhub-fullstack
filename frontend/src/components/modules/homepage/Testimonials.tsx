"use client";

import { Star } from "lucide-react";
import Image from "next/image";

export function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Food Blogger",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
      text: "The quality of food and speed of delivery completely blew me away. FoodHub is now my go-to app for weekend dinners!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop",
      text: "I love the variety of local providers available. Everything arrives hot, and the cash-on-delivery option is super convenient.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Fitness Coach",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop",
      text: "Finding healthy meal prep options used to be a chore. FoodHub makes it incredibly easy to find meals that fit my diet perfectly.",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#e5ae1e] font-bold tracking-wider uppercase text-sm">Customer Reviews</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-6 text-slate-900 dark:text-white">
            What People Say
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Don&apos;t just take our word for it. Hear from thousands of satisfied customers who order with us every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-slate-50 dark:bg-slate-950 p-5 md:p-6 lg:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative transition-transform hover:-translate-y-2 flex flex-col">
              <div className="flex text-[#FFC222] mb-4 lg:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 lg:w-5 lg:h-5 ${i < review.rating ? "fill-current" : "fill-transparent text-slate-300 dark:text-slate-700"}`} 
                  />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 lg:mb-8 italic leading-relaxed text-sm lg:text-base flex-1">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3 lg:gap-4 mt-auto">
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-[#FFC222] shrink-0">
                  <Image src={review.image} alt={review.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm lg:text-base line-clamp-1">{review.name}</h4>
                  <p className="text-xs lg:text-sm text-slate-500 line-clamp-1">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
