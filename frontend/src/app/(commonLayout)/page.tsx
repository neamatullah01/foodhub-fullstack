import FoodCategories from "@/components/layout/FoodCategories";
import HeroCarousel from "@/components/layout/HeroCarousel";

export default function Home() {
  return (
    <div>
      <div>
        <HeroCarousel></HeroCarousel>
        <FoodCategories></FoodCategories>
      </div>
    </div>
  );
}
