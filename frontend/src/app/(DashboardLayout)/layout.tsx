import { getSession } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function DashboardRootLayout({
  children, // We won't actually use this, but Next.js requires it
  admin, // The @admin parallel slot
  provider, // The @provider parallel slot
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
}>) {
  // 1. Fetch user session
  const { data } = await getSession();
  const user = data?.user;
  const role = user?.role?.toUpperCase();

  // 2. Unauthenticated users get kicked to login
  if (!user) {
    redirect("/login");
  }

  // 3. Serve ONLY the Admin slot if they are an admin
  if (role === "ADMIN") {
    return <>{admin}</>;
  }

  // 4. Serve ONLY the Provider slot if they are a provider
  if (role === "PROVIDER") {
    return <>{provider}</>;
  }

  // 5. Normal customers shouldn't be here, send them to the homepage
  redirect("/");
}
