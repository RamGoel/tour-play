// StatsHeader.tsx
import { motion } from "framer-motion";
import { CheckCircle, Share2, X } from "lucide-react";

interface StatsHeaderProps {
  correctAnswers: number;
  incorrectAnswers: number;
  onChallengeClick: () => void;
}

export default function StatsHeader({
  correctAnswers,
  incorrectAnswers,
  onChallengeClick,
}: StatsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-5 w-full">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onChallengeClick}
        className="px-4 py-2 bg-gradient-to-r hidden md:flex cursor-pointer from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 items-center gap-2"
      >
        <span>Challenge a Friend</span>
        <Share2 size={18} />
      </motion.button>
      <div className="flex items-center gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
          <CheckCircle className="text-green-500" size={20} />
          <p className="font-medium text-black">{correctAnswers}</p>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          <X className="text-red-500" size={20} />
          <p className="font-medium text-black">{incorrectAnswers}</p>
        </div>
      </div>
    </div>
  );
}
