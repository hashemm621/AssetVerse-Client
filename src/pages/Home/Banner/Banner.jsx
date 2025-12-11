import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router";
import MyContainer from "../../../components/MyContainer";
import useAuth from "../../../hooks/useAuth";

const headingVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 * i, duration: 0.6, ease: "easeOut" },
  }),
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.12)" },
  tap: { scale: 0.96 },
};

const Banner = () => {
const {user} = useAuth()
  return (
    <section className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 py-16 lg:py-28">
      <MyContainer className="flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* LEFT: Text */}
        <div className="flex-1 w-full">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-secondary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            custom={1}
            variants={headingVariants}>
            AssetVerse —{" "}
            <span className="text-primary">Manage assets smarter</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-base sm:text-lg text-gray-200 max-w-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            viewport={{ once: true }}>
            Track laptops, peripherals and equipment across teams and offices.
            Auto-affiliate employees on approval, enforce package limits, and
            simplify returns — all in one clear dashboard.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}>
              <Link
                to={user?'/dashboard':"/register"}
                className="btn px-6 py-3 bg-primary text-base-100 border-0 shadow-none rounded-xl">
                Get Started — Free
              </Link>
            </motion.div>

            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}>
              <Link
                to="/features"
                className="btn btn-outline rounded-xl border-secondary text-secondary px-6 py-3 hover:bg-accent hover:shadow-none hover:text-base-100 hover:border-0">
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* small stats */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}>
            <Stat
              label="Companies"
              value="100+"
            />
            <Stat
              label="Assets Tracked"
              value="5k+"
            />
            <Stat
              label="Teams"
              value="500+"
            />
          </motion.div>
        </div>

        {/* RIGHT: Illustration */}
        <motion.div
          className="flex-1 w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}>
          {/* Simple inline SVG illustration (replace with your image if needed) */}
          <div className="w-full max-w-md">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}>
              <svg
                viewBox="0 0 320 220"
                className="w-full h-auto">
                <defs>
                  <linearGradient
                    id="g1"
                    x1="0"
                    x2="1">
                    <stop
                      offset="0%"
                      stopColor="#CAEB66"
                    />
                    <stop
                      offset="100%"
                      stopColor="#03373D"
                    />
                  </linearGradient>
                </defs>

                {/* dashboard card */}
                <rect
                  x="8"
                  y="12"
                  rx="12"
                  ry="12"
                  width="304"
                  height="196"
                  fill="url(#g1)"
                  opacity="0.08"
                />

                {/* header */}
                <rect
                  x="20"
                  y="26"
                  rx="6"
                  ry="6"
                  width="180"
                  height="14"
                  fill="#ffffff"
                  opacity="0.9"
                />
                <rect
                  x="20"
                  y="46"
                  rx="6"
                  ry="6"
                  width="260"
                  height="10"
                  fill="#ffffff"
                  opacity="0.6"
                />

                {/* chart boxes */}
                <rect
                  x="24"
                  y="72"
                  rx="6"
                  ry="6"
                  width="80"
                  height="10"
                  fill="#ffffff"
                  opacity="0.9"
                />
                <rect
                  x="110"
                  y="72"
                  rx="6"
                  ry="6"
                  width="70"
                  height="10"
                  fill="#ffffff"
                  opacity="0.75"
                />
                <rect
                  x="190"
                  y="72"
                  rx="6"
                  ry="6"
                  width="70"
                  height="10"
                  fill="#ffffff"
                  opacity="0.6"
                />

                {/* bars */}
                <rect
                  x="30"
                  y="98"
                  width="28"
                  height="60"
                  rx="4"
                  fill="#03373D"
                  opacity="0.95"
                />
                <rect
                  x="68"
                  y="80"
                  width="28"
                  height="78"
                  rx="4"
                  fill="#2563EB"
                  opacity="0.95"
                />
                <rect
                  x="106"
                  y="110"
                  width="28"
                  height="48"
                  rx="4"
                  fill="#10B981"
                  opacity="0.95"
                />
                <rect
                  x="144"
                  y="72"
                  width="28"
                  height="86"
                  rx="4"
                  fill="#CAEB66"
                  opacity="0.95"
                />
                <rect
                  x="182"
                  y="92"
                  width="28"
                  height="66"
                  rx="4"
                  fill="#8B5CF6"
                  opacity="0.95"
                />

                {/* small icons */}
                <circle
                  cx="250"
                  cy="140"
                  r="18"
                  fill="#fff"
                  opacity="0.95"
                />
                <path
                  d="M244 136 h12 v8 h-12z"
                  fill="#03373D"
                  opacity="0.95"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default Banner;

/* small stat subcomponent (internal) */
const Stat = ({ label, value }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-2xl font-bold text-secondary">{value}</div>
      <div className="text-sm text-gray-300">{label}</div>
    </div>
  );
};
