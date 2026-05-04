"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Meal } from "@/types/meal.types";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function FeaturedMenu({ items }: { items: Meal[] }) {
  const cart = useCart();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-[#e63e3e] text-xl sm:text-2xl font-handwriting italic mb-2">
            Our Menu
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            Popular Meals
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Discover our most loved dishes, prepared with fresh ingredients and
            passion.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8 md:mb-12">
          {items && items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="group relative h-[360px] sm:h-[380px] lg:h-[400px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Price badge — yellow brand color */}
                <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#FFC222] text-black font-bold text-sm sm:text-base px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg border-none">
                  ৳ {item.price}
                </Badge>

                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 lg:p-6 text-center flex flex-col items-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1.5 sm:mb-2 tracking-wide drop-shadow-md line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-5 lg:mb-6 line-clamp-2 px-1 sm:px-2">
                    {item.description}
                  </p>
                  <Button
                    disabled={!item.isAvailable}
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
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        imageUrl: item.imageUrl,
                        providerId: item.provider.id,
                        restaurantName: item.provider.restaurantName,
                      });
                    }}
                    className="rounded-full bg-[#e11d48] hover:bg-[#be123c] text-white shadow-xl tracking-wide transition-all transform active:scale-95 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm px-4 sm:px-6 py-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    {item.isAvailable ? "Add to cart" : "Out of stock"}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-slate-500">
              No meals available at the moment.
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <Button
            asChild
            className="group rounded-full bg-[#FFC222] text-black px-8 sm:px-10 py-5 sm:py-6 font-bold text-sm sm:text-base shadow-lg transition-all duration-300 ease-out hover:bg-[#e5ae1e] hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,194,34,0.7)] active:scale-95 active:translate-y-0"
          >
            <Link href="/meals" className="flex items-center gap-2">
              View All Meals
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
