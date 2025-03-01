import { User } from "@prisma/client";

export interface Destination {
  destination: string;
  clues: string[];
  funFact: string;
  trivia: string;
  surprise: string;
}

export type Quiz = {
  clues: string[];
  options: string[];
  correctAnswer: string;
  funFact: string;
};

export type Feedback = {
  isCorrect: boolean;
  message: string;
};

export type TUser = User;
