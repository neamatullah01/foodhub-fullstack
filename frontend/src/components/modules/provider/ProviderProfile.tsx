"use client";

import Image from "next/image";
import { MapPin, Phone, ShoppingCart, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  categoryId: string;
}

export interface Provider {
  id: string;
  restaurantName: string;
  description: string;
  imageUrl: string | null;
  address: string;
  phone: string;
  meals: Meal[];
  rating?: number;
  totalReviews?: number;
}

export function ProviderProfile({ provider }: { provider: Provider }) {
  const cart = useCart();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const bannerImage =
    provider.imageUrl ||
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop";

  const providerAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    provider.restaurantName,
  )}&background=FFC222&color=000&bold=true&size=128`;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-16">
      <div className="relative h-64 md:h-80 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bannerImage}')` }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-20 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <Image
            src={providerAvatar}
            alt={provider.restaurantName}
            width={128}
            height={128}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-md shrink-0 bg-white"
          />

          <div className="flex-1 space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {provider.restaurantName}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              {provider.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                <Star className={`w-4 h-4 ${provider.rating ? "text-[#FFC222] fill-[#FFC222]" : "text-slate-400"}`} />
                <span className="font-bold text-slate-900 dark:text-white">{provider.rating ? provider.rating.toFixed(1) : "New"}</span>
                {provider.totalReviews !== undefined && provider.totalReviews > 0 && (
                  <span className="text-slate-500 text-xs">({provider.totalReviews} reviews)</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                <MapPin className="w-4 h-4 text-[#FFC222]" />
                {provider.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                <Phone className="w-4 h-4 text-[#FFC222]" />
                {provider.phone}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Menu
            </h2>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
          </div>

          {!provider.meals || provider.meals.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
              <Info className="w-10 h-10 text-slate-400 mb-3" />
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                No meals available
              </h3>
              <p className="text-slate-500">
                This provider hasn&apos;t added any meals to their menu yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {provider.meals.map((meal) => (
                <div
                  key={meal.id}
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${meal.imageUrl}')` }}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-black/20" />

                  <div className="absolute top-4 right-4 bg-[#FFC222] text-white px-3 py-1 rounded-full text-sm font-bold shadow-md z-10 flex items-center gap-1">
                    <span>৳</span> {meal.price}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-center z-10 flex flex-col items-center">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md line-clamp-1">
                      {meal.name}
                    </h3>
                    <p className="text-slate-300 text-xs mb-4 line-clamp-2 drop-shadow-sm h-8">
                      {meal.description}
                    </p>

                    <Button
                      disabled={!meal.isAvailable}
                      onClick={() => {
                        if (!session?.user) {
                          toast.error(
                            "Please login to add items to your cart.",
                          );
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
                          providerId: provider.id,
                          restaurantName: provider.restaurantName,
                        });
                      }}
                      className="rounded-full bg-[#e11d48] hover:bg-[#be123c] text-white border-none shadow-md transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed px-6"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {meal.isAvailable ? "Add to cart" : "Out of stock"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
