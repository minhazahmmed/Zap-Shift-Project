import { FaLocationDot, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa6";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaLocationDot />,
      title: "Booking Pick & Drop",
      desc: "Easily schedule doorstep parcel pickup and delivery through our hassle-free web platform.",
    },
    {
      id: 2,
      icon: <FaMoneyBillWave />,
      title: "Cash On Delivery",
      desc: "Collect payment securely upon delivery with guaranteed fast payouts straight to your account.",
    },
    {
      id: 3,
      icon: <FaWarehouse />,
      title: "Delivery Hub",
      desc: "Smart sorting center and localized hubs ensuring accurate and fastest routing for parcels.",
    },
    {
      id: 4,
      icon: <FaBuilding />,
      title: "Booking SME & Corporate",
      desc: "Tailored bulk logistics solutions and dedicated dashboard management for enterprise clients.",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8">
        How it Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#CAEB66]/30 flex items-center justify-center text-[#0D3B3D] text-lg md:text-xl mb-4">
              {step.icon}
            </div>
            <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">
              {step.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;