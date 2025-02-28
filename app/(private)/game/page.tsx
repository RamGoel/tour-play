"use client";

import { destinationArray } from "@/lib/data";
import { getRandomQuiz } from "@/utils/helpers";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GamePage() {
  const [quiz, setQuiz] = useState<{
    clues: string[];
    options: string[];
    correctAnswer: string;
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
  } | null>(null);

  // Fetch a new quiz on mount and reset
  const fetchNewQuiz = () => {
    const newQuiz = getRandomQuiz(destinationArray);
    setQuiz(newQuiz);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  useEffect(() => {
    fetchNewQuiz();
  }, []);

  // Handle answer selection
  const handleAnswer = (answer: string) => {
    if (!quiz) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === quiz.correctAnswer;
    setFeedback({
      isCorrect,
      message: isCorrect
        ? "Woohoo! You nailed it! 🌍"
        : "Oops, not quite! Try again! ✈️",
    });
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-200 to-indigo-300 flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-indigo-800 mb-8 drop-shadow-md">
        Where Am I?
      </h1>

      {/* Clues Section */}
      <div className="max-w-2xl w-full mb-10">
        {quiz.clues.map((clue, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-4 shadow-lg border-l-4 border-yellow-400"
          >
            <p className="text-lg italic text-gray-700 font-serif">“{clue}”</p>
          </motion.div>
        ))}
      </div>

      {/* Options Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
        {quiz.options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(option)}
            disabled={!!selectedAnswer} // Disable after selection
            className={`p-4 rounded-lg text-white font-semibold text-lg shadow-md transition-colors duration-200 ${
              selectedAnswer === option
                ? feedback?.isCorrect
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {/* Feedback Section */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-center"
        >
          <p
            className={`text-xl font-bold ${feedback.isCorrect ? "text-green-600" : "text-red-600"}`}
          >
            {feedback.message}
          </p>
          <p className="text-gray-700 mt-2">
            The answer was:{" "}
            <span className="font-semibold">{quiz.correctAnswer}</span>
          </p>
          <button
            onClick={fetchNewQuiz}
            className="mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition duration-200"
          >
            Next Destination
          </button>
        </motion.div>
      )}
    </div>
  );
}
