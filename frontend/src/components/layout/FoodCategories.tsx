"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

const CATEGORIES = [
  {
    id: 1,
    name: "Muscle Gain Menu",
    calories: "1400-2000 kcal",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop",
    accent: "border-[#e63e3e]",
    textAccent: "group-hover:text-[#e63e3e]",
  },
  {
    id: 2,
    name: "Balanced Menu",
    calories: "1200-1400 kcal",
    image:
      "https://images.unsplash.com/photo-1594041680527-12f45a723e9e?q=80&w=800&auto=format&fit=crop",
    accent: "border-[#f39c12]",
    textAccent: "group-hover:text-[#f39c12]",
  },
  {
    id: 3,
    name: "Vegetarian Menu",
    calories: "700-1000 kcal",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    accent: "border-[#7dbd21]",
    textAccent: "group-hover:text-[#7dbd21]",
  },
  {
    id: 4,
    name: "Keto Menu",
    calories: "1500-1800 kcal",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    accent: "border-[#8e44ad]",
    textAccent: "group-hover:text-[#8e44ad]",
  },
];

export default function FoodCategories() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="pb-10 px-4 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="text-center mb-16 relative z-10">
        <h3 className="text-[#e63e3e] text-2xl font-handwriting italic mb-2">
          Choose your flavor
        </h3>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white drop-shadow-sm transition-colors duration-300">
          Food Categories
        </h2>
        <div className="w-24 h-1 bg-[#e63e3e] mx-auto mt-4 rounded-full" />
      </div>

      <div className="max-w-375 mx-auto relative group">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden md:flex items-center justify-center w-14 h-14 bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-white rounded-full shadow-xl absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6 z-30 hover:bg-[#e63e3e] dark:hover:bg-[#e63e3e] hover:text-white transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden md:flex items-center justify-center w-14 h-14 bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-white rounded-full shadow-xl absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6 z-30 hover:bg-[#e63e3e] dark:hover:bg-[#e63e3e] hover:text-white transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 group-hover:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>

        {/* --- SWIPER --- */}
        <div className="w-full px-4 md:px-16">
          <Swiper
            modules={[Navigation, Autoplay]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="category-swiper pt-10 pb-12 "
          >
            {CATEGORIES.map((cat) => (
              <SwiperSlide key={cat.id}>
                <div
                  className={`
                    bg-yellow-50 rounded-[2rem] p-6 flex items-center h-[220px] relative overflow-hidden cursor-pointer
                    border-b-4 ${cat.accent} border-t border-l border-r border-yellow-50 dark:border-gray-800
                    shadow-lg hover:shadow-2xl hover:shadow-gray-300/50 dark:hover:shadow-white/5
                    transform transition-all duration-300 hover:-translate-y-2 group
                  `}
                >
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden shadow-lg border-[5px] border-white z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="ml-32 md:ml-36 flex flex-col items-start w-full pl-4 z-20">
                    <h3
                      className={`text-xl font-bold text-gray-800 ${cat.textAccent} transition-colors leading-tight mb-1`}
                    >
                      {cat.name}
                    </h3>
                    <p className="text-gray-500 text-sm font-bold mb-6">
                      {cat.calories}
                    </p>

                    <div className="flex items-center gap-4">
                      <button className="bg-[#e63e3e] text-white text-xs font-bold uppercase py-2.5 px-6 rounded-full shadow-md hover:bg-[#c92d2d] transition-all tracking-wide hover:shadow-lg">
                        Get more
                      </button>
                      <span className="text-gray-400 text-xs font-bold hover:text-black transition-colors">
                        Read more
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
