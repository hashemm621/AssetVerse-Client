import React from 'react';
import { motion } from 'framer-motion';
import { ImSpinner2 } from 'react-icons/im'; 

const primaryColor = '#1E3A8A'; 
const secondaryColor = '#0F172A'; 
const accentColor = '#38BDF8'; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
        duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  }
};

const LoadingPage = () => {
  return (
    
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: secondaryColor }} 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      
      <motion.div
        variants={itemVariants}
        style={{ color: accentColor }} 
        className="mb-4"
      >
        <ImSpinner2 className="w-12 h-12 animate-spin" />
      </motion.div>

      <motion.p
        variants={itemVariants}
        style={{ color: primaryColor }} 
        className="text-lg font-semibold mt-4"
      >
        Loading resources...
      </motion.p>
    </motion.div>
  );
};

export default LoadingPage;