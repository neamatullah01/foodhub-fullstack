import { AllProviders } from "@/components/modules/provider/AllProviders";
import { ProviderFilters } from "@/components/modules/provider/ProviderFilters";
import { ProviderPagination } from "@/components/modules/provider/ProviderPagination";
import { getAllProviders } from "@/services/provider.service";

const ProvidersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const search = params?.search || "";
  const sortOrder = params?.sortOrder || "desc";
  const sortBy = params?.sortBy || "createdAt";
  const ratingStr = params?.rating;
  const rating = ratingStr && ratingStr !== "all" ? Number(ratingStr) : undefined;
  const page = Number(params?.page) || 1;
  const limit = 9;

  const query = {
    limit,
    page,
    search,
    sortOrder,
    sortBy,
    ...(rating ? { rating } : {}),
  };

  const response = await getAllProviders(query);

  const providers = response?.data?.data || [];
  const pagination = response?.data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const currentPage = pagination.page || 1;

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-[#FFC222] font-bold text-sm tracking-widest uppercase mb-2">
            Our Recommendations
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Cafes & Restaurants
          </h1>
        </div>

        <ProviderFilters
          currentParams={{ search, sortOrder, sortBy, rating: ratingStr || "all" }}
        />

        <AllProviders providers={providers} />

        {providers.length > 0 && (
          <ProviderPagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </section>
  );
};

export default ProvidersPage;
