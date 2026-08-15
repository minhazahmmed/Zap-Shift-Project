import { FaLocationCrosshairs, FaShieldHalved, FaHeadset } from "react-icons/fa6";

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: <FaLocationCrosshairs />,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      id: 2,
      icon: <FaShieldHalved />,
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      id: 3,
      icon: <FaHeadset />,
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 flex flex-col gap-4 md:gap-6">
      {features.map((feature, idx) => (
        <div
          key={feature.id}
          className={`flex flex-col sm:flex-row items-center gap-5 sm:gap-8 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 ${
            idx === 0 ? "border-b-2 sm:border-b-0" : ""
          }`}
        >
          <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#CAEB66]/20 flex items-center justify-center text-[#0D3B3D] text-4xl md:text-5xl">
            {feature.icon}
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureCards;