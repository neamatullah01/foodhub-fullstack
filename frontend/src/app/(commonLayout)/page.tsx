import { CategoryCarousel } from "@/components/layout/CategoryCarousel";
import { FeaturedMenu } from "@/components/layout/FeaturedMenu";
import HeroCarousel from "@/components/layout/HeroCarousel";
import { categoryService } from "@/services/category.service";
import { mealService } from "@/services/meal.service";

export default async function Home() {
  const categories = await categoryService.getCategories();
  const { data } = await mealService.getAllMeal(8);
  return (
    <div>
      <div>
        <HeroCarousel></HeroCarousel>
        <CategoryCarousel categories={categories.data}></CategoryCarousel>
        <FeaturedMenu items={data.data || []}></FeaturedMenu>
      </div>
    </div>
  );
}
