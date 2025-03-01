/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/components/Loader";
import { API } from "@/lib/axios";
import { useStore } from "@/lib/store";
import { TUser } from "@/utils/types";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Globe,
  Lightbulb,
  MapPin,
  RefreshCw,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type Quiz = {
  clues: string[];
  options: string[];
  correctAnswer: string;
  funFact: string;
  trivia: string;
  surprise: string;
};

type Feedback = {
  isCorrect: boolean;
  message: string;
};

export default function GamePage() {
  const {
    user,
    setUser,
    setShowConfetti,
    setShowSadFace,
    correctAnswers,
    incorrectAnswers,
  } = useStore();
  const [quiz, setQuiz] = useState<null | Quiz>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<null | Feedback>(null);

  const fetchNewQuiz = async () => {
    const response = await API.get("/get-quiz");
    setQuiz(response.data);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  useEffect(() => {
    fetchNewQuiz();
  }, []);

  const handleAnswer = async (answer: string) => {
    if (!quiz) return;
    setSelectedAnswer(answer);
    await new Promise((res) => setTimeout(res, 300)); // delay
    const isCorrect = answer === quiz.correctAnswer;
    setFeedback({
      isCorrect,
      message: isCorrect
        ? "Woohoo! You nailed it! 🌍"
        : "Oops, not quite! Try again! ✈️",
    });

    let timeoutId: any = "x";
    if (isCorrect) {
      setShowConfetti(true);
      timeoutId = setTimeout(() => {
        setShowConfetti(false);
        clearTimeout(timeoutId);
      }, 4000);
      const newScore = (user?.score || 0) + 1;
      API.put("/auth", { score: newScore });
      setUser({ ...user, score: newScore } as TUser);
      useStore.setState({ correctAnswers: correctAnswers + 1 });
    } else {
      setShowSadFace(true);
      timeoutId = setTimeout(() => {
        setShowSadFace(false);
        clearTimeout(timeoutId);
      }, 2000);
      useStore.setState({ incorrectAnswers: incorrectAnswers + 1 });
    }
  };

  if (!quiz) return <Loader />;

  return (
    <div className="flex-grow bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header with logo and stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-5 w-full">
          <div className="flex items-center mb-4 sm:mb-0">
            <Globe className="text-indigo-600 mr-2" size={32} />
            <h1 className="text-4xl font-bold text-indigo-800 drop-shadow-md">
              Globetrotter
            </h1>
          </div>

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

        {/* Main game container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-5">
          {/* Question header */}
          <div className="bg-indigo-600 text-white p-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <MapPin className="mr-2" />
              Where Am I?
            </h2>
          </div>

          {/* Clues section */}
          <div className="p-6">
            <div className="space-y-4 mb-8">
              {quiz.clues.map((clue, index) => (
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
            </div>

            {/* Options grid */}
            {!feedback ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quiz.options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(option)}
                    className={`p-4 rounded-lg text-white font-semibold text-lg shadow-md transition-colors duration-200 ${selectedAnswer === option ? (selectedAnswer === quiz.correctAnswer ? "bg-green-500" : "bg-red-500") : "bg-indigo-600 hover:bg-indigo-700"} `}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                {/* Feedback section */}
                <div
                  className={`rounded-lg p-4 mb-6 ${feedback.isCorrect ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"}`}
                >
                  <p
                    className={`text-2xl font-bold mb-2 ${feedback.isCorrect ? "text-green-600" : "text-red-600"}`}
                  >
                    {feedback.message}
                  </p>
                </div>

                {/* Fun fact */}
                <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-200">
                  <h3 className="text-xl font-semibold text-yellow-700 mb-2">
                    Did You Know?
                  </h3>
                  <p className="text-gray-700">{quiz.funFact}</p>
                </div>

                {/* Next question button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchNewQuiz}
                  className="mx-auto mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
                >
                  <RefreshCw size={20} />
                  Next Destination
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
