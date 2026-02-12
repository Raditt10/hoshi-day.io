import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CustomToast = ({ message, isVisible, onClose, type = 'error' }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ opacity: 0, y: 50, scale: 0.9, x: 50 }}
           animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
           exit={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
           className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[10000] max-w-[90vw] md:max-w-sm text-center pointer-events-none"
        >
           <div className="bg-black border-4 border-red-600 text-white p-4 shadow-[8px_8px_0_rgba(0,0,0,0.5)] relative overflow-hidden">
              {/* Background Stripe */}
              <div className="absolute inset-0 opacity-10" 
                   style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ff0000, #ff0000 10px, transparent 10px, transparent 20px)' }} 
              />
              
              <div className="relative z-10">
                 <div className="flex justify-center mb-2">
                    <div className="bg-red-600 text-black font-black px-3 py-1 text-xs tracking-widest uppercase transform -skew-x-12 inline-block">
                        SYSTEM ALERT!
                    </div>
                 </div>
                 
                 <h4 className="font-['Bangers'] text-xl md:text-2xl tracking-wide mb-1 text-red-500">
                    MISSING DATA
                 </h4>
                 
                 <p className="font-mono text-xs md:text-sm text-zinc-300 mb-4">
                    {message}
                 </p>
              </div>

               {/* Close Button (Hidden but clickable via pointer-events-auto on parent if needed, but we use auto-dismiss usually) */}
           </div>
           
           {/* Decorative Error Lines */}
           <div className="h-1 w-full bg-red-600 mt-1 animate-pulse"></div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CustomToast;