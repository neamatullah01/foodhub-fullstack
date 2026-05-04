import { CategoryCarousel } from "@/components/modules/homepage/CategoryCarousel";
import { FeaturedMenu } from "@/components/modules/homepage/FeaturedMenu";
import HeroCarousel from "@/components/modules/homepage/HeroCarousel";
import { ProviderList } from "@/components/modules/homepage/ProviderList";
import { WhyChooseUs } from "@/components/modules/homepage/WhyChooseUs";
import { HowItWorks } from "@/components/modules/homepage/HowItWorks";
import { Testimonials } from "@/components/modules/homepage/Testimonials";
import { Newsletter } from "@/components/modules/homepage/Newsletter";
import { getAllCategories } from "@/services/category.service";
import { mealService } from "@/services/meal.service";
import { getAllProviders } from "@/services/provider.service";

export default async function Home() {
  const categories = await getAllCategories();
  const { data } = await mealService.getAllMeal({ limit: 8 });
  const providers = await getAllProviders(5);

  return (
    <div className="overflow-hidden">
      {/* 
        Higher z-index ensures the Hero's bottom wave overlaps the section below perfectly
      */}
      <div className="relative z-20">
        <HeroCarousel />
      </div>

      <div className="flex flex-col relative z-10">
        <CategoryCarousel categories={categories.data} />
        <ProviderList providers={providers.data.data} />
        <WhyChooseUs />
        <FeaturedMenu items={data.data || []} />
        <HowItWorks />
        <Testimonials />
        <Newsletter />
      </div>
    </div>
  );
}
