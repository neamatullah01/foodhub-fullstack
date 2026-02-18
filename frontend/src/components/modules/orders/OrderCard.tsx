"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "./ReviewModal";
import { format } from "date-fns"; // Make sure to install date-fns

// Status Color Helper
const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "PREPARING":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "DELIVERED":
      return "bg-green-100 text-green-700 border-green-200";
    case "CANCELLED":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export function OrderCard({ order }: { order: any }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header: Restaurant Name & Status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {order.provider?.restaurantName || "Restaurant"}
          </h3>
          <p className="text-xs text-slate-500">
            {format(new Date(order.createdAt), "PPP • p")}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`${getStatusColor(order.status)} border px-3 py-1`}
        >
          {order.status}
        </Badge>
      </div>

      {/* Order Items List */}
      <div className="space-y-2 mb-4 border-t border-b border-slate-100 dark:border-slate-800 py-3">
        {order.items.map((item: any) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white mr-2">
                {item.quantity}x
              </span>
              {item.meal.name}
            </span>
            <span className="text-slate-500">
              ৳{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer: Total & Actions */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500">Total Amount</span>
          <span className="font-bold text-lg text-[#e11d48]">
            ৳{order.totalAmount.toFixed(2)}
          </span>
        </div>

        <div>
          {/* LOGIC: If Delivered, Show Review. If Pending, Show Track. */}
          {order.status === "DELIVERED" ? (
            !order.hasReviewed ? (
              <ReviewModal providerId={order.providerId} orderId={order.id} />
            ) : (
              <span className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                Reviewed
              </span>
            )
          ) : (
            <Button
              variant="secondary"
              size="sm"
              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800"
            >
              Track Status
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
