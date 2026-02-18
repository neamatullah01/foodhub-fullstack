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
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-[#e63e3e] text-2xl font-handwriting italic mb-2">
            Our Menu
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Popular Meals
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover our most loved dishes, prepared with fresh ingredients and
            passion.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {items && items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="group relative h-[400px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-3 py-1 rounded-full shadow-lg">
                  ৳ {item.price}
                </Badge>

                <div className="absolute bottom-0 left-0 w-full p-6 text-center flex flex-col items-center">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-wide drop-shadow-md">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 line-clamp-2 px-2">
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
                    className="rounded-full bg-[#e11d48] hover:bg-[#be123c] text-white border-none shadow-md transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed px-6"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
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
          <Link href="/meals">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-colors text-lg h-14"
            >
              View All Meals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
