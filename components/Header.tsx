"use client";

import { useStore } from "@/lib/store";
import { APP_NAME } from "@/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import Image from "next/image";
import { useRef, useState } from "react";

const Header = () => {
  const { user } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [showItem, setShowItem] = useState(false);
  const [dynamicImage, setDynamicImage] = useState<string | null>(null);
  const scoreRef = useRef<HTMLDivElement>(null); // Ref to capture dynamic image

  // Generate invite link and dynamic image
  const handleChallengeClick = async () => {
    if (!user?.username) return;
    const url = `${window.location.origin}/invite?inviter=${encodeURIComponent(user?.username)}`; // Replace with actual username logic
    setInviteLink(url);

    setShowItem(true);

    // Generate dynamic image from a score section (mocked here, adjust as needed)
    if (scoreRef.current) {
      const image = await toPng(scoreRef.current);
      setDynamicImage(image);
    }

    setShowItem(false);

    setIsModalOpen(true);
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between w-full p-4 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <Image
            src="/media/logo.png"
            width={50}
            height={50}
            alt="logo"
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold text-indigo-800">{APP_NAME}</h1>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChallengeClick}
            className="px-4 py-2 bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
          >
            <span>Challenge a Friend</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.button>

          {user ? (
            <>
              <div className="text-lg text-indigo-500 font-semibold">
                Your Score: {user?.score || 0}
              </div>

              <div className="flex items-center gap-2">
                <div className="w-[35px] flex items-center justify-center h-[35px] bg-indigo-500 rounded-full">
                  <p className="text-lg font-semibold uppercase">
                    {user?.username?.[0]}
                  </p>
                </div>
                <p className="text-md text-black">{user?.username}</p>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div
        ref={scoreRef}
        style={{ opacity: showItem ? "1" : "0" }}
        className="absolute pointer-events-none p-4 bg-white rounded-lg shadow-md"
      >
        <p className="text-lg font-bold text-indigo-800">
          Your Score: {user?.score || 0}
        </p>{" "}
        <p className="text-sm text-gray-600">
          Challenge your friends to beat this!
        </p>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl border border-purple-200"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                Challenge Your Friends! 🎉
              </h2>

              {dynamicImage && (
                <div className="mb-4">
                  <Image
                    width={500}
                    height={500}
                    src={dynamicImage}
                    alt="Score Preview"
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              )}

              <div className="bg-gray-100 p-3 rounded-md flex items-center justify-between">
                <p className="text-sm text-gray-700 truncate flex-1">
                  {inviteLink}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 px-3 py-1 bg-indigo-500 cursor-pointer text-white rounded-md hover:bg-indigo-600 transition duration-200"
                >
                  Copy
                </button>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
