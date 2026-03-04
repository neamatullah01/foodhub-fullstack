import { ProviderHeader } from "@/components/modules/provider/ProviderHeader";
import { ProviderSidebar } from "@/components/modules/provider/ProviderSidebar";
import { getSession } from "@/services/user.service";

export default async function ProviderSlotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getSession();
  const user = data?.user;
  console.log(user);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <ProviderSidebar />

      <div className="flex-1 flex flex-col md:ml-64 min-w-0 transition-all duration-300">
        <ProviderHeader user={user} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
