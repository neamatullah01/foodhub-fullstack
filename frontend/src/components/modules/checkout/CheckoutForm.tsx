"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { MapPin, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { createOrder } from "@/services/order.service";

export function CheckoutForm() {
  const cart = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
  });

  const subtotal = cart.cartTotal();
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!formData.address) {
      toast.error("Please provide a delivery address.");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Placing your order...");

    try {
      const orderPayload = {
        providerId: cart.items[0].providerId,
        address: formData.address,
        paymentMethod: "CASH_ON_DELIVERY",
        items: cart.items.map((item) => ({
          mealId: item.id,
          quantity: item.quantity,
        })),
      };

      const { data, error } = await createOrder(orderPayload);

      console.log("Backend Response:", data);

      if (error) throw new Error(error.message);

      toast.success("Order placed successfully!", { id: toastId });
      cart.clearCart();
      router.push("/orders");
    } catch (error) {
      toast.error("Failed to place order. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="text-slate-500 mb-8">
          Looks like you haven&apos;t added any meals yet.
        </p>
        <Button
          onClick={() => router.push("/meals")}
          className="bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold px-8"
        >
          Browse Meals
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
            <MapPin className="w-6 h-6 text-[#FFC222]" />
            Delivery Details
          </h2>

          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Full Address
              </label>
              <textarea
                required
                rows={4}
                placeholder="e.g. House 12, Road 5, Dhanmondi, Dhaka..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC222] transition-all resize-none"
                value={formData.address}
                onChange={(e) => setFormData({ address: e.target.value })}
              />
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-5 text-slate-900 dark:text-white">
            Payment Method
          </h2>

          <div className="p-5 border-2 border-[#10b981] bg-[#10b981]/10 rounded-2xl flex items-center gap-4 transition-all">
            <div className="bg-[#10b981] p-3 rounded-full text-white shadow-sm shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg text-slate-900 dark:text-white">
                Cash on Delivery
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Pay with cash when your food arrives at your door.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm sticky top-24">
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
            Order Summary
          </h2>
          <div className="space-y-4 mb-6 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start text-sm group"
              >
                <div className="flex items-start gap-3 pr-4">
                  <span className="font-bold text-[#FFC222] bg-[#FFC222]/10 px-2 py-0.5 rounded-md">
                    {item.quantity}x
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 dark:text-white line-clamp-2">
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.restaurantName}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white shrink-0 mt-0.5">
                  ৳ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm">
            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900 dark:text-white">
                ৳ {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-medium text-slate-900 dark:text-white">
                ৳ {deliveryFee.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xl font-extrabold text-slate-900 dark:text-white">
              <span>Total</span>
              <span className="text-[#e11d48]">৳ {total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            type="submit"
            form="checkout-form"
            disabled={isLoading || cart.items.length === 0}
            className="w-full mt-8 bg-[#FFC222] hover:bg-[#e5ae1e] text-black font-bold h-14 rounded-2xl text-lg shadow-md transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing Order..." : "Confirm & Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
