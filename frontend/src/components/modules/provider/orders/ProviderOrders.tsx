/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ChefHat,
  Bike,
  Home,
  XCircle,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateOrderStatus } from "@/services/provider.service";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending", icon: Clock },
  { value: "CONFIRMED", label: "Confirmed", icon: CheckCircle2 },
  { value: "COOKING", label: "Cooking", icon: ChefHat },
  { value: "ON_THE_WAY", label: "On the way", icon: Bike },
  { value: "DELIVERED", label: "Delivered", icon: Home },
  { value: "CANCELLED", label: "Cancelled", icon: XCircle },
];

export function ProviderOrders({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const toastId = toast.loading("Updating status...");

    try {
      const response = await updateOrderStatus(orderId, newStatus);

      if (response.error) {
        toast.error(response.error.message, { id: toastId });
        return;
      }

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
      toast.success(`Order status updated to ${newStatus.replace("_", " ")}`, {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to update status", { id: toastId });
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "COOKING":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "ON_THE_WAY":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "DELIVERED":
        return "bg-green-100 text-green-700 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search Order ID or Customer Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-50 dark:bg-slate-950/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <ChefHat className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold">No active orders found</h3>
            <p className="text-slate-500 text-sm mt-1">
              When customers place orders, they will appear here.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    Order #{order.id.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {new Date(order.createdAt).toLocaleDateString()} •{" "}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {order.customerName || "Customer"}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(order.status)} border px-3 py-1 font-semibold shadow-sm`}
                >
                  {order.status.replace("_", " ")}
                </Badge>
              </div>

              <div className="space-y-2 mb-6 flex-1">
                {order.orderItems?.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm border-b border-slate-50 dark:border-slate-800/50 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      <span className="text-slate-400 mr-2">
                        {item.quantity}x
                      </span>
                      {item.meal?.name || "Unknown Meal"}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">
                    Total Amount
                  </p>
                  <p className="font-bold text-xl text-[#e11d48]">
                    ৳{order.totalPrice?.toFixed(2) || "0.00"}
                  </p>
                </div>

                <div className="w-full sm:w-48">
                  <Select
                    disabled={updatingId === order.id}
                    defaultValue={order.status}
                    onValueChange={(val) => handleStatusChange(order.id, val)}
                  >
                    <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 font-semibold h-10">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                          className="font-medium cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <status.icon className="w-4 h-4 text-slate-500" />
                            {status.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
