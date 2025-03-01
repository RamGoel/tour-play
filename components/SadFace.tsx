"use client";

import { useStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";

const SadFaceAnimation = () => {
  const showSadFace = useStore((state) => state.showSadFace);

  const faceVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: {
      opacity: 1,
      scale: [1, 1.2, 1],
      y: 0,
      transition: {
        duration: 0.5,
        scale: { duration: 1, repeat: 2, ease: "easeInOut" },
      },
    },
    exit: { opacity: 0, scale: 0.5, y: 50, transition: { duration: 0.3 } },
  };

  const tearVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 20,
      transition: {
        delay: 0.5,
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeOut",
      },
    },
    exit: { opacity: 0, y: 30 },
  };

  if (!showSadFace) return;

  return (
    <AnimatePresence>
      {showSadFace && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={faceVariants}
            className="relative text-8xl text-yellow-400 drop-shadow-md"
          >
            😢
            <motion.span
              variants={tearVariants}
              className="absolute left-1/2 -translate-x-1/2 top-10 text-2xl text-blue-500"
            >
              💧
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SadFaceAnimation;
