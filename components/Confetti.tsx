"use client";

import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const updateSize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default function ConfettiFlow() {
  const { showConfetti } = useStore();
  const { width, height } = useWindowSize();
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    if (showConfetti) {
      setConfettiKey((prev) => prev + 1);
      const timeout = setTimeout(
        () => setConfettiKey((prev) => prev + 1),
        4000,
      );
      return () => clearTimeout(timeout);
    }
  }, [showConfetti]);

  if (!showConfetti || width === 0 || height === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      <Confetti
        key={confettiKey}
        width={width}
        height={height}
        numberOfPieces={300}
        gravity={0.2}
        initialVelocityX={{ min: -15, max: 15 }}
        initialVelocityY={{ min: 10, max: 20 }}
        confettiSource={{ x: width / 2, y: 0, w: width / 4, h: 0 }}
        colors={["#ff6b6b", "#4ecdc4", "#45b7d1", "#96c93d", "#f7d794"]}
        tweenDuration={3000}
        recycle={false}
      />
    </motion.div>
  );
}
