import { ProviderHeader } from "@/components/modules/providers/ProviderHeader";
import { ProviderSidebar } from "@/components/modules/providers/ProviderSidebar";
import { getSession } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Fetch the session
  const { data } = await getSession();

  // 2. Extract the user object (Better Auth usually nests it inside data.user)
  // If your custom getSession returns the user directly, just use `const user = data;`
  const user = data?.user;

  // 3. Kick out unauthenticated users or anyone who isn't a PROVIDER
  if (!user || user.role?.toUpperCase() !== "PROVIDER") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar (Hidden on Mobile, Fixed on Desktop) */}
      <ProviderSidebar />

      {/* Main Content Area (Pushed right on Desktop) */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0 transition-all duration-300">
        {/* 4. Pass the extracted 'user' variable here! */}
        <ProviderHeader user={user} />

        {/* Page Content injected here */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
