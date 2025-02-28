"use client";

import Loader from "@/components/Loader";
import { API } from "@/lib/axios";
import { TUser } from "@/utils/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InvitePage() {
  const [inviterData, setInviterData] = useState<TUser | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const inviter = searchParams.get("inviter") || "A Mystery Traveler";

  useEffect(() => {
    if (!inviter) {
      router.push("/auth");
    } else {
      API.get("/auth?userId=" + inviter)
        .then((res) => setInviterData(res.data))
        .catch(() => router.push("/auth"));
    }
  }, [inviter, router]);

  // Animation variants
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  if (!inviterData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-yellow-400 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Funky Background Elements */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 text-6xl opacity-20"
      >
        ✈️
      </motion.div>
      <motion.div
        animate={{ x: [-20, 20, -20], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 text-5xl opacity-20"
      >
        🌍
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl p-8 max-w-lg w-full text-center shadow-xl border-4 border-dashed border-yellow-300"
      >
        {/* Invitation Message */}
        <motion.h1
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-4xl font-extrabold text-purple-800 mb-4 drop-shadow-md"
        >
          You’ve Been Invited! 🎉
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-lg text-gray-700 mb-6"
        >
          <span className="font-bold text-pink-600">{inviter}</span> has
          challenged you to the Globetrotter Challenge!
        </motion.p>

        {/* Inviter’s Score */}
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <p className="text-xl text-gray-600">Their Score:</p>
          <p className="text-5xl font-bold text-orange-500 animate-pulse drop-shadow-lg">
            {inviterData.score}
          </p>
        </motion.div>

        {/* Play Now Button */}
        <Link href="/auth">
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="px-10 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl font-semibold rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            Play Now! 🚀
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
