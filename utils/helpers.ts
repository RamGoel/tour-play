import { Destination } from "./types";

export function getRandomQuiz(destinations: Destination[]) {
  if (destinations.length < 4) {
    throw new Error(
      "At least 4 destinations are required to generate options.",
    );
  }

  const shuffled = [...destinations].sort(() => Math.random() - 0.5);
  const correctDestination = shuffled[0];

  const incorrectOptions = shuffled.slice(1, 4).map((dest) => dest.destination);

  const options = [correctDestination.destination, ...incorrectOptions].sort(
    () => Math.random() - 0.5,
  );

  return {
    clues: correctDestination.clues,
    options: options,
    correctAnswer: correctDestination.destination,
  };
}
