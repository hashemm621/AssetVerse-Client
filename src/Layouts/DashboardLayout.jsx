import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router";
import MyContainer from "../components/MyContainer";
import logo from "../assets/logo.png";
import useRole from "../hooks/useRole";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
import Footer from "../pages/shared/Footer/Footer";
import { FaBoxOpen, FaListAlt, FaPrescriptionBottleAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { GoSidebarExpand } from "react-icons/go";
import { MdRequestQuote } from "react-icons/md";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!roleLoading) {
      
      if (location.pathname === "/dashboard") {
        if (role === "hr") {
          navigate("/dashboard/myAssets", { replace: true });
        } else if (role === "employee") {
          navigate("/dashboard/allAssets", { replace: true });
        }
      }
    }
  }, [role, roleLoading, location.pathname, navigate]);

  if (roleLoading) {
    return <LoadingPage loading={roleLoading} />;
  }

  return (
    <div className="drawer md:max-w-7xl mx-auto lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="bg-primary">
          <MyContainer className="navbar text-white">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost bg-transparent text-white border-0 shadow-none hover:scale-105"
            >
              <GoSidebarExpand size={28} />
            </label>
            <div className="px-4 flex gap-2 text-xl font-bold">
              <Link to={"/"} className="hover:scale-105">
                <img className="w-10 rounded-sm" src={logo} alt="brand logo" />
              </Link>{" "}
              <span>assetVerse Dashboard</span>
            </div>
          </MyContainer>
        </nav>

        {/* Page content */}
        <Outlet />

        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </div>

      {/* Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-secondary text-base-100 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-6"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* HR links */}
            {role === "hr" && (
              <>

              {/* add asstest */}
                <li>
                  <Link
                    to={"/dashboard/addAssets"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Assets"
                  >
                    <FaBoxOpen size={24} />
                    <span className="is-drawer-close:hidden">Add Assets</span>
                  </Link>
                </li>

                {/* myAssets */}
                <li>
                  <Link
                    to={"/dashboard/myAssets"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Assets"
                  >
                    <FaListAlt size={24} />
                    <span className="is-drawer-close:hidden">My Assets</span>
                  </Link>
                </li>

                  {/* employList */}
                <li>
                  <Link
                    to={"/dashboard/myEmployList"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Employ List"
                  >
                    <HiUserGroup size={24} />
                    <span className="is-drawer-close:hidden">My Employ List</span>
                  </Link>
                </li>

                {/* allRequests */}
                <li>
                  <Link
                    to={"/dashboard/allRequests"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Requests"
                  >
                    <MdRequestQuote size={24} />
                    <span className="is-drawer-close:hidden">All Requests</span>
                  </Link>
                </li>
              </>
            )}

            {/* Employee links */}
            {role === "employee" && (
              <li>
                <Link
                  to={"/dashboard/allAssets"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Assets"
                >
                  <FaPrescriptionBottleAlt size={24} />
                  <span className="is-drawer-close:hidden">All Assets</span>
                </Link>
              </li>
            )}





            {/* Settings */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-6"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
