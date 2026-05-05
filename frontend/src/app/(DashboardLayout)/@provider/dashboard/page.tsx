import {
  DollarSign,
  ShoppingBag,
  UtensilsCrossed,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProviderDashboardStats } from "@/services/provider.service";
import { DashboardChart } from "@/components/modules/dashboard/DashboardChart";

import { getSession } from "@/services/user.service";

export default async function ProviderDashboardOverview() {
  const { data: session } = await getSession();
  if (session?.user?.role !== "PROVIDER") return null;

  const { data: statsResponse, error } = await getProviderDashboardStats();
  if (error || !statsResponse) {
    return (
      <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const { overview, chartData, recentOrders } = statsResponse;

  // Find needs attention orders (PENDING)
  const needsAttention =
    recentOrders?.filter((order: any) => order.status === "PENDING") || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Provider Dashboard
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Welcome back! Here is what is happening with your restaurant.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`৳${overview.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          trend="Overall earnings"
        />
        <StatCard
          title="Pending Orders"
          value={overview.pendingOrders.toString()}
          icon={<ShoppingBag className="w-6 h-6 text-orange-600" />}
          trend="Needs attention"
        />
        <StatCard
          title="Total Meals"
          value={overview.totalMeals.toString()}
          icon={<UtensilsCrossed className="w-6 h-6 text-purple-600" />}
          trend="In your menu"
        />
        <StatCard
          title="Total Orders"
          value={overview.totalOrders.toString()}
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          trend="All time"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {chartData && chartData.length > 0 ? (
            <DashboardChart data={chartData} />
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center justify-center h-[350px]">
              <p className="text-slate-500">
                No chart data available for the last 30 days.
              </p>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Needs Attention</h2>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-[#e5ae1e] hover:text-[#FFC222]"
              >
                <Link href="/incomingOrders">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {needsAttention.length > 0 ? (
              <div className="space-y-4">
                {needsAttention.slice(0, 5).map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="font-bold">
                          Order #{order.id.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-sm text-slate-500">
                          {order.orderItems?.length || 0} items •{" "}
                          {order.user?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#e11d48]">
                        ৳{order.totalPrice}
                      </p>
                      <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-md">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-3 opacity-50" />
                <p className="text-slate-600 font-medium">All caught up!</p>
                <p className="text-sm text-slate-400 mt-1">
                  No pending orders need your attention right now.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="w-full bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold"
              >
                <Link href="/menu">Add New Meal</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-slate-200 dark:border-slate-700"
              >
                <Link href="/menu">Manage Menu</Link>
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
            {recentOrders && recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.slice(0, 5).map((order: any) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                            : order.status === "CANCELLED"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-600"
                              : "bg-orange-100 dark:bg-orange-900/30 text-orange-600"
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">
                          {order.user?.name || "Customer"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.orderItems?.[0]?.meal?.name || "Item"}
                          {order.orderItems?.length > 1
                            ? ` +${order.orderItems.length - 1} more`
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white">
                        ৳{order.totalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4 text-sm">
                No orders yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-2 transition-transform hover:-translate-y-1 duration-300">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </h3>
      <p className="text-xs text-slate-400 mt-1">{trend}</p>
    </div>
  );
}
