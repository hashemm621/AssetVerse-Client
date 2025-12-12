import React from "react";
import { motion } from "framer-motion";

const LoadingPage = ({ loading = true }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7ffe9]">
      
      <div className="flex flex-col items-center gap-6">

        {/* animated circle */}
        <motion.div
          className="w-28 h-28 rounded-full flex items-center justify-center shadow-xl"
          style={{
            background: "linear-gradient(135deg, #CAEB66, #d9ff94)"
          }}
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          {/* rotating inner box */}
          <motion.div
            className="w-14 h-14 rounded-lg flex items-center justify-center"
            style={{ background: "#03373D10" }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          >
            {/* icon */} 
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="1" width="22" height="22" rx="5" fill="#03373D" />
              <path 
                d="M6 12h12M12 6v12" 
                stroke="#CAEB66" 
                strokeWidth="1.6" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* text */}
        <motion.p
          className="text-lg font-semibold text-[#03373D]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          Loading AssetVerse...
        </motion.p>

      </div>
    </div>
  );
};

export default LoadingPage;
