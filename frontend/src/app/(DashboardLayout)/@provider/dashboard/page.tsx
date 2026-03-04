import {
  DollarSign,
  ShoppingBag,
  UtensilsCrossed,
  TrendingUp,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProviderDashboardOverview() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Provider Dashboard
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Welcome back! Here is what is happening with your restaurant today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Revenue"
          value="৳4,250"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          trend="+12% from yesterday"
        />
        <StatCard
          title="Active Orders"
          value="8"
          icon={<ShoppingBag className="w-6 h-6 text-blue-600" />}
          trend="3 need attention"
        />
        <StatCard
          title="Total Menu Items"
          value="24"
          icon={<UtensilsCrossed className="w-6 h-6 text-orange-600" />}
          trend="2 items sold out"
        />
        <StatCard
          title="Total Orders"
          value="142"
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          trend="This month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
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

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="font-bold">Order #4A91B</p>
                  <p className="text-sm text-slate-500">2 mins ago • 3 items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#e11d48]">৳650</p>
                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-md">
                  PENDING
                </span>
              </div>
            </div>
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
            <h2 className="text-xl font-bold mb-4">Top Selling</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  1. Beef Tehari
                </p>
                <p className="text-sm font-bold text-slate-500">42 orders</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  2. Chicken Biryani
                </p>
                <p className="text-sm font-bold text-slate-500">38 orders</p>
              </div>
            </div>
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-2">
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
