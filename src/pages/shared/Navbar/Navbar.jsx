import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import MyContainer from "../../../components/MyContainer";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import { Sun, Moon, LogOut, User, LayoutDashboard } from "lucide-react"; // আইকন ইম্পোর্ট

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [scroll, setScroll] = useState(false);
  


 

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", to: "/" },
    { name: "Features", to: "/features" },
    { name: "FAQ", to: "/FAQ" },
    { name: "DashBoard", to: "/dashboard" },
    { name: "About Us", to: "/aboutUs" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 shadow-lg ${
        scroll ? "bg-primary/90 backdrop-blur-md py-1" : "bg-primary py-2"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MyContainer className="navbar text-white">
        {/* Left Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-2xl z-1 mt-3 w-52 p-4 shadow-2xl border border-base-200">
              {links.map((link, idx) => (
                <li key={idx} className="mb-1">
                  <Link to={link.to} className="font-bold hover:text-primary">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <motion.img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-xl shadow-inner bg-white/20 p-1"
              whileHover={{ rotate: 10, scale: 1.1 }}
            />
            <span className="font-black text-xl tracking-tighter hidden sm:block">Asset<span className="text-accent">Verse</span></span>
          </Link>
        </div>

        {/* Center Section */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {links.map((link, idx) => (
              <li key={idx}>
                <Link to={link.to} className="font-bold hover:bg-white/10 rounded-xl transition-all">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end gap-3">
          {loading ? (
            <span className="loading loading-dots loading-md text-accent"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="group">
                <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-1 pr-4 rounded-full transition-all border border-white/10">
                  <img src={user.photoURL} alt="user" className="w-9 h-9 rounded-full border-2 border-accent object-cover" />
                  <span className="text-sm font-bold hidden md:block">{user.displayName?.split(" ")[0]}</span>
                </div>
              </div>
              
              <ul tabIndex={0} className="dropdown-content menu p-3 shadow-2xl bg-base-100 text-base-content rounded-[2rem] w-64 mt-4 border border-base-200 backdrop-blur-lg">
                <li className="menu-title text-center pb-2 border-b border-base-200 mb-2">
                   <span className="text-xs font-black uppercase tracking-widest opacity-50">User Settings</span>
                </li>

                

                <li>
                  <Link to="/profile" className="flex items-center gap-3 h-11 rounded-xl hover:bg-primary/10 font-bold">
                    <User size={18} className="text-primary" /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="flex items-center gap-3 h-11 rounded-xl hover:bg-primary/10 font-bold">
                    <LayoutDashboard size={18} className="text-primary" /> Dashboard
                  </Link>
                </li>
                <div className="divider my-1 opacity-50"></div>
                <li>
                  <button 
                    onClick={logOut} 
                    className="flex items-center gap-3 h-11 rounded-xl hover:bg-error/10 text-error font-bold"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <motion.button
                className="btn bg-accent hover:bg-white text-primary border-none rounded-2xl px-8 font-black shadow-lg shadow-accent/20"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
          )}
        </div>
      </MyContainer>
    </motion.nav>
  );
};

export default Navbar;