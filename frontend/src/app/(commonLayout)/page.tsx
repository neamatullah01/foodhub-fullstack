import Carousel from "@/components/layout/Carousel";

export default function Home() {
  const slides = [
    {
      src: "https://img.pikbest.com/wp/202413/stylish-cool-food-burger-restaurant-web-banner_6022760.jpg!bw700",
      alt: "Slide 1",
    },
    {
      src: "https://t3.ftcdn.net/jpg/02/92/08/20/360_F_292082032_oxXr6P0OARzxfrjHM5R8QJ4BchsBfxFK.jpg",
      alt: "Slide 2",
    },
    {
      src: "https://static.vecteezy.com/system/resources/previews/065/315/627/non_2x/food-promotional-social-media-banner-editable-template-chicken-biryani-free-psd.png",
      alt: "Slide 3",
    },
  ];
  return (
    <div>
      <div>
        <Carousel items={slides}></Carousel>
      </div>
    </div>
  );
}
