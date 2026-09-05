import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/About Us/AboutUs";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import Rider from "../Pages/Rider/Rider";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SendParcel from "../Pages/Send Parcel/SendParcel";
import DashBoadLayout from "../Layout/DashBoadLayout";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../Pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/DashBoard/Payment/PaymentCancelled";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "rider",
        element: (
          <PrivateRoutes>
            <Rider />
          </PrivateRoutes>
        ),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoutes>
            <SendParcel />
            
          </PrivateRoutes>
        ),
         loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
    ],
  },
  {
   path: 'dashboard',
   element: <PrivateRoutes><DashBoadLayout></DashBoadLayout></PrivateRoutes>,
   children:[
    {
      path: 'my-parcels',
      Component: MyParcels,
    },
    {
      path: 'payment/:id',
      Component: Payment,
    },
    {
      path: 'payment-success',
      Component: PaymentSuccess,
    },
    {
      path: 'payment-cancelled',
      Component: PaymentCancelled,
    },
   ]
  },
]);