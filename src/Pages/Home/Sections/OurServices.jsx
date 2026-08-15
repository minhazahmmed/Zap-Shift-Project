import {
  FaTruckFast,
  FaGlobe,
  FaBoxesPacking,
  FaMoneyBillWave,
  FaHandshake,
  FaRotateLeft,
} from "react-icons/fa6";

const OurServices = () => {
  const services = [
    {
      id: 1,
      icon: <FaTruckFast />,
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      id: 2,
      icon: <FaGlobe />,
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      id: 3,
      icon: <FaBoxesPacking />,
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      id: 4,
      icon: <FaMoneyBillWave />,
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      id: 5,
      icon: <FaHandshake />,
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      id: 6,
      icon: <FaRotateLeft />,
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <section className="w-full bg-[#0D3B3D] rounded-2xl md:rounded-3xl py-10 md:py-16 px-4 sm:px-8 md:px-12 my-8 md:my-12">
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Our Services
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and
          zero hassle. From personal packages to business shipments — we
          deliver on time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="group bg-white hover:bg-[#CAEB66] rounded-2xl p-6 md:p-7 text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl mx-auto mb-4 bg-[#CAEB66]/30 text-[#0D3B3D] group-hover:bg-white/60 transition-all duration-300">
              {service.icon}
            </div>
            <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">
              {service.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;