import { AllProviders } from "@/components/modules/provider/AllProviders";
import { getAllProviders } from "@/services/provider.service";

const ProvidersPage = async () => {
  const response = await getAllProviders();

  const providers = response?.data?.data || [];

  return (
    <main>
      <AllProviders providers={providers} />
    </main>
  );
};

export default ProvidersPage;
