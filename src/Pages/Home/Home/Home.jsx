import Banner from "../Banner/Banner";
import FAQ from "../Sections/FAQ";
import FeatureCards from "../Sections/FeatureCards";
import HowItWorks from "../Sections/HowItWorks";
import MerchantBanner from "../Sections/MerchantBanner";
import OurServices from "../Sections/OurServices";
import SalesTeam from "../Sections/SalesTeam";
import Testimonials from "../Sections/Testimonials";


const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Banner />
      <HowItWorks />
      <OurServices />
      <SalesTeam />
      <FeatureCards />
      <MerchantBanner />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Home;