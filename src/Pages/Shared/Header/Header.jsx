
import { NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const { user, logOut, loading } = useAuth(); 
  const [isLoggingOut, setIsLoggingOut] = useState(false); 
  const handleLogout = () => {
    setIsLoggingOut(true);
    logOut()
      .then(() => {
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoggingOut(false);
      });
  };

  const links = (
    <>
      <li><NavLink to="/services">Services</NavLink></li>
      <li><NavLink to="/coverage">Coverage</NavLink></li>
      <li><NavLink to="/about-us">About Us</NavLink></li>
      <li><NavLink to="/pricing">Pricing</NavLink></li>
      <li><NavLink to="/blog">Blog</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-amber-300 rounded-lg mt-3 md:mt-5 px-3 md:px-6 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow text-base-content"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost p-0 hover:bg-transparent">
          <Logo />
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {links}
        </ul>
      </div>

      <div className="navbar-end">
       
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : user ? (
  
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="btn btn-sm md:btn-md btn-neutral rounded-lg px-4 md:px-6"
          >
            {isLoggingOut ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Log out"
            )}
          </button>
        ) : (
        
          <NavLink
            to="/login"
            className="btn btn-primary text-black btn-sm md:btn-md btn-neutral rounded-lg px-4 md:px-6"
          >
            Log in
          </NavLink>
        )}

            <NavLink
            to="/beARider"
            className="mx-2 btn btn-primary text-black btn-sm md:btn-md btn-neutral rounded-lg px-4 md:px-6"
          >
            Be a rider
          </NavLink>
      </div>
    </div>
  );
};

export default Header;