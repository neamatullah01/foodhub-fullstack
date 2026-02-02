"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

interface CarouselItem {
  src: string;
  alt?: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const settings: SwiperOptions = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 24,
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    autoplay: { delay: 3000 },
    loop: true,
  };

  return (
    <Swiper {...settings} className="w-11/12 mt-5 rounded-xl overflow-hidden">
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <Image
            src={item.src}
            alt={item.alt ?? `slide-${index}`}
            width={800} // precise width in pixels
            height={900}
            className="w-full h-[80vh] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
