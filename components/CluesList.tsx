// CluesList.tsx
import { Feedback } from "@/utils/types";
import { motion } from "framer-motion";
import { Lightbulb, Timer } from "lucide-react";

interface CluesListProps {
  clues: string[];
  visibleClues: number;
  feedback: Feedback | null;
  timeRemaining: number;
}

export default function CluesList({
  clues,
  visibleClues,
  feedback,
  timeRemaining,
}: CluesListProps) {
  return (
    <div className="space-y-4 mb-8">
      {clues.slice(0, visibleClues).map((clue, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.3 }}
          className="bg-indigo-50 rounded-lg p-4 border-l-4 border-yellow-400 shadow-sm"
        >
          <p className="text-lg italic text-gray-700 flex">
            <Lightbulb
              className="mr-2 text-yellow-500 flex-shrink-0 mt-1"
              size={20}
            />
            <span>&quot;{clue}&quot;</span>
          </p>
        </motion.div>
      ))}

      {!feedback && visibleClues === 1 && (
        <p className="text-sm text-indigo-600 font-medium flex items-center mt-4">
          <Timer className="mr-1" size={16} />
          Answer now for 2 points! Next clue in {timeRemaining}s...
        </p>
      )}
    </div>
  );
}
