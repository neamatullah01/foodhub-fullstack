/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { ReviewModal } from "./ReviewModal";
import {
  Clock,
  CheckCircle2,
  ChefHat,
  Bike,
  Home,
  XCircle,
  Store,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const TRACKING_STEPS = [
  { id: "PENDING", label: "Pending", icon: Clock },
  { id: "CONFIRMED", label: "Confirmed", icon: CheckCircle2 },
  { id: "COOKING", label: "Cooking", icon: ChefHat },
  { id: "ON_THE_WAY", label: "On the way", icon: Bike },
  { id: "DELIVERED", label: "Delivered", icon: Home },
];

export function OrderCard({ order }: { order: any }) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const currentStatusIndex = TRACKING_STEPS.findIndex(
    (s) => s.id === order.status,
  );
  const isCancelled = order.status === "CANCELLED";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all mb-6 relative overflow-hidden">
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
            <Store className="w-7 h-7 text-[#FFC222]" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-white line-clamp-1">
              {order.provider?.restaurantName}
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Order #{order.id?.substring(0, 8).toUpperCase()} • {formattedDate}
            </p>
          </div>
        </div>

        {isCancelled && (
          <Badge className="bg-red-100 text-red-700 border-none px-3 py-1 text-sm">
            <XCircle className="w-4 h-4 mr-1" /> Cancelled
          </Badge>
        )}
      </div>

      {!isCancelled && (
        <div className="mb-10 mt-4">
          <div className="relative flex justify-between items-center w-full">
            {/* Background Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full z-0"></div>

            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#FFC222] rounded-full z-0 transition-all duration-500"
              style={{
                width:
                  currentStatusIndex >= 0
                    ? `${(currentStatusIndex / (TRACKING_STEPS.length - 1)) * 100}%`
                    : "0%",
              }}
            ></div>

            {TRACKING_STEPS.map((step, index) => {
              const isCompleted = currentStatusIndex >= index;
              const isCurrent = currentStatusIndex === index;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="relative z-10 flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${
                      isCompleted
                        ? "bg-[#FFC222] border-white dark:border-slate-900 text-black shadow-md"
                        : "bg-slate-100 dark:bg-slate-800 border-white dark:border-slate-900 text-slate-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-xs font-bold absolute -bottom-6 w-24 text-center ${
                      isCurrent
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="space-y-4 mb-6 border-t border-slate-100 dark:border-slate-800 pt-6">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
          Order Details
        </h4>
        {order.orderItems?.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between items-center group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                <Image
                  src={item.meal?.imageUrl || "/placeholder.jpg"}
                  alt={item.meal?.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {item.meal?.name}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Qty: {item.quantity} × ৳{item.price}
                </span>
              </div>
            </div>
            <span className="font-bold text-slate-900 dark:text-white shrink-0">
              ৳{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 max-w-sm">
          <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm shrink-0">
            <MapPin className="w-4 h-4 text-[#FFC222]" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium mb-0.5">
              Delivery Address
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
              {order.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-200 dark:border-slate-800 pt-4 sm:pt-0">
          <div className="flex flex-col text-left sm:text-right">
            <span className="text-xs text-slate-500 font-medium">
              Total Price
            </span>
            <span className="font-bold text-xl text-[#e11d48]">
              ৳{order.totalPrice.toFixed(2)}
            </span>
          </div>

          {order.status === "DELIVERED" &&
            (order.isReviewed ? (
              <Badge className="bg-green-50 text-green-600 border border-green-200 py-1.5 px-3">
                Reviewed
              </Badge>
            ) : (
              <ReviewModal
                providerId={order.providerId}
                orderId={order.id}
                mealId={order.orderItems[0].mealId}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
