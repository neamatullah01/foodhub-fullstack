import { ProviderProfile } from "@/components/modules/providers/ProviderProfile";
import { providerService } from "@/services/provider.service";
import { notFound } from "next/navigation";

const ProviderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) => {
  const resolvedParams = await params;
  const providerId = resolvedParams.id;

  const response = await providerService.getProviderById(providerId);
  const provider = response?.data;

  if (!provider) {
    notFound();
  }

  return (
    <main>
      <ProviderProfile provider={provider} />
    </main>
  );
};

export default ProviderDetailsPage;
