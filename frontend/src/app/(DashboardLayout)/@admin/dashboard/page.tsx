import {
  ShieldCheck,
  Users,
  ClipboardList,
  TrendingUp,
  Store,
  Clock,
} from "lucide-react";
import { getAdminDashboardStats } from "@/services/admin.service";
import { DashboardChart } from "@/components/modules/dashboard/DashboardChart";

import { getSession } from "@/services/user.service";

export default async function AdminDashboardPage() {
  const { data: session } = await getSession();
  if (session?.user?.role !== "ADMIN") return null;

  const { data: statsResponse, error } = await getAdminDashboardStats();

  if (error || !statsResponse) {
    return (
      <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const { overview, chartData, recentOrders } = statsResponse;


  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#e5ae1e]" />
          Admin Control Center
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Platform-wide system overview and analytics.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={overview.totalUsers.toLocaleString()}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          bgColor="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard
          title="Total Providers"
          value={overview.totalProviders.toLocaleString()}
          icon={<Store className="w-6 h-6 text-purple-600" />}
          bgColor="bg-purple-100 dark:bg-purple-900/30"
        />
        <StatCard
          title="Total Orders"
          value={overview.totalOrders.toLocaleString()}
          icon={<ClipboardList className="w-6 h-6 text-orange-600" />}
          bgColor="bg-orange-100 dark:bg-orange-900/30"
        />
        <StatCard
          title="Platform Revenue"
          value={`৳${overview.totalRevenue.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          bgColor="bg-green-100 dark:bg-green-900/30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {chartData && chartData.length > 0 ? (
            <DashboardChart data={chartData} />
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center justify-center h-[350px]">
              <p className="text-slate-500">
                No chart data available for the last 30 days.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
            {recentOrders && recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <Clock className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">
                          {order.user?.name || "Unknown User"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.provider?.restaurantName || "Unknown Provider"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#e11d48]">
                        ৳{order.totalPrice}
                      </p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 text-green-700"
                            : order.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4">
                No recent orders found.
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
  bgColor,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-3 transition-transform hover:-translate-y-1 duration-300">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`p-2 rounded-xl ${bgColor}`}>{icon}</div>
      </div>
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
}
