"use client";

import { MapPin, Phone, Utensils, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export interface Provider {
  id: string;
  userId: string;
  restaurantName: string;
  description: string;
  imageUrl: string | null;
  address: string;
  phone: string;
  isApproved: boolean;
  createdAt: string;
  _count: {
    meals: number;
  };
  rating?: number;
  totalReviews?: number;
}

export function AllProviders({ providers }: { providers: Provider[] }) {
  if (!providers || providers.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border rounded-2xl p-16 text-center text-muted-foreground">
        No providers found matching your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {providers.map((provider) => {
        // Fallback image if provider has no image
        const imageSrc =
          provider.imageUrl ||
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop";

        return (
          <div
            key={provider.id}
            className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800"
          >
            <div className="relative h-56 w-full overflow-hidden shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('${imageSrc}')` }}
              />

              <div className="absolute top-4 left-4 bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm backdrop-blur-sm">
                <Star className={`w-3 h-3 ${provider.rating ? "text-[#FFC222] fill-[#FFC222]" : "text-slate-400"}`} />
                {provider.rating ? provider.rating.toFixed(1) : "New"}
                {provider.totalReviews !== undefined && provider.totalReviews > 0 && (
                  <span className="text-slate-500 ml-0.5">({provider.totalReviews})</span>
                )}
              </div>

              <div className="absolute top-4 right-4 bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm backdrop-blur-sm">
                <Utensils className="w-3 h-3 text-[#FFC222]" />
                {provider._count?.meals || 0} Meals
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 relative">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-1">
                {provider.restaurantName}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-[#FFC222] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{provider.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Phone className="w-4 h-4 text-[#FFC222] shrink-0" />
                  <span>{provider.phone}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 pr-12 mt-auto">
                {provider.description}
              </p>

              <Link
                href={`/providers/${provider.id}`}
                className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#FFC222] hover:bg-[#e5ae1e] text-black flex items-center justify-center shadow-md transition-transform active:scale-95 group-hover:translate-x-1"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
