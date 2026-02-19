import { authClient } from "@/lib/auth-client";
import { ProfileForm } from "@/components/modules/profile/ProfileForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Manage Profile
          </h1>
          <p className="text-slate-500 mt-2">
            Update your personal information and delivery details.
          </p>
        </div>

        <ProfileForm user={session.data.user} />
      </div>
    </div>
  );
}
