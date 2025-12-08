import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Users, Cpu } from "lucide-react";
import { Link } from "react-router";

const benefits = [
  {
    title: "Enterprise-Level Security",
    desc: "Top-tier encryption & compliance ensures your assets remain protected.",
    icon: (
      <ShieldCheck
        size={36}
        className="text-primary"
      />
    ),
  },
  {
    title: "Smart Asset Insights",
    desc: "Real-time analytics helps you track, forecast & optimize performance.",
    icon: (
      <BarChart3
        size={36}
        className="text-primary"
      />
    ),
  },
  {
    title: "Team Collaboration",
    desc: "Collaborate with teams using seamless access control & centralized data.",
    icon: (
      <Users
        size={36}
        className="text-primary"
      />
    ),
  },
  {
    title: "Automation & Efficiency",
    desc: "Automated workflows reduce manual work and save valuable time.",
    icon: (
      <Cpu
        size={36}
        className="text-primary"
      />
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const HomeAbout = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-primary">
            Why Choose AssetVerse?
          </h2>
          <p className="mt-4 text-gray-600">
            A modern asset management platform designed for corporate teams who
            need security, efficiency, and clarity—all in one place.
          </p>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14"
          initial="hidden"
          whileInView="show"
          transition={{ staggerChildren: 0.15 }}
          viewport={{ once: true }}>
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg border transition cursor-pointer">
              <div>{item.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link
            to="/aboutUs"
            className="btn btn-primary px-8 hover:bg-accent hover:border-0">
            See More →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
