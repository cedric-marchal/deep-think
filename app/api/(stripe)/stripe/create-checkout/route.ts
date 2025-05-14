import { getCurrentSession } from "@/src/lib/auth-session";
import { prisma } from "@/src/lib/prisma";
import { createCheckoutSession } from "@/src/lib/stripe";
import { UnauthorizedError } from "@/src/utils/api/handle-api-error";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentSession = await getCurrentSession();

    if (!currentSession) {
      throw new UnauthorizedError("Unauthorized");
    }

    // Get the return URL from the request body
    const body = await req.json();
    const { returnUrl } = body;

    if (!returnUrl) {
      return new NextResponse("Return URL is required", { status: 400 });
    }

    // Check if user already has a Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { id: currentSession.user.id },
      select: { stripeCustomerId: true },
    });

    let stripeCustomerId = user?.stripeCustomerId;

    // Create a checkout session
    const checkoutSession = await createCheckoutSession(
      stripeCustomerId || currentSession.user.id,
      returnUrl,
    );

    // Return the checkout session URL
    return NextResponse.json({
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Error creating checkout session", { status: 500 });
  }
}
