"use client";

import { useState } from "react";
import {
  Search,
  ClipboardList,
  CheckCircle2,
  Clock,
  ChefHat,
  Bike,
  Home,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1. Updated Interface to match your exact backend response
export interface PlatformOrder {
  id: string;
  userId: string;
  providerId: string;
  status: string;
  totalPrice: number;
  address: string;
  paymentMethod: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  provider: {
    restaurantName: string;
  };
}

export function AdminOrdersTable({
  initialOrders,
}: {
  initialOrders: PlatformOrder[];
}) {
  const [orders, setOrders] = useState<PlatformOrder[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Filter logic for Admins
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase();

    // 2. Updated search to look inside the nested objects
    const matchesSearch =
      order.id.toLowerCase().includes(searchLower) ||
      order.user?.name?.toLowerCase().includes(searchLower) ||
      order.user?.email?.toLowerCase().includes(searchLower) ||
      order.provider?.restaurantName?.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed
          </Badge>
        );
      case "COOKING":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">
            <ChefHat className="w-3 h-3 mr-1" /> Cooking
          </Badge>
        );
      case "ON_THE_WAY":
        return (
          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
            <Bike className="w-3 h-3 mr-1" /> On the Way
          </Badge>
        );
      case "DELIVERED":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
            <Home className="w-3 h-3 mr-1" /> Delivered
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
            <XCircle className="w-3 h-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search ID, Customer, or Restaurant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-50 dark:bg-slate-950/50"
          />
        </div>

        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-slate-50 dark:bg-slate-950/50">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="COOKING">Cooking</SelectItem>
              <SelectItem value="ON_THE_WAY">On the Way</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID & Date</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Restaurant</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <ClipboardList className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 dark:text-white">
                        #{order.id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString()} at{" "}
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>

                    {/* 3. Render nested customer data */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        {order.user?.name || "Unknown Customer"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {order.user?.email}
                      </p>
                    </td>

                    {/* 4. Render nested provider data */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        {order.provider?.restaurantName || "N/A"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <span
                          className="truncate max-w-[150px] inline-block"
                          title={order.address}
                        >
                          {order.address}
                        </span>
                      </p>
                    </td>

                    {/* 5. Render totalPrice */}
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#e11d48]">
                        ৳{order.totalPrice?.toFixed(2) || "0.00"}
                      </p>
                      <p className="text-[10px] uppercase text-slate-500 mt-0.5 tracking-wider font-semibold">
                        {order.paymentMethod?.replace(/_/g, " ")}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-right">
                      {getStatusBadge(order.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
