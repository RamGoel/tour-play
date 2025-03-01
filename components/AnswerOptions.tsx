// AnswerOptions.tsx
import { motion } from "framer-motion";

interface AnswerOptionsProps {
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  onSelect: (answer: string) => void;
}

export default function AnswerOptions({
  options,
  selectedAnswer,
  correctAnswer,
  onSelect,
}: AnswerOptionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((option) => (
        <motion.button
          key={option}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(option)}
          className={`p-4 rounded-lg text-white font-semibold text-lg shadow-md transition-colors duration-200 ${
            selectedAnswer === option
              ? selectedAnswer === correctAnswer
                ? "bg-green-500"
                : "bg-red-500"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}
