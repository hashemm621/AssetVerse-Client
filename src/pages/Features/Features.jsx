import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; 

const featureList = [
  {
    title: "Real-time Dashboard",
    desc: "Monitor all your metrics live with smart charts and insights.",
  },
  {
    title: "Advanced Security",
    desc: "Protect your data with strong encryption and secure authentication.",
  },
  {
    title: "Cloud Sync",
    desc: "Access your data from any device, anywhere in the world.",
  },
  {
    title: "Automation Tools",
    desc: "Save time with AI-powered automation and smart task flows.",
  },
  {
    title: "Team Collaboration",
    desc: "Invite your team, assign roles, and manage permissions easily.",
  },
  {
    title: "24/7 Support",
    desc: "Our team is ready anytime you need help or guidance.",
  },
];

// animations
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Features = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            All Features At a Glance
          </h1>
          <p className="mt-4 text-gray-600">
            Everything you need to grow faster, stay organized, and deliver better.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.18 }}
        >
          {featureList.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl border border-gray-100 transition"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary" size={28} />
                <div>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <button className="btn btn-primary px-10 py-3 text-lg hover:bg-accent hover:border-0">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
