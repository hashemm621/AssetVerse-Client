import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import RegisterHR from "../pages/auth/RegisterHR";
import Login from "../pages/auth/Login";
import RegisterEmployee from "../pages/auth/RegisterEmployee";
import Features from "../pages/Features/Features";
import FAQ from "../pages/FAQ/FAQ";
import Testimonials from "../pages/Testimonials/Testimonials";
import AboutUs from "../pages/AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: Home },
        {path:'/features', Component:Features},
        {path:'/FAQ', Component:FAQ},
        {path:'/testimonials', Component:Testimonials},
        {path:'/aboutUs', Component:AboutUs},
    ],
  },
]);
export default router;
