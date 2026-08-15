import { useState } from "react";
import { Link } from "react-router";
import { FiChevronDown, FiArrowUpRight } from "react-icons/fi";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      id: 2,
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, our products are designed to fit a wide range of ages and body types with adjustable straps and sizing options for maximum comfort.",
    },
    {
      id: 3,
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Yes, regular use combined with good habits can gradually improve posture and reduce discomfort caused by poor alignment.",
    },
    {
      id: 4,
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Select models come with smart vibration alerts that gently remind you to correct your posture throughout the day.",
    },
    {
      id: 5,
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can subscribe with your email on the product page and we'll notify you as soon as it's back in stock.",
    },
  ];

  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-8 md:py-12">
      <div className="text-center max-w-xl mx-auto mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your
          body with ease!
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-3 md:gap-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-[#CAEB66]/10 border-[#CAEB66]"
                  : "bg-white border-slate-200"
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left"
              >
                <span className="text-sm sm:text-base font-medium text-slate-800">
                  {faq.question}
                </span>
                <FiChevronDown
                  className={`shrink-0 text-slate-600 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8 md:mt-10">
        <Link
          to="/faq"
          className="flex items-center gap-2 bg-[#CAEB66] hover:bg-[#b8e244] text-slate-900 font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base transition-all"
        >
          <span>See More FAQ's</span>
          <span className="bg-slate-900 text-white p-1 rounded-full text-xs">
            <FiArrowUpRight />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default FAQ;