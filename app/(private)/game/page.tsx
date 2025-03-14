"use client";

import AnswerOptions from "@/components/AnswerOptions";
import ChallengeModal from "@/components/ChallengeModal";
import CluesList from "@/components/CluesList";
import Loader from "@/components/Loader";
import QuizFeedback from "@/components/QuizFeedback";
import StatsHeader from "@/components/StatsHeader";
import { API } from "@/lib/axios";
import { useStore } from "@/lib/store";
import { APP_NAME, CHARS } from "@/utils/constants";
import {
  customDecode,
  playCancelSound,
  playSuccessSound,
} from "@/utils/helpers";
import { Feedback, Quiz, TUser } from "@/utils/types";
import { toPng } from "html-to-image";
import { MapPin, Timer, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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
  const [visibleClues, setVisibleClues] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [timerActive, setTimerActive] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout>();

  const [showItem, setShowItem] = useState(false);
  const scoreRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [dynamicImage, setDynamicImage] = useState<string | null>(null);

  const handleChallengeClick = async () => {
    if (!user?.username) return;

    if (user.score === 0) {
      return toast.error("Please do atleast 1 score");
    }

    const url = `${window.location.origin}/invite?inviter=${encodeURIComponent(user?.id)}`;
    setInviteLink(url);
    setShowItem(true);

    if (scoreRef.current) {
      const image = await toPng(scoreRef.current);
      setDynamicImage(image);
    }

    setShowItem(false);
    setIsModalOpen(true);
  };

  const startTimer = () => {
    setTimerActive(true);
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          setVisibleClues(2);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerInterval(interval);
  };

  // takes option text/keypressed as param
  const handleAnswer = async (answer: string) => {
    if (!quiz) return;

    // if keystroke is passed, get option from keystroke
    if (answer.length === 1) {
      answer = quiz.options[CHARS.indexOf(answer)];
    }

    // Clear the timer when user selects an answer
    if (timerInterval) clearInterval(timerInterval);
    setTimerActive(false);

    setSelectedAnswer(answer);
    await new Promise((res) => setTimeout(res, 300)); // delay
    const isCorrect = answer === quiz.correctAnswer;

    setFeedback({
      isCorrect,
      message: isCorrect
        ? "Woohoo! You nailed it! 🌍"
        : "Oops, not quite! Try again! ✈️",
    });

    let timeoutId: NodeJS.Timeout;
    if (isCorrect) {
      playSuccessSound();
      setShowConfetti(true);
      timeoutId = setTimeout(() => {
        setShowConfetti(false);
        clearTimeout(timeoutId);
      }, 4000);

      // Award points based on number of visible clues
      const pointsEarned = visibleClues === 1 ? 2 : 1;
      const newScore = (user?.score || 0) + pointsEarned;

      API.put("/auth", { score: newScore });
      setUser({ ...user, score: newScore } as TUser);
      useStore.setState({ correctAnswers: correctAnswers + 1 });
    } else {
      playCancelSound();
      setShowSadFace(true);
      timeoutId = setTimeout(() => {
        setShowSadFace(false);
        clearTimeout(timeoutId);
      }, 2000);
      useStore.setState({ incorrectAnswers: incorrectAnswers + 1 });
    }
  };

  const fetchNewQuiz = async () => {
    const response = await API.get("/get-quiz");
    setQuiz({
      ...response.data,
      correctAnswer: customDecode(response.data.correctAnswer),
      funFact: customDecode(response.data.funFact),
    });
    setSelectedAnswer(null);
    setFeedback(null);
    setVisibleClues(1);
    setTimeRemaining(5);
    setShowConfetti(false);
    setShowSadFace(false);
    startTimer();
  };

  useEffect(() => {
    fetchNewQuiz();
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  if (!quiz) return <Loader />;

  return (
    <div className="flex-grow bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 flex flex-col items-center justify-center">
      <div
        style={{
          position: "fixed",
          visibility: showItem ? "visible" : "hidden",
          zIndex: -1,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="w-fit"
      >
        <div
          ref={scoreRef}
          className="flex p-3 flex-col items-start gap-2 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 rounded-lg shadow-md max-w-md"
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
            Think you can beat this? Try {APP_NAME} now!
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <StatsHeader
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          onChallengeClick={handleChallengeClick}
        />

        <div className="bg-white/90 mx-4 md:mx-0 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-5">
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold flex items-center">
              <MapPin className="mr-2" />
              Where Am I?
            </h2>
            {!feedback && timerActive && (
              <div className="flex items-center bg-indigo-500 rounded-full px-3 py-1">
                <Timer className="text-white mr-1" size={18} />
                <span className="font-bold">{timeRemaining}s</span>
              </div>
            )}
          </div>

          <div className="p-6">
            <CluesList
              clues={quiz.clues}
              visibleClues={visibleClues}
              feedback={feedback}
              timeRemaining={timeRemaining}
            />

            {!feedback ? (
              <AnswerOptions
                options={quiz.options}
                selectedAnswer={selectedAnswer}
                correctAnswer={quiz.correctAnswer}
                onSelect={handleAnswer}
              />
            ) : (
              <QuizFeedback
                feedback={feedback}
                visibleClues={visibleClues}
                funFact={quiz.funFact}
                onNextQuestion={fetchNewQuiz}
              />
            )}
          </div>
        </div>
      </div>

      <ChallengeModal
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        inviteLink={inviteLink}
        dynamicImage={dynamicImage || ""}
      />
    </div>
  );
}
