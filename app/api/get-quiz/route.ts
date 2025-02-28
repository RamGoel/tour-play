import { destinationArray } from "@/lib/data";

export async function GET() {
  const destinations = destinationArray;
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

  return Response.json(
    {
      clues: correctDestination.clues,
      options: options,
      correctAnswer: correctDestination.destination,
      funFact: correctDestination.funFact,
      trivia: correctDestination.trivia,
      surprise: correctDestination.surprise,
    },
    { status: 200 },
  );
}
