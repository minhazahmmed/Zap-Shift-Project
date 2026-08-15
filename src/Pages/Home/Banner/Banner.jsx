import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { FiArrowUpRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import ImgBanner1 from "../../../assets/banner/banner1.png";
import ImgBanner2 from "../../../assets/banner/banner2.png";
import ImgBanner3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  const slides = [
    { id: 1, img: ImgBanner1, alt: "ZapShift Banner 1" },
    { id: 2, img: ImgBanner2, alt: "ZapShift Banner 3" },
    { id: 3, img: ImgBanner3, alt: "ZapShift Banner 3" },
  ];

  return (
    <div className=" rounded-2xl md:rounded-3xl overflow-hidden  my-4 ">
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full">
              <img
                src={slide.img}
                alt={slide.alt}
                className="w-full h-auto min-h-47.5 max-h-125 "
              />

              <div className="absolute bottom-6 left-2 sm:bottom-8 sm:left-10 md:bottom-10 md:left-16 z-10 flex flex-row items-center justify-start gap-1.5 sm:gap-4">
                <Link
                  to="/track-parcel"
                  className="flex items-center justify-center gap-1 sm:gap-2 bg-[#CAEB66] hover:bg-[#b8e244] text-slate-900 font-bold px-2 py-1 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-sm md:text-base transition-all shadow-sm whitespace-nowrap"
                >
                  <span>Track Your Parcel</span>
                  <span className="bg-slate-900 text-white p-0.5 sm:p-1 rounded-full text-[10px] sm:text-sm">
                    <FiArrowUpRight />
                  </span>
                </Link>

                <Link
                  to="/be-a-rider"
                  className="flex items-center justify-center bg-white hover:bg-slate-100 text-slate-800 font-semibold px-2 py-1 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-sm md:text-base border border-slate-200 transition-all shadow-sm whitespace-nowrap"
                >
                  Be A Rider
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;