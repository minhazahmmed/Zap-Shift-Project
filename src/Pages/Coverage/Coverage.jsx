import { useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FiSearch, FiMapPin } from "react-icons/fi";

const createCustomIcon = (color = "#0D3B3D") =>
  new L.DivIcon({
    className: "custom-marker-icon",
    html: `
      <svg width="30" height="38" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 23 15 23s15-12.5 15-23c0-8.3-6.7-15-15-15z" fill="${color}"/>
        <circle cx="15" cy="15" r="6" fill="#CAEB66"/>
      </svg>
    `,
    iconSize: [30, 38],
    iconAnchor: [15, 38],
    popupAnchor: [0, -36],
  });

const defaultIcon = createCustomIcon("#0D3B3D");

const Coverage = () => {
  const position = [23.685, 90.3563];
  const centers = useLoaderData();
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  const mapRef = useRef(null);

  const filteredCenters = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return centers;

    return centers.filter((center) =>
      center.district.toLowerCase().includes(query)
    );
  }, [centers, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim().toLowerCase();
    if (!query || !mapRef.current) return;

    const matched = centers.find(
      (center) => center.district.toLowerCase() === query
    );

    const fallback = centers.find((center) =>
      center.district.toLowerCase().includes(query)
    );

    const target = matched || fallback;

    if (target) {
      setNotFound(false);
      mapRef.current.flyTo([target.latitude, target.longitude], 14, {
        duration: 1.5,
      });
    } else {
      setNotFound(true);
    }
  };

  return (
    <section className="w-full py-8 md:py-12">
      {/* heading */}
      <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10">
        <span className="inline-block bg-[#CAEB66]/30 text-[#0D3B3D] text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {centers.length} Districts Covered
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 leading-snug">
          We are available in 64 districts
        </h2>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
          Search your district below and fly to the nearest ZapShift service
          center on the map.
        </p>
      </div>

      {/* search form */}
      <form
        onSubmit={handleSearch}
        className="max-w-md mx-auto mb-6 md:mb-8 relative"
      >
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setNotFound(false);
          }}
          placeholder="Search your district..."
          className="w-full pl-11 pr-24 py-2.5 sm:py-3 rounded-full border border-slate-200 focus:border-[#CAEB66] focus:ring-2 focus:ring-[#CAEB66]/30 outline-none text-sm sm:text-base text-slate-700 shadow-sm transition-all"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#CAEB66] hover:bg-[#b8e244] text-slate-900 font-semibold text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all"
        >
          Search
        </button>
      </form>

      {search && !notFound && (
        <p className="text-center text-xs sm:text-sm text-slate-500 mb-4">
          {filteredCenters.length} district{filteredCenters.length !== 1 && "s"}{" "}
          found
        </p>
      )}

      {notFound && (
        <p className="text-center text-xs sm:text-sm text-red-500 mb-4">
          No district found with that name.
        </p>
      )}

      {/* map */}
      <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          ref={mapRef}
          className="w-full h-[420px] sm:h-[550px] md:h-[700px] lg:h-[820px] z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {centers.map((center) => (
            <Marker
              key={center.district}
              position={[center.latitude, center.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                <div className="min-w-[180px] py-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <FiMapPin className="text-[#0D3B3D] shrink-0" />
                    <strong className="text-sm text-slate-800">
                      {center.district}
                    </strong>
                    {center.status === "active" && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {center.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;