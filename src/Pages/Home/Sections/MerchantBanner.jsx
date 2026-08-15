import { Link } from "react-router";
import { FaBox, FaLocationDot } from "react-icons/fa6";

const MerchantBanner = () => {
  return (
    <section className="w-full my-8 md:my-12">
      <div className="relative overflow-hidden bg-[#0D3B3D] rounded-2xl md:rounded-3xl px-6 sm:px-10 md:px-16 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* decorative glow */}
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-[#CAEB66]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center md:text-left max-w-xl w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 w-full">
            <Link
              to="/become-merchant"
              className="w-full sm:w-auto text-center bg-[#CAEB66] hover:bg-[#b8e244] text-slate-900 font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base transition-all"
            >
              Become a Merchant
            </Link>
            <Link
              to="/earn-with-zapshift"
              className="w-full sm:w-auto text-center border border-slate-500 hover:border-[#CAEB66] text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base transition-all"
            >
              Earn with ZapShift Courier
            </Link>
          </div>
        </div>

        <div className="relative z-10 shrink-0 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 flex items-center justify-center">
          <FaLocationDot className="absolute -top-2 right-8 text-[#CAEB66] text-3xl sm:text-4xl animate-bounce" />
          <FaBox className="text-slate-500/40 text-[9rem] sm:text-[11rem] md:text-[13rem]" />
        </div>
      </div>
    </section>
  );
};

export default MerchantBanner;