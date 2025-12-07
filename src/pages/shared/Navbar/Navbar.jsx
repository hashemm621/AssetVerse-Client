import React from "react";
import logo from "../../../assets/logo.png";
import MyContainer from "../../../components/MyContainer";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Navbar = () => {
  const links = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/features">Features</Link></li>
      <li><Link to="/FAQ">FAQ</Link></li>
      <li><Link to="/testimonials">Testimonials</Link></li>
      <li><Link to="/aboutUs">About Us</Link></li>
    </>
  );

  return (
    <motion.nav
      className="bg-primary shadow-lg"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <MyContainer className="navbar text-white">

        {/* Left */}
        <div className="navbar-start">
          {/* Mobile Hamburger */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              {/* Animated Hamburger */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileTap={{ scale: 0.85 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </motion.svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-secondary rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo with animation */}
          <Link to="/" className="text-xl">
            <motion.img
              src={logo}
              alt="Brand Logo"
              className="max-w-[50px] max-h-[50px] rounded-lg"
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            {React.Children.map(links.props.children, (child) => (
              <motion.li
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {child}
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Button */}
        <div className="navbar-end">
          <motion.button
            className="btn bg-secondary border-none hover:bg-secondary/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            Login
          </motion.button>
        </div>
      </MyContainer>
    </motion.nav>
  );
};

export default Navbar;
