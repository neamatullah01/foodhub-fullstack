"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2000&auto=format&fit=crop",
    subtitle: "Cheesy & Crispy",
    title: "Italian Pizza",
    description:
      "Authentic wood-fired pizza topped with fresh basil, mozzarella, and secret tomato sauce.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2000&auto=format&fit=crop",
    subtitle: "Juicy & Massive",
    title: "Monster Burger",
    description:
      "Double beef patty, cheddar cheese, fresh lettuce, and our signature smoky sauce.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2000&auto=format&fit=crop",
    subtitle: "Spicy & Aromatic",
    title: "Chicken Biryani",
    description:
      "Traditional Dum Biryani cooked with premium basmati rice and exotic spices.",
  },
];

export default function HeroCarousel() {
  return (
    // Note: No overflow-hidden here so the wave can bleed down naturally!
    <section className="relative w-full h-[85vh] min-h-[500px] bg-white dark:bg-slate-950">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        simulateTouch={false}
        touchStartPreventDefault={false}
        className="w-full h-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* The overflow-hidden goes here on the slide itself */}
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute inset-0 animate-ken-burns">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 dark:to-[#0f0f0f]/90 pointer-events-none" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-20 pb-16 md:pb-26">
                <span className="text-2xl md:text-4xl font-bold text-[#7dbd21] mb-3 md:mb-4 drop-shadow-md -rotate-6">
                  {slide.subtitle}
                </span>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 md:mb-6 drop-shadow-xl uppercase tracking-tighter">
                  {slide.title}
                </h2>

                <p className="max-w-2xl text-base md:text-lg lg:text-xl mb-8 md:mb-10 text-gray-200 font-medium drop-shadow-md">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 z-50">
                  <Link
                    href="/providers"
                    className="inline-block text-center swiper-no-swiping bg-[#e63e3e] hover:bg-[#c92d2d] text-white px-10 py-4 rounded-full font-bold uppercase tracking-wide transition-all transform hover:scale-105 shadow-xl cursor-pointer"
                  >
                    Order Now
                  </Link>

                  <Link
                    href="/meals"
                    className="inline-block text-center swiper-no-swiping bg-transparent border-2 border-white hover:bg-white hover:text-[#e63e3e] text-white px-10 py-4 rounded-full font-bold uppercase tracking-wide transition-all cursor-pointer"
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* The Bulletproof Wave Wrapper */}
      <div className="absolute -bottom-[4px] left-0 w-full z-30 leading-none pointer-events-none">
        <svg
          className="block w-[calc(100%+2px)] h-[44px] md:h-[84px] lg:h-[124px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white dark:fill-slate-950 md:stroke-white md:dark:stroke-slate-950 md:stroke-[3px] lg:stroke-0"
          />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.15);
          }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-out infinite alternate;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          z-index: 60;
          pointer-events: auto;
        }

        .swiper-pagination {
          z-index: 60;
        }
      `}</style>
    </section>
  );
}
