import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const features = [
  {
    title: "Fast Performance",
    desc: "Lightning-fast speed for a smooth experience.",
    icon: "⚡",
  },
  {
    title: "Secure System",
    desc: "Your data stays protected with top-tier security.",
    icon: "🔐",
  },
  {
    title: "Easy Integration",
    desc: "Connect seamlessly with your existing workflows.",
    icon: "🔗",
  },
];

const HomeFeatures = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center text-primary"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}>
          Key Features
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white shadow-md rounded-xl border hover:shadow-xl cursor-pointer transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}>
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-4 font-semibold text-xl text-secondary">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/features"
            className="btn btn-primary px-8 hover:bg-accent hover:border-0">
            See More →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
