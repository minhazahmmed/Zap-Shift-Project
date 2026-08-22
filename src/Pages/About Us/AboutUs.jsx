import { useState } from "react";

const AboutUs = () => {
  const tabs = [
    {
      id: "story",
      label: "Story",
      content: [
        "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.",
        "From a small team with a handful of couriers, we've grown into a nationwide logistics network covering 64 districts. Every step of that journey has been guided by one goal: making sure your parcel arrives exactly when and where it should.",
        "Today, ZapShift stands as a symbol of trust for both individual customers and businesses who rely on us for their everyday delivery needs, and we're just getting started.",
      ],
    },
    {
      id: "mission",
      label: "Mission",
      content: [
        "Our mission is to redefine parcel delivery across Bangladesh by combining speed, reliability, and transparency. We aim to make logistics effortless for individuals and businesses alike, so no one has to worry about where their package is or when it will arrive.",
        "We're committed to building a delivery ecosystem that's accessible to everyone — from a single personal parcel to large-scale corporate shipments — without compromising on safety or service quality.",
        "By investing in technology and our people, we continuously work to lower delivery costs while raising the standard of what a courier service should feel like.",
      ],
    },
    {
      id: "success",
      label: "Success",
      content: [
        "Over the years, we've delivered millions of parcels safely and on time, earning the trust of thousands of individual customers and businesses across the country.",
        "Our real-time tracking system and dedicated support team have helped us maintain one of the highest on-time delivery rates in the industry, with minimal damage and loss reports.",
        "These milestones reflect not just growth in numbers, but the strength of the relationships we've built with every merchant and customer who continues to choose ZapShift.",
      ],
    },
    {
      id: "team",
      label: "Team & Others",
      content: [
        "Behind every successful delivery is a dedicated team — from our riders navigating the streets every day to our support staff who are available around the clock to assist customers.",
        "We believe in fostering a culture of accountability, respect, and continuous improvement, which is reflected in how our team treats every parcel as if it were their own.",
        "As we continue to grow, we remain committed to building a workplace and partner network that values people as much as it values performance.",
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content || [];

  return (
    <section className="w-full py-8 md:py-12">
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10 md:p-14">
        {/* heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          About Us
        </h1>
        <p className="text-sm md:text-base text-slate-800 leading-relaxed mb-6 md:mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and
          zero hassle. From personal packages to business shipments — we
          deliver on time, every time.
        </p>

        {/* tabs */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar border-b border-slate-200 mb-6 md:mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative shrink-0 pb-3 text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-[#0D3B3D] font-semibold"
                  : "text-slate-500 hover:text-slate-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute left-0 -bottom-px h-0.5 w-full bg-[#CAEB66] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="flex flex-col gap-4 md:gap-5">
          {activeContent.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-sm md:text-base text-slate-800 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;