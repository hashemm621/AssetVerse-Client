import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import Features from "../pages/Features/Features";
import FAQ from "../pages/FAQ/FAQ";
import Testimonials from "../pages/Testimonials/Testimonials";
import AboutUs from "../pages/AboutUs/AboutUs";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Profile from "../pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/features", Component: Features },
      { path: "/FAQ", Component: FAQ },
      { path: "/testimonials", Component: Testimonials },
      { path: "/aboutUs", Component: AboutUs },
      { path: "/register", Component: Register },
      { path: "/login" , Component:Login},
      { path: "/profile" , Component:Profile},
    ],
  },
]);
export default router;
