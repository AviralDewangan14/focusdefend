"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake progress for DOM loading
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 300);
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816] text-white"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 font-bold text-3xl tracking-tight mb-8">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#050816] text-sm">
                FD
              </div>
              FocusDefend
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
            
            {/* Percentage */}
            <div className="mt-4 text-sm font-medium text-gray-400 font-mono">
              {Math.round(progress)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
