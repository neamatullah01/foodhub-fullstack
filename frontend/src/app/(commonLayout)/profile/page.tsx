/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyOrders } from "@/services/order.service";
import { OrderCard } from "@/components/modules/orders/OrderCard";
import { ShoppingBag, User } from "lucide-react";

export default async function ProfilePage() {
  // Fetch orders on the server
  const { data: orders } = await getMyOrders();

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
        My Account
      </h1>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-8">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            My Orders
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile Details
          </TabsTrigger>
        </TabsList>

        {/* --- ORDERS TAB --- */}
        <TabsContent value="orders" className="space-y-6">
          {orders && orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No orders yet</h3>
              <p className="text-slate-500">
                Go ahead and order some delicious food!
              </p>
            </div>
          )}
        </TabsContent>

        {/* --- PROFILE TAB (Placeholder for next step) --- */}
        <TabsContent value="profile">
          <div className="p-6 border rounded-xl bg-white dark:bg-slate-900">
            <h3 className="text-lg font-bold">Profile Details</h3>
            <p className="text-slate-500">
              Manage your account information here.
            </p>
            {/* We will build this form next! */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
