import { NextResponse } from "next/server";

import { prisma } from "@/src/lib/prisma";
import {
  handleApiError,
  NotFoundError,
} from "@/src/utils/api/handle-api-error";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ philosopherId: string }> },
) {
  try {
    const { philosopherId } = await params;

    const philosopher = await prisma.philosopher.findUnique({
      where: {
        id: philosopherId,
      },
      select: {
        id: true,
      },
    });

    if (!philosopher) {
      throw new NotFoundError("Philosopher not found");
    }

    await prisma.philosopher.delete({
      where: {
        id: philosopherId,
      },
    });

    return NextResponse.json({ message: "Philosopher deleted successfully" });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
