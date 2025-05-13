import { getUserSession } from "@/src/lib/auth-session";
import { prisma } from "@/src/lib/prisma";
import {
  BadRequestError,
  handleApiError,
  NotFoundError,
  UnauthorizedError,
} from "@/src/utils/api/handle-api-error";
import { NextResponse } from "next/server";
import { z } from "zod";

const ChatSchema = z.object({
  philosopherId: z.string(),
});

export async function POST(request: Request) {
  try {
    const userSession = await getUserSession();

    if (!userSession) {
      throw new UnauthorizedError("Unauthorized");
    }

    const formData = await request.formData();

    const chatBody = ChatSchema.parse({
      philosopherId: formData.get("philosopherId"),
    });

    const philosopher = await prisma.philosopher.findUnique({
      where: {
        id: chatBody.philosopherId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!philosopher) {
      throw new NotFoundError("Philosopher not found");
    }

    const chat = await prisma.chat.create({
      data: {
        name: `Discussion with ${philosopher.name}`,
        philosopherId: chatBody.philosopherId,
        userId: userSession.id,
      },
    });

    if (!chat) {
      throw new BadRequestError("Failed to create chat");
    }

    return NextResponse.json(chat);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
