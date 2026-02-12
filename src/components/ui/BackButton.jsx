import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BackButton = ({ to = -1, label = "RETURN" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to === -1) {
      navigate(-1);
    } else {
      navigate(to);
    }
  };

  return (
    <motion.button
      onClick={handleBack}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ x: 5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // Adjusted positioning for mobile
      className="fixed top-3 left-3 md:top-6 md:left-6 z-50 group origin-top-left"
    >
      {/* Adjusted padding and border size for mobile */}
      <div className="relative bg-yellow-400 border-2 md:border-4 border-black px-4 py-1.5 md:px-6 md:py-2 shadow-[2px_2px_0_#000] md:shadow-[6px_6px_0_#000] hover:shadow-[4px_4px_0_#000] md:hover:shadow-[8px_8px_0_#000] transition-all transform -skew-x-12">
        
        {/* Decorative Corner - hidden on very small screens for cleanliness */}
        <div className="hidden md:block absolute top-0 right-0 w-3 h-3 bg-black transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-2 h-2 bg-black transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="flex items-center gap-2 md:gap-3 transform skew-x-12">
            {/* Smaller icon circle on mobile */}
            <div className="bg-black text-white rounded-full w-5 h-5 md:w-8 md:h-8 flex items-center justify-center border-2 border-white/20 group-hover:rotate-180 transition-transform duration-500">
                <span className="font-mono font-bold text-xs md:text-lg mb-0.5">{'<'}</span>
            </div>
            
            <div className="flex flex-col items-start leading-none">
                {/* Responsive text size */}
                <span className="font-['Bangers'] text-lg md:text-2xl tracking-widest text-black group-hover:text-red-600 transition-colors">
                    {label}
                </span>
                {/* Slightly smaller tag text */}
                <span className="font-mono text-[7px] md:text-[9px] font-bold bg-black text-white px-1 mt-0.5 md:mt-1">
                    SYSTEM.NAV
                </span>
            </div>
        </div>

        {/* Glitch Overlay on Hover */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity mix-blend-overlay"></div>
      </div>
    </motion.button>
  );
};

export default BackButton;