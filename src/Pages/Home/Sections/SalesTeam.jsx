import { useState } from "react";

import CasioLogo from "../../../assets/brands/casio.png";
import AmazonLogo from "../../../assets/brands/amazon.png";
import MoonstarLogo from "../../../assets/brands/moonstar.png";
import StarPlusLogo from "../../../assets/brands/star.png";
import StartPeopleLogo from "../../../assets/brands/start_people.png";
import RandstadLogo from "../../../assets/brands/randstad.png";

const SalesTeam = () => {
  const [isPaused, setIsPaused] = useState(false);

  const brands = [
    { id: 1, name: "Casio", logo: CasioLogo },
    { id: 2, name: "Amazon", logo: AmazonLogo },
    { id: 3, name: "Moonstar", logo: MoonstarLogo },
    { id: 4, name: "Star Plus", logo: StarPlusLogo },
    { id: 5, name: "Start People", logo: StartPeopleLogo },
    { id: 6, name: "Randstad", logo: RandstadLogo },
  ];


  const marqueeList = [...brands, ...brands];

  return (
    <section className="w-full py-8 md:py-12 overflow-hidden">
      <h2 className="text-center text-lg md:text-2xl font-semibold mb-8 md:mb-10 text-secondary">
        We've helped thousands of sales teams
      </h2>

    
      <div
        className="w-full overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex w-max items-center gap-12 sm:gap-16 md:gap-20 animate-marquee"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {marqueeList.map((brand, index) => (
            <img
              key={`${brand.id}-${index}`}
              src={brand.logo}
              alt={brand.name}
              className="h-5 sm:h-6 md:h-7 w-auto object-contain shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Dotted Divider */}
      <div className="border-t-2 border-dashed border-slate-300 mt-10 md:mt-14" />
    </section>
  );
};

export default SalesTeam;