import { Outlet } from "react-router";
import Header from "../Pages/Shared/Header/Header";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <Header />
      <div className="flex-1 my-4 md:my-7">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;