import { getCurrentSession } from "@/src/lib/auth-session";
import { prisma } from "@/src/lib/prisma";
import {
  BadRequestError,
  handleApiError,
  UnauthorizedError,
} from "@/src/utils/api/handle-api-error";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UserUpdateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  image: z.string().url(),
});

export async function PATCH(request: NextRequest) {
  try {
    const session = await getCurrentSession();

    if (!session) {
      throw new UnauthorizedError("Unauthorized");
    }

    const formData = await request.formData();

    const userUpdateBody = UserUpdateSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      image: formData.get("image"),
    });

    const userUpdated = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: userUpdateBody.name,
        email: userUpdateBody.email,
        image: userUpdateBody.image,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: userUpdated,
    });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getCurrentSession();

    if (!session) {
      throw new UnauthorizedError("Unauthorized");
    }

    const [userDeleted, chatsDeleted] = await prisma.$transaction([
      prisma.user.delete({
        where: {
          id: session.user.id,
        },
      }),
      prisma.chat.deleteMany({
        where: { userId: session.user.id },
      }),
    ]);

    if (!userDeleted || !chatsDeleted) {
      throw new BadRequestError("Failed to delete user");
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
