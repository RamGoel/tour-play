// QuizFeedback.tsx
import { Feedback } from "@/utils/types";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface QuizFeedbackProps {
  feedback: Feedback;
  visibleClues: number;
  funFact: string;
  onNextQuestion: () => void;
}

export default function QuizFeedback({
  feedback,
  visibleClues,
  funFact,
  onNextQuestion,
}: QuizFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      {/* Feedback section */}
      <div
        className={`rounded-lg p-4 mb-6 ${
          feedback.isCorrect
            ? "bg-green-100 border border-green-300"
            : "bg-red-100 border border-red-300"
        }`}
      >
        <p
          className={`text-2xl font-bold mb-2 ${
            feedback.isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback.message}
        </p>
        {feedback.isCorrect && (
          <p className="text-green-600 font-medium">
            {visibleClues === 1
              ? "Amazing! You earned 2 points for answering with just one clue!"
              : "Good job! You earned 1 point."}
          </p>
        )}
      </div>

      {/* Fun fact */}
      <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-200">
        <h3 className="text-xl font-semibold text-yellow-700 mb-2">
          Did You Know?
        </h3>
        <p className="text-gray-700">{funFact}</p>
      </div>

      {/* Next question button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNextQuestion}
        className="mx-auto mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
      >
        <RefreshCw size={20} />
        Next Destination
      </motion.button>
    </motion.div>
  );
}
