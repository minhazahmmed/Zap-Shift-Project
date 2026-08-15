import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-[#CAEB66]" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-[#CAEB66]" />);
    }
    const remaining = 5 - Math.ceil(rating);
    for (let i = 0; i < remaining; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-slate-300" />);
    }
    return stars;
  };

  return (
    <section className="w-full py-8 md:py-12 overflow-hidden">
      <div className="text-center max-w-xl mx-auto mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          What our customers are sayings
        </h2>
        <p className="text-slate-700 text-sm md:text-base leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your
          body with ease!
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: ".testimonial-pagination",
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="testimonialSwiper pb-4!"
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review.id}
            className="w-70! sm:w-85! md:w-95!"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-md h-full">
              <FaQuoteLeft className="text-[#CAEB66] text-2xl md:text-3xl mb-4" />

              <p className="text-sm md:text-base leading-relaxed mb-4 min-h-20">
                {review.review}
              </p>

              <div className="flex items-center gap-1 mb-4 text-sm">
                {renderStars(review.ratings)}
                <span className=" text-xs ml-1">
                  ({review.ratings})
                </span>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={review.user_photoURL}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">
                    {review.userName}
                  </p>
                  <p className="text-xs ">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="testimonial-pagination flex items-center justify-center gap-1.5 mt-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-slate-300 [&_.swiper-pagination-bullet]:opacity-100! [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:bg-[#CAEB66] [&_.swiper-pagination-bullet-active]:w-4" />
    </section>
  );
};

export default Testimonials;