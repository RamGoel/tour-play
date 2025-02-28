"use client";

import { motion } from "framer-motion";

const Loader = () => {
  // Animation variants for the plane
  const planeVariants = {
    animate: {
      x: [0, 20, -20, 0], // Wobble effect
      y: [0, -15, 15, 0], // Up and down bounce
      rotate: [0, 10, -10, 0], // Slight tilt
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Animation for the clouds
  const cloudVariants = {
    animate: {
      x: [-50, 50], // Drift left to right
      opacity: [0.5, 1, 0.5], // Fade in and out
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 via-blue-200 to-indigo-300">
      {/* Loader Container */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Plane */}
        <motion.div
          variants={planeVariants}
          animate="animate"
          className="text-6xl"
        >
          ✈️
        </motion.div>

        {/* Animated Clouds */}
        <motion.div
          variants={cloudVariants}
          animate="animate"
          className="absolute top-[-40px] left-[-60px] text-4xl text-white/70"
        >
          ☁️
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate={{
            ...cloudVariants.animate,
            transition: { ...cloudVariants.animate.transition, delay: 1 },
          }}
          className="absolute bottom-[-50px] right-[-70px] text-4xl text-white/70"
        >
          ☁️
        </motion.div>

        {/* Loading Text */}
        <motion.p
          animate={{
            scale: [1, 1.1, 1],
            transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
          className="text-2xl font-bold text-indigo-800 drop-shadow-md"
        >
          Setting things up
        </motion.p>

        {/* Funky Dots */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                },
              }}
              className="w-3 h-3 bg-yellow-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
