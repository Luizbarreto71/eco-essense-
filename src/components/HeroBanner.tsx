import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroBanner() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      className="w-full h-[400px] rounded-lg overflow-hidden"
    >
      <SwiperSlide>
        <img src="/banners/banner1.jpg" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banners/banner2.jpg" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banners/banner3.jpg" className="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  );
}
