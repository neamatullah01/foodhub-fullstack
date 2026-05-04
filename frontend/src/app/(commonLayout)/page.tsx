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
import { ScrollAnimate } from "@/components/ui/ScrollAnimate"; // Import the wrapper

export default async function Home() {
  const categories = await getAllCategories();
  const { data } = await mealService.getAllMeal({ limit: 8 });
  const providers = await getAllProviders(5);

  return (
    <div className="overflow-hidden">
      <HeroCarousel />

      <div className="flex flex-col">
        <ScrollAnimate direction="up">
          <CategoryCarousel categories={categories.data} />
        </ScrollAnimate>

        <ScrollAnimate direction="right">
          <ProviderList providers={providers.data.data} />
        </ScrollAnimate>

        <ScrollAnimate direction="up">
          <WhyChooseUs />
        </ScrollAnimate>

        <ScrollAnimate direction="up" delay={0.1}>
          <FeaturedMenu items={data.data || []} />
        </ScrollAnimate>

        <ScrollAnimate direction="up">
          <HowItWorks />
        </ScrollAnimate>

        <ScrollAnimate direction="left">
          <Testimonials />
        </ScrollAnimate>

        <ScrollAnimate direction="up">
          <Newsletter />
        </ScrollAnimate>
      </div>
    </div>
  );
}
