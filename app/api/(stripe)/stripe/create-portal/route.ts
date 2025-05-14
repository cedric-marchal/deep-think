import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { createCustomerPortalSession } from "@/src/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Get authenticated user
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the return URL from the request body
    const body = await req.json();
    const { returnUrl } = body;

    if (!returnUrl) {
      return new NextResponse("Return URL is required", { status: 400 });
    }

    // Check if user has a Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return new NextResponse("User does not have a Stripe customer ID", {
        status: 400,
      });
    }

    // Create a customer portal session
    const portalSession = await createCustomerPortalSession(
      user.stripeCustomerId,
      returnUrl,
    );

    // Return the portal session URL
    return NextResponse.json({
      url: portalSession.url,
    });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return new NextResponse("Error creating portal session", { status: 500 });
  }
}
