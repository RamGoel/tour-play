import { destinationArray } from "@/lib/data";
import { COOKIE_KEY } from "@/utils/constants";
import { customEncode } from "@/utils/helpers";
import { cookies } from "next/headers";

export async function GET() {
  const userId = (await cookies()).get(COOKIE_KEY)?.value || "";

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
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
      correctAnswer: customEncode(correctDestination.destination),
      funFact: customEncode(correctDestination.funFact),
    },
    { status: 200 },
  );
}
