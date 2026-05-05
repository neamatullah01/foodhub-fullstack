import { RestaurantProfileForm } from "@/components/modules/provider/RestaurantProfileForm";
import { getMyProviderProfile } from "@/services/provider.service";
import { redirect } from "next/navigation";
import { Store } from "lucide-react";

export default async function ProviderProfilePage() {
  const response = await getMyProviderProfile();
  
  if (!response.data || response.error) {
    // If provider profile doesn't exist or fails to load
    redirect("/dashboard");
  }

  const providerData = response.data?.data || response.data;

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="bg-[#FFC222]/20 p-2 rounded-xl text-[#e5ae1e]">
            <Store className="w-7 h-7" />
          </div>
          Restaurant Profile
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Manage your restaurant's public profile, contact details, and cover image.
        </p>
      </div>

      <RestaurantProfileForm provider={providerData} />
    </div>
  );
}
