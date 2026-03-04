import { MenuManager } from "@/components/modules/provider/menu/MenuManager";
import { getAllCategories } from "@/services/category.service";
import { getAllProviders } from "@/services/provider.service";
import { getSession } from "@/services/user.service";
import { Provider } from "@/types/provider.types";
import { UtensilsCrossed, AlertCircle } from "lucide-react";

export default async function ProviderMenuPage() {
  const session = await getSession();
  const userId = session.data?.user?.id;
  const categories = await getAllCategories();

  const allProvidersResponse = await getAllProviders();
  const allProviders = allProvidersResponse?.data?.data || [];

  const myProviderRecord = allProviders.find(
    (provider: Provider) => provider.userId === userId,
  );

  if (!myProviderRecord) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-5 h-5" />
        <p>Provider profile not found. Please contact support.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="bg-[#FFC222]/20 p-2 rounded-xl text-[#e5ae1e]">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          Manage Menu
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Add new dishes, update prices, and control availability.
        </p>
      </div>
      <MenuManager
        providerData={myProviderRecord}
        categories={categories.data}
      />
    </div>
  );
}
