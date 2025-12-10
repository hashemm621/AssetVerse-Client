import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Award } from "lucide-react";
import MyContainer from "../../components/MyContainer"
import team1 from '../../assets/team1.jpg'
import team2 from '../../assets/team2.jpg'
import team3 from '../../assets/team3.jpg'
import team4 from '../../assets/team4.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="py-20 bg-base-100">
      <MyContainer>

        {/* Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary">About AssetVerse</h1>
          <p className="mt-4 text-gray-600 text-lg">
            AssetVerse is a modern corporate asset management platform built to streamline workflows, improve accountability, and ensure every team member has the right tools.
          </p>
        </motion.div>

        {/* Mission, Vision, Values */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
          initial="hidden"
          whileInView="show"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
            <Target size={32} className="text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-secondary">Our Mission</h3>
            <p className="text-gray-600">
              To simplify corporate asset management, enhance visibility, and reduce operational overhead for companies of all sizes.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
            <Users size={32} className="text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-secondary">Our Vision</h3>
            <p className="text-gray-600">
              To be the most trusted platform for companies to manage assets efficiently while empowering employees with clarity and accountability.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
            <Award size={32} className="text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-secondary">Our Values</h3>
            <p className="text-gray-600">
              Integrity, reliability, innovation, and customer-focused solutions drive everything we do at AssetVerse.
            </p>
          </motion.div>
        </motion.div>

        {/* Optional Team Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold">Meet the Team</h2>
          <p className="mt-2 text-gray-600">Dedicated professionals behind AssetVerse’s success.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[{name:"Dayna",image:team4,post:'Manager'}, {name:"Alice",image:team1,post:'Advisor'}, {name:"Bob Marly",image:team3,post:'Assistant-Manager'}, {name:"Jho Nik",image:team2,post:'Team Member'}].map((team, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
                  <img className="w-24 h-24 rounded-full" src={team.image} alt="" />
                </div>
                <h4 className="mt-4 font-semibold">{team.name}</h4>
                <p className="text-gray-500 text-sm">{team.post}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </MyContainer>
    </section>
  );
};

export default AboutUs;
