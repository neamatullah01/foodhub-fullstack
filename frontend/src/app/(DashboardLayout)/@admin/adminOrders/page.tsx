import { AdminOrdersTable } from "@/components/modules/admin/orders/AdminOrdersTable";
import { ClipboardList } from "lucide-react";
import { getAllPlatformOrders } from "@/services/admin.service";

export default async function AdminOrdersPage() {
  const response = await getAllPlatformOrders();
  const initialOrders = response.data?.data || response.data || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="bg-[#FFC222]/20 p-2 rounded-xl text-[#e5ae1e]">
            <ClipboardList className="w-7 h-7" />
          </div>
          Platform Orders
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Monitor and track all orders placed across FoodHub.
        </p>
      </div>

      <AdminOrdersTable initialOrders={initialOrders} />
    </div>
  );
}
