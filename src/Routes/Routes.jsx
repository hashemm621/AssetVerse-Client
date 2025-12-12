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
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import HrRoute from "./HrRoute";
import AddAssets from "../pages/dashboard/AddAssets/AddAssets";
import ErrorPage from "../pages/errorpage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "/features", Component: Features },
      { path: "/FAQ", Component: FAQ },
      { path: "/testimonials", Component: Testimonials },
      { path: "/aboutUs", Component: AboutUs },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
      { path: "/profile", Component: Profile },
    ],
  },
  {
    path: "/dashboard",

    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/addAssets",
        element: (
          <HrRoute>
            <AddAssets />
          </HrRoute>
        ),
      },
    ],
  },
]);
export default router;
