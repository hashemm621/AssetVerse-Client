import React from "react";
import { motion } from "framer-motion";
import MyContainer from "../../../components/MyContainer"
import { Link } from "react-router";
import test1 from '../../../assets/test1.jpg'
import test2 from '../../../assets/test2.jpg'
import test3 from '../../../assets/test3.jpg'


const testimonials = [
  {
    name: "Lina Doe",
    image:test1,
    company: "TechCorp",
    feedback: "AssetVerse streamlined our asset tracking completely. Highly recommend!",
  },
  {
    name: "Sara Lee",
    image:test2,
    company: "FinSolutions",
    feedback: "Managing employee assets was never this easy. Great platform!",
  },
  {
    name: "Michael Smith",
    image:test3,
    company: "InnovateX",
    feedback: "Professional and reliable asset management system for our team.",
  },
];

const stats = [
  { label: "Companies", value: "100+" },
  { label: "Assets Tracked", value: "5k+" },
  { label: "Teams", value: "500+" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const HomeTestimonial = () => {
  return (
    <section className="py-20 bg-base-200">
      <MyContainer>

        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          
          <h2 className="text-3xl text-primary font-bold">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-gray-600">
            Trusted by hundreds of companies worldwide to manage assets efficiently.
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center mb-4">
            <img className="h-40 w-40 rounded-2xl" src={item.image} alt="feedback user image " />
          </div>
              <p className="text-gray-700">&quot;{item.feedback}&quot;</p>
              <h4 className="mt-4 font-semibold">{item.name}</h4>
              <p className="text-gray-500 text-sm">{item.company}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

<div className="text-center mt-10">
          <Link
            to="/testimonials"
            className="btn btn-primary px-8 hover:bg-accent hover:border-0">
            See More →
          </Link>
        </div>
      </MyContainer>
    </section>
  );
};

export default HomeTestimonial;
