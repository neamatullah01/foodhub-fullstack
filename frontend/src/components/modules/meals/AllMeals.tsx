"use client";

import Image from "next/image";
import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export interface Provider {
  id: string;
  restaurantName: string;
  imageUrl: string | null;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  provider: Provider;
}

export function AllMeals({ meals }: { meals: Meal[] }) {
  const cart = useCart();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <div className="flex flex-col gap-6">
      {meals.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-16 text-center text-muted-foreground">
          No meals found matching your filters.
        </div>
      ) : (
        meals.map((meal) => {
          const providerAvatar =
            meal.provider.imageUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              meal.provider.restaurantName,
            )}&background=FFC222&color=000&bold=true`;

          return (
            <div
              key={meal.id}
              className="group flex flex-col sm:flex-row bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-red-300 dark:border-slate-800"
            >
              <div className="sm:w-[280px] h-[200px] sm:h-auto relative shrink-0 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${meal.imageUrl}')` }}
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white line-clamp-1">
                    {meal.name}
                  </h3>
                  <div className="shrink-0 bg-[#FFC222] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
                    <span>৳</span> {meal.price}
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6">
                  {meal.description}
                </p>

                <div className="mt-auto">
                  <Button
                    disabled={!meal.isAvailable}
                    onClick={() => {
                      if (!session?.user) {
                        toast.error("Please login to add items to your cart.");
                        router.push("/login");
                        return;
                      }
                      if (session?.user && !session.user) {
                        toast.error("Only customers can place orders.");
                        return;
                      }

                      cart.addItem({
                        id: meal.id,
                        name: meal.name,
                        price: meal.price,
                        imageUrl: meal.imageUrl,
                        providerId: meal.provider.id,
                        restaurantName: meal.provider.restaurantName,
                      });
                    }}
                    className="rounded-full bg-[#e11d48] hover:bg-[#be123c] text-white border-none shadow-xl tracking-wide transition-all transform active:scale-95 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed px-6 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {meal.isAvailable ? "Add to cart" : "Out of stock"}
                  </Button>
                </div>
              </div>

              {/* Refined Provider Block */}
              <div
                onClick={() => router.push(`/providers/${meal.provider.id}`)}
                className="sm:w-[220px] bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 flex flex-row sm:flex-col items-center justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:flex-col sm:gap-0 text-left sm:text-center">
                  {meal.provider.imageUrl ? (
                    <Image
                      src={providerAvatar}
                      alt={meal.provider.restaurantName}
                      width={80}
                      height={80}
                      className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover border-2 sm:border-4 border-white dark:border-slate-800 shadow-sm sm:mb-3 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#FFC222] flex items-center justify-center text-black border-2 sm:border-4 border-white dark:border-slate-800 shadow-sm sm:mb-3 shrink-0">
                      <Store className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                  )}

                  <span className="font-bold text-slate-900 dark:text-white line-clamp-1 sm:line-clamp-2 text-sm">
                    {meal.provider.restaurantName}
                  </span>
                </div>

                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 uppercase tracking-wider shrink-0 bg-white dark:bg-slate-800 px-3 py-1 sm:mt-2 rounded-full border border-slate-200 dark:border-slate-700">
                  Provider
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
