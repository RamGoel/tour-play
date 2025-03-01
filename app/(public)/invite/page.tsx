"use client";

import Loader from "@/components/Loader";
import { API } from "@/lib/axios";
import { TUser } from "@/utils/types";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Globe, MapPin, Trophy } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

function InviteUI() {
  const [inviterData, setInviterData] = useState<TUser | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const inviter = searchParams.get("inviter") || "A Mystery Traveler";

  useEffect(() => {
    if (!inviter) {
      toast.error("Invalid invitation link. Please request a new one.");
      router.push("/auth");
    } else {
      API.get("/auth?userId=" + inviter)
        .then((res) => setInviterData(res.data))
        .catch(() => {
          toast.error("Invalid invitation link. Please request a new one.");
          router.push("/auth");
        });
    }
  }, [inviter, router]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  };

  if (!inviterData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Loader customMessage="Discovering your destination..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Map Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#4338ca"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Elements */}
      <motion.div
        className="absolute top-16 left-16 text-indigo-500 opacity-30"
        variants={floatingVariants}
        animate="float"
      >
        <Compass size={60} />
      </motion.div>

      <motion.div
        className="absolute bottom-16 right-20 text-indigo-500 opacity-30"
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: "-1.5s" }}
      >
        <MapPin size={60} />
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-xl border border-indigo-200 relative z-10"
      >
        {/* Globe Icon */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-indigo-600 rounded-full p-4 shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Globe size={36} className="text-white" />
        </motion.div>

        <motion.div
          className="mt-8 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Invitation Message */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-800 mb-3"
          >
            Geography Challenge!
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-6 text-gray-600">
            <p className="text-lg">
              <span className="font-semibold text-purple-600">{inviter}</span>{" "}
              has challenged you to test your geography knowledge in
              Globetrotter!
            </p>
          </motion.div>

          {/* Inviter's Score Panel */}
          <motion.div
            variants={itemVariants}
            className="bg-indigo-50 rounded-lg p-4 mb-6 border border-indigo-100"
          >
            <div className="flex items-center justify-center gap-3 mb-1">
              <Trophy className="text-yellow-500" size={24} />
              <p className="text-xl font-medium text-indigo-700">
                Their Score:
              </p>
            </div>
            <p className="text-4xl font-bold text-indigo-600">
              {inviterData.score}
            </p>
            <p className="text-sm text-indigo-500 mt-2 font-medium">
              Think you can beat that?
            </p>
          </motion.div>

          {/* Play Now Button */}
          <Link href="/auth">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              Accept Challenge
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* World landmarks silhouette decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-10">
          <div className="flex justify-around items-end w-full h-full">
            <div className="w-6 h-12 bg-indigo-800 rounded-t-md"></div>{" "}
            {/* Eiffel Tower */}
            <div className="w-10 h-10 bg-indigo-800 rounded-t-full"></div>{" "}
            {/* Taj Mahal */}
            <div className="w-8 h-14 bg-indigo-800"></div> {/* Skyscraper */}
            <div className="w-4 h-8 bg-indigo-800 rounded-t-md"></div>{" "}
            {/* Pyramid */}
            <div className="w-12 h-8 bg-indigo-800 rounded-t-md"></div>{" "}
            {/* Bridge */}
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-center text-indigo-600 text-sm mt-8 max-w-md"
      >
        Globetrotter: Test your knowledge of world geography, unlock fun facts,
        and compete with friends!
      </motion.p>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<Loader customMessage="Loading your adventure..." />}>
      <InviteUI />
    </Suspense>
  );
}
