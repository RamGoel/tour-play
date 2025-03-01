import { AnimatePresence, motion } from "framer-motion";
import { Copy, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ChallengeModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  inviteLink: string;
  dynamicImage: string;
}

export default function ChallengeModal({
  isOpen,
  setOpen,
  inviteLink,
  dynamicImage,
}: ChallengeModalProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Copied to clipboard");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
  );
}
