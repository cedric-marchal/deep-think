import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get authenticated user
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { hasSubscription: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    // Check if user has an active subscription
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { hasActiveSubscription: true },
    });

    if (!user) {
      return NextResponse.json(
        { hasSubscription: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      hasSubscription: user.hasActiveSubscription,
    });
  } catch (error) {
    console.error("Error checking subscription:", error);
    return NextResponse.json(
      { hasSubscription: false, message: "Error checking subscription" },
      { status: 500 },
    );
  }
}
