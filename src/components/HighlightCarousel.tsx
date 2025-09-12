import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HighlightCarousel() {
  const banners = [
    { id: 1, image: "/banners/banner1.webp", alt: "Perfume Hayat" },
    { id: 2, image: "/banners/banner2.webp", alt: "Perfume Yara" },
    { id: 3, image: "/banners/banner3.webp", alt: "Perfume Ameerati" },
    { id: 4, image: "/banners/banner4.webp", alt: "Victoria Secret Rush" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="rounded-lg shadow-lg"
      >
        {banners.map((b) => (
          <SwiperSlide key={b.id}>
            <img
  src={b.image}
  alt={b.alt}
  className="w-full h-[450px] object-contain rounded-lg bg-white"
/>

          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
