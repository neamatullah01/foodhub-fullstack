import { ClipboardList, AlertCircle } from "lucide-react";
import { getSession } from "@/services/user.service";
import {
  getAllProviders,
  getProviderOrders,
} from "@/services/provider.service";
import { ProviderOrders } from "@/components/modules/provider/orders/ProviderOrders";

export default async function IncomingOrdersPage() {
  // 1. Get current user
  const session = await getSession();
  const userId = session.data?.user?.id;

  // 2. Find the matching Provider ID
  const allProvidersResponse = await getAllProviders();
  const allProviders = allProvidersResponse?.data?.data || [];
  const myProviderRecord = allProviders.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (provider: any) => provider.userId === userId,
  );

  if (!myProviderRecord) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 max-w-6xl mx-auto mt-8">
        <AlertCircle className="w-5 h-5" />
        <p>Provider profile not found. Please contact support.</p>
      </div>
    );
  }

  // 3. Fetch REAL Orders for this provider
  const ordersResponse = await getProviderOrders();
  // Safely extract the array of orders (adjust based on your exact Express response structure)
  const initialOrders = ordersResponse.data?.data || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="bg-[#FFC222]/20 p-2 rounded-xl text-[#e5ae1e]">
            <ClipboardList className="w-7 h-7" />
          </div>
          Incoming Orders
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Manage and update live customer orders.
        </p>
      </div>

      {/* Pass the server-fetched orders into the interactive client component */}
      <ProviderOrders initialOrders={initialOrders} />
    </div>
  );
}
