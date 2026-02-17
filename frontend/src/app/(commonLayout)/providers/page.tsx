import { AllProviders } from "@/components/modules/providers/AllProviders";
import { providerService } from "@/services/provider.service";

const ProvidersPage = async () => {
  const response = await providerService.getAllProviders();

  const providers = response?.data?.data || [];

  return (
    <main>
      <AllProviders providers={providers} />
    </main>
  );
};

export default ProvidersPage;
