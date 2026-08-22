import { Outlet } from "react-router";
import Logo from "../Components/Logo/Logo";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto m-5">
      <Logo />

      <div className="flex items-center">
        <div className="flex-1">
          <Outlet />
        </div>

        <div className="flex-1">
          <img src={authImage} alt="" />
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
