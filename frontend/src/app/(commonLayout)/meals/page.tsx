import { AllMeals } from "@/components/modules/meals/AllMeals";
import { MealFilters } from "@/components/modules/meals/MealFilters";
import { MealsPagination } from "@/components/modules/meals/MealsPagination";
import { getAllCategories } from "@/services/category.service";
import { mealService } from "@/services/meal.service";

const MealsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const search = params?.search || "";
  const categoryId = params?.categoryId || "all";
  const sortOrder = params?.sortOrder || "asc";

  const page = Number(params?.page) || 1;
  const limit = 8;

  const query = {
    limit,
    page,
    search,
    sortOrder,
    sortBy: params?.sortBy || "createdAt",
    categoryId: categoryId === "all" ? "" : categoryId,
  };

  const { data } = await mealService.getAllMeal(query);
  const categories = await getAllCategories();

  const mealsList = data?.data || [];

  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const currentPage = pagination.page || 1;

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Explore Meals
          </h1>
          <p className="text-slate-500">
            Find the best food from local providers.
          </p>
        </div>

        <MealFilters
          currentParams={{ search, categoryId, sortOrder, sortBy: "price" }}
          categories={categories.data}
        />

        <AllMeals meals={mealsList} />

        {mealsList.length > 0 && (
          <MealsPagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </section>
  );
};

export default MealsPage;
