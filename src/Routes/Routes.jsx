import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/About Us/AboutUs";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
          path: 'coverage',
          Component: Coverage,
          loader: ()=> fetch('/serviceCenters.json').then(res => res.json())
        },
        {
          path: 'about-us',
          Component: AboutUs,
        }
    ]
  },

  {
    path:'/',
    Component: AuthLayout,
    children:[
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ]
  }
]);