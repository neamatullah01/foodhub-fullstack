// Example imports (you will create these components next)
// import { AdminHeader } from "@/components/modules/admin/AdminHeader";
// import { AdminSidebar } from "@/components/modules/admin/AdminSidebar";
import { getSession } from "@/services/user.service";

export default async function AdminSlotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getSession();
  const user = data?.user;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* <AdminSidebar /> */}

      <div className="flex-1 flex flex-col md:ml-64 min-w-0 transition-all duration-300">
        {/* <AdminHeader user={user} /> */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
