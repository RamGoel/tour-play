import { User } from "@prisma/client";

export interface Destination {
  destination: string;
  clues: string[];
  funFact: string;
  trivia: string;
  surprise: string;
}

export type TUser = User;
