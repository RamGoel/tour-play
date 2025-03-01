"use client";

import { useStore } from "@/lib/store";
import { APP_NAME } from "@/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Copy, Globe, Share2, Trophy, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const Header = () => {
  const { user } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [showItem, setShowItem] = useState(false);
  const [dynamicImage, setDynamicImage] = useState<string | null>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  // Generate invite link and dynamic image
  const handleChallengeClick = async () => {
    if (!user?.username) return;

    const url = `${window.location.origin}/invite?inviter=${encodeURIComponent(user?.username)}`;
    setInviteLink(url);
    setShowItem(true);

    // Generate dynamic image from score section
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
    toast.success("Copied to clipboard");
  };

  return (
    <>
      {/* Main Header */}
      <div className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-full shadow-md">
            <Globe className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {APP_NAME}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChallengeClick}
            className="px-4 py-2 bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
          >
            <span>Challenge a Friend</span>
            <Share2 size={18} />
          </motion.button>

          {user && (
            <>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                <Trophy className="text-yellow-500" size={20} />
                <div className="text-lg text-indigo-600 font-semibold">
                  {user?.score || 0}
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full">
                  <p className="text-sm font-semibold uppercase">
                    {user?.username?.[0]}
                  </p>
                </div>
                <p className="text-md font-medium text-gray-800 hidden sm:block">
                  {user?.username}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          position: "fixed", // Change from absolute to fixed
          visibility: showItem ? "visible" : "hidden", // Use visibility instead of opacity
          zIndex: -1,
          left: "50%", // Center horizontally
          top: "50%", // Center vertically
          transform: "translate(-50%, -50%)", // Center alignment
        }}
        className="w-fit "
      >
        <div
          ref={scoreRef}
          className="flex p-3  flex-col items-start gap-2 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 rounded-lg shadow-md max-w-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full">
              <p className="text-md font-semibold uppercase">
                {user?.username?.[0]}
              </p>
            </div>

            <div className="flex-1">
              <p className="text-md font-semibold text-gray-800">
                {user?.username} scored
              </p>
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                <p className="text-2xl font-bold text-indigo-600">
                  {user?.score || 0} points
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-indigo-600 font-medium text-center">
            Think you can beat this? Try Globetrotter now!
          </p>{" "}
        </div>
      </div>

      {/* Challenge Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl border border-indigo-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold ">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Challenge Your Friends!
                  </span>{" "}
                  🌍
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {dynamicImage && (
                <div className="mb-6">
                  <Image
                    width={500}
                    height={500}
                    src={dynamicImage}
                    alt="Score Preview"
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between border border-gray-200">
                <p className="text-sm text-gray-700 truncate flex-1">
                  {inviteLink}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 px-3 py-1 bg-indigo-500 cursor-pointer text-white rounded-md hover:bg-indigo-600 transition duration-200 flex items-center gap-2"
                >
                  <Copy size={16} />
                  <span>Copy</span>
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-500 text-center">
                Share this link with friends to see if they can beat your
                geography knowledge!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
