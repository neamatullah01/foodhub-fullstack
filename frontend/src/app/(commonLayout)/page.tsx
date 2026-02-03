import { CategoryCarousel } from "@/components/layout/CategoryCarousel";
import HeroCarousel from "@/components/layout/HeroCarousel";
import { categoryService } from "@/services/category.service";

export default async function Home() {
  const categories = await categoryService.getCategories();
  return (
    <div>
      <div>
        <HeroCarousel></HeroCarousel>
        <CategoryCarousel categories={categories.data}></CategoryCarousel>
      </div>
    </div>
  );
}
