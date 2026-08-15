import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaUser } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      quote:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      name: "Awlad Hossin",
      role: "Senior Product Designer",
    },
    {
      id: 2,
      quote:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      name: "Rasel Ahamed",
      role: "CTO",
    },
    {
      id: 3,
      quote:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      name: "Nasir Uddin",
      role: "CEO, Retail Chain",
    },
    {
      id: 4,
      quote:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      name: "Awlad Hossin",
      role: "Senior Product Designer",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12">
      <div className="text-center max-w-xl mx-auto mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          What our customers are sayings
        </h2>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your
          body with ease!
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1.15}
          centeredSlides={true}
          spaceBetween={20}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ el: ".testimonial-pagination", clickable: true }}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          breakpoints={{
            768: { slidesPerView: 1.4 },
          }}
          className="pb-2"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              {({ isActive }) => (
                <div
                  className={`bg-white rounded-2xl p-6 md:p-8 mx-2 border transition-all duration-300 ${
                    isActive
                      ? "border-[#CAEB66] shadow-lg scale-100 opacity-100"
                      : "border-slate-100 scale-95 opacity-40"
                  }`}
                >
                  <FaQuoteLeft className="text-[#CAEB66] text-2xl md:text-3xl mb-4" />
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
                    {review.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0D3B3D] flex items-center justify-center text-white text-sm">
                      <FaUser />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {review.name}
                      </p>
                      <p className="text-xs text-slate-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button className="testimonial-prev w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all">
            <FaArrowLeft size={14} />
          </button>
          <div className="testimonial-pagination flex items-center gap-1.5 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-slate-300 [&_.swiper-pagination-bullet-active]:bg-[#CAEB66] [&_.swiper-pagination-bullet-active]:w-4" />
          <button className="testimonial-next w-9 h-9 rounded-full bg-[#CAEB66] flex items-center justify-center text-slate-900 hover:bg-[#b8e244] transition-all">
            <FaArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;