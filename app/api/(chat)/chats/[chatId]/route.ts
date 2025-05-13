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

const UpdateChatNameSchema = z.object({
  chatName: z
    .string()
    .min(1, "Chat name is required")
    .max(30, "Chat name must be less than 30 characters"),
});

export async function PATCH(
  request: Request,
  { params }: { params: { chatId: string } },
) {
  try {
    const userSession = await getUserSession();

    if (!userSession) {
      throw new UnauthorizedError("Unauthorized");
    }

    const chatId = params.chatId;

    if (!chatId) {
      throw new BadRequestError("Chat ID is required");
    }

    const existingChat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!existingChat) {
      throw new NotFoundError("Chat not found");
    }

    if (existingChat.userId !== userSession.id) {
      throw new UnauthorizedError(
        "You don't have permission to edit this chat",
      );
    }

    const formData = await request.formData();

    const updateData = UpdateChatNameSchema.parse({
      chatName: formData.get("chatName"),
    });

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        name: updateData.chatName,
      },
    });

    if (!updatedChat) {
      throw new BadRequestError("Failed to update chat name");
    }

    return NextResponse.json(updatedChat);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { chatId: string } },
) {
  try {
    const userSession = await getUserSession();

    if (!userSession) {
      throw new UnauthorizedError("Unauthorized");
    }

    const chatId = params.chatId;

    if (!chatId) {
      throw new BadRequestError("Chat ID is required");
    }

    const existingChat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!existingChat) {
      throw new NotFoundError("Chat not found");
    }

    if (existingChat.userId !== userSession.id) {
      throw new UnauthorizedError(
        "You don't have permission to delete this chat",
      );
    }

    await prisma.chatMessage.deleteMany({
      where: {
        chatId,
      },
    });

    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

    return NextResponse.json({
      message: "Chat deleted successfully",
      success: true,
    });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
