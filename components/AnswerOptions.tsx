// AnswerOptions.tsx
import { CHARS } from "@/utils/constants";
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
      {options.map((option, index) => (
        <motion.button
          key={option}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(option)}
          className={`p-4 rounded-lg relative text-white font-semibold text-lg shadow-md transition-colors duration-200 ${
            selectedAnswer === option
              ? selectedAnswer === correctAnswer
                ? "bg-green-500"
                : "bg-red-500"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          <span className="text-indigo-600 top-[50%] translate-[-50%] absolute left-5 w-[20px] text-sm h-[20px] rounded-md flex items-center justify-center bg-white">
            {CHARS[index]}
          </span>{" "}
          {option}
        </motion.button>
      ))}
    </div>
  );
}
