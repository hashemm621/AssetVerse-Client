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
import MyAssets from "../pages/dashboard/MyAssets";
import MyEmployeeList from "../pages/dashboard/MyEmployList";
import EmployeeRoute from "./EmployRoute";
import AllAssets from "../pages/dashboard/AllAssets";
import AllRequests from "../pages/dashboard/AllRequests";
import EmployeeRequestAssets from "../pages/dashboard/EmployeeRequestAssets";
import EmployeeMyTeam from "../pages/dashboard/EmployeeMyTeam";

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
      {
        path: "/dashboard/myAssets",
        element: (
          <HrRoute>
            <MyAssets/>
          </HrRoute>
        ),
      },
      {
        path: "/dashboard/myEmployList",
        element: (
          <HrRoute>
            <MyEmployeeList/>
          </HrRoute>
        ),
      },
      {
        path: "/dashboard/allRequests",
        element: (
          <HrRoute>
            <AllRequests/>
          </HrRoute>
        ),
      },
      {
        path: "/dashboard/allAssets",
        element: (
          <EmployeeRoute>
            <AllAssets/>
          </EmployeeRoute>
        ),
      },
      {
        path: "/dashboard/myRequests",
        element: (
          <EmployeeRoute>
            <EmployeeRequestAssets/>
          </EmployeeRoute>
        ),
      },
      {
        path: "/dashboard/myTeam",
        element: (
          <EmployeeRoute>
            <EmployeeMyTeam/>
          </EmployeeRoute>
        ),
      },
    ],
  },
]);
export default router;
