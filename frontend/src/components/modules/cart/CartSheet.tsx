"use client";

import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import Link from "next/link";

export function CartSheet() {
  const cart = useCart();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  const itemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-10 w-10 rounded-full border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#e11d48] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg px-2">
        <SheetHeader className="px-1">
          <SheetTitle>Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto pr-6 mt-8 space-y-4">
          {cart.items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <span className="text-lg font-medium">Your cart is empty</span>
              <p className="text-sm text-muted-foreground">
                Add some delicious meals to get started!
              </p>
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-2 px-2 border-b"
              >
                <div className="h-16 w-16 relative rounded-md overflow-hidden shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <span className="font-semibold text-sm line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.restaurantName}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        cart.updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-4 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        cart.updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-sm">
                    ৳ {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => cart.removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="pr-6 pt-4 space-y-4">
            <div className="flex items-center justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳ {cart.cartTotal().toFixed(2)}</span>
            </div>
            <Button
              asChild
              className="w-full bg-[#FFC222] hover:bg-[#e5ae1e] text-black font-bold"
            >
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full text-xs"
              onClick={cart.clearCart}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
