import React from "react";
import { motion } from "framer-motion";
import MyContainer from "../../components/MyContainer";
import test1 from "../../assets/test1.jpg";
import test2 from "../../assets/test2.jpg";
import test3 from "../../assets/test3.jpg";
import test5 from "../../assets/test5.jpg";
import test6 from "../../assets/test6.jpg";
import test4 from "../../assets/test4.jpg";
import test7 from "../../assets/test7.jpg";
import test8 from "../../assets/test8.jpg";
import test9 from "../../assets/test9.jpg";

const testimonialsData = [
  {
    name: "Lina Doe",
    image: test1,
    company: "TechCorp",
    role: "IT Manager",
    feedback:
      "AssetVerse completely transformed the way we manage company assets. The automated tracking and real-time dashboard are amazing.",
  },
  {
    name: "Sara Lee",
    image: test2,
    company: "FinSolutions",
    role: "Operations Lead",
    feedback:
      "Managing our employees equipment has never been easier. Approval workflows and analytics save us hours every week!",
  },
  {
    name: "Michael Smith",
    image: test3,
    company: "InnovateX",
    role: "HR Specialist",
    feedback:
      "Professional, user-friendly, and reliable. AssetVerse is essential for our asset tracking and accountability.",
  },
  {
    name: "Anna Williams",
    image: test4,
    company: "GlobalTech",
    role: "Project Manager",
    feedback:
      "Real-time insights and analytics let us make smarter decisions. AssetVerse is a must-have for our IT department.",
  },
  {
    name: "David Brown",
    image: test5,
    company: "NextGen Solutions",
    role: "Finance Officer",
    feedback:
      "The platform is intuitive and easy to use. Asset tracking and reporting features save our team a lot of time.",
  },
  {
    name: "Emily Clark",
    image: test6,
    company: "Alpha Enterprises",
    role: "HR Manager",
    feedback:
      "I love how AssetVerse automatically handles asset assignments and returns. It reduces human error drastically.",
  },
  {
    name: "Kateryna Wilson",
    image: test7,
    company: "TechNova",
    role: "IT Administrator",
    feedback:
      "Tracking assets across multiple offices is no longer a headache. AssetVerse is efficient and reliable.",
  },
  {
    name: "Olivia Martinez",
    image: test8,
    company: "FinEdge",
    role: "Operations Manager",
    feedback:
      "The package management and employee affiliation features are excellent. We can scale without any hassle.",
  },
  {
    name: "Clarisse Johnson",
    image: test9,
    company: "InnovateTech",
    role: "Team Lead",
    feedback:
      "AssetVerse improves accountability and ensures no asset is misplaced. It’s a game-changer for our operations.",
  },
];

const stats = [
  { label: "Companies", value: "100+" },
  { label: "Assets Tracked", value: "5k+" },
  { label: "Teams", value: "500+" },
  { label: "Countries", value: "15+" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-base-100">
      <MyContainer>
        {/* Page Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Client Testimonials
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            See why hundreds of companies trust AssetVerse to manage their
            assets efficiently.
          </p>
        </motion.div>

        {/* Testimonials Cards */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="show"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}>
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition flex flex-col items-center text-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-32 rounded-full object-cover mb-4"
              />
              <p className="text-gray-700 italic">
                &quot;{item.feedback}&quot;
              </p>
              <h4 className="mt-4 font-semibold text-lg">{item.name}</h4>
              <p className="text-gray-500 text-sm">
                {item.role} at {item.company}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-gray-600 text-lg">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default Testimonials;
