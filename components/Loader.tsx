"use client";

import { motion } from "framer-motion";
import { Compass, Globe, MapPin } from "lucide-react";

const Loader = ({ customMessage }: { customMessage?: string }) => {
  const loadingText = customMessage ?? "Exploring destinations";

  const pins = [
    { delay: 0, x: "-12vw", y: "-8vh" },
    { delay: 0.3, x: "15vw", y: "-15vh" },
    { delay: 0.6, x: "-18vw", y: "10vh" },
    { delay: 0.9, x: "20vw", y: "5vh" },
    { delay: 1.2, x: "5vw", y: "18vh" },
    { delay: 1.5, x: "-5vw", y: "-18vh" },
  ];

  return (
    <div className="fixed inset-0 bg-indigo-50 flex flex-col items-center justify-center z-50">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-indigo-300 rounded-full"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border-2 border-indigo-400 rounded-full"></div>
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(99, 102, 241, 0.2)"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div
          className="relative mb-12"
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotateY: {
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            },
            scale: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            },
          }}
        >
          <div className="relative">
            <motion.div
              className="text-indigo-600"
              animate={{
                scale: [1, 1.1, 1],
                filter: [
                  "drop-shadow(0 0 8px rgba(79, 70, 229, 0.4))",
                  "drop-shadow(0 0 16px rgba(79, 70, 229, 0.6))",
                  "drop-shadow(0 0 8px rgba(79, 70, 229, 0.4))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Globe size={120} strokeWidth={1.5} />
            </motion.div>

            {pins.map((pin, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: pin.x,
                  y: pin.y,
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  delay: pin.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <MapPin size={24} />
              </motion.div>
            ))}

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 opacity-30"
              style={{ width: "200px", height: "200px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <Compass size={24} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <Compass size={24} />
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <Compass size={24} />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Compass size={24} />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="text-xl font-medium text-indigo-800 mb-6"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {loadingText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ...
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
