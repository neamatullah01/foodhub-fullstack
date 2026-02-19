/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyOrders } from "@/services/order.service";
import { OrderCard } from "@/components/modules/orders/OrderCard";
import { Bike, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AutoRefresh } from "@/components/modules/orders/AutoRefresh";

export default async function TrackOrdersPage() {
  const { data: orders, error } = await getMyOrders();

  const sortedOrders = orders?.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <AutoRefresh intervalMs={10000} />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-3">
            <div className="bg-[#FFC222]/20 p-2 rounded-xl text-[#e5ae1e]">
              <Bike className="w-8 h-8" />
            </div>
            Track Orders
          </h1>
          <p className="text-slate-500 mt-3 text-lg">
            Monitor the live status of your food deliveries.
          </p>
        </div>

        {error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-100">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Failed to load your tracking info. Please refresh the page.</p>
          </div>
        ) : sortedOrders && sortedOrders.length > 0 ? (
          <div className="flex flex-col gap-6">
            {sortedOrders.map((order: any) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
            <div className="bg-slate-50 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bike className="w-12 h-12 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No active orders
            </h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">
              You don&apos;t have any food on the way right now. Let&apos;s fix
              that!
            </p>
            <Button
              asChild
              className="bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold px-10 py-6 text-lg rounded-xl"
            >
              <Link href="/meals">Find a Meal</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
