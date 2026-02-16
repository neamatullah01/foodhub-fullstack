import { AllMeals } from "@/components/modules/meals/AllMeals";
import { MealFilters } from "@/components/modules/meals/MealFilters";
import { categoryService } from "@/services/category.service";
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

  const query = {
    limit: 10,
    search,
    sortOrder,
    sortBy: params?.sortBy || "createdAt",
    categoryId: categoryId === "all" ? "" : categoryId,
  };

  const { data } = await mealService.getAllMeal(query);
  const categories = await categoryService.getCategories();
  const mealsList = data?.data || [];

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
      </div>
    </section>
  );
};

export default MealsPage;
