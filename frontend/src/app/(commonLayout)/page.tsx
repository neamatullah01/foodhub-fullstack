import { CategoryCarousel } from "@/components/modules/homepage/CategoryCarousel";
import { FeaturedMenu } from "@/components/modules/homepage/FeaturedMenu";
import HeroCarousel from "@/components/modules/homepage/HeroCarousel";
import { ProviderList } from "@/components/modules/homepage/ProviderList";
import { WhyChooseUs } from "@/components/modules/homepage/WhyChooseUs";
import { categoryService } from "@/services/category.service";
import { mealService } from "@/services/meal.service";
import { providerService } from "@/services/provider.service";

export default async function Home() {
  const categories = await categoryService.getCategories();
  const { data } = await mealService.getAllMeal({ limit: 8 });
  const providers = await providerService.getAllProviders(5);
  return (
    <div>
      <div>
        <HeroCarousel></HeroCarousel>
        <CategoryCarousel categories={categories.data}></CategoryCarousel>
        <ProviderList providers={providers.data.data}></ProviderList>
        <WhyChooseUs></WhyChooseUs>
        <FeaturedMenu items={data.data || []}></FeaturedMenu>
      </div>
    </div>
  );
}
