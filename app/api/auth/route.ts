import prisma from "@/prisma/client";
import { HEADER_AUTH_KEY } from "@/utils/constants";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    const usernameExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (usernameExists) {
      return Response.json(
        { error: "Username Aready Exists" },
        { status: 400 },
      );
    }

    const newUser = await prisma.user.create({
      data: {
        username,
      },
    });

    if (newUser) {
      (await cookies()).set(HEADER_AUTH_KEY, newUser.id);
      return Response.json(newUser);
    } else {
      throw Error();
    }
  } catch {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    let userId = "";
    const { searchParams } = new URL(req.url);
    const tempId = searchParams.get("userId");
    if (tempId) {
      userId = tempId;
    } else {
      userId = (await cookies()).get(HEADER_AUTH_KEY)?.value || "";
    }

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const matchedUser = await prisma.user.findFirst({
      where: {
        ...(tempId ? { username: tempId } : { id: userId }),
      },
    });

    if (matchedUser) {
      return Response.json(matchedUser);
    } else {
      throw Error();
    }
  } catch (err) {
    console.log(err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const userId = (await cookies()).get(HEADER_AUTH_KEY);
    const { score } = await req.json();

    if (!userId?.value) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId.value,
      },
      data: {
        score,
      },
    });

    return Response.json(updatedUser);
  } catch {
    return Response.json({ error: "Something went wrong" });
  }
}
