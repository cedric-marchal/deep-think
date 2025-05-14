import { getCurrentSession } from "@/src/lib/auth-session";
import { env } from "@/src/lib/env";
import { prisma } from "@/src/lib/prisma";
import { stripe } from "@/src/lib/stripe";

import {
  BadRequestError,
  handleApiError,
  NotFoundError,
  UnauthorizedError,
} from "@/src/utils/api/handle-api-error";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentSession = await getCurrentSession();

    if (!currentSession) {
      throw new UnauthorizedError("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { id: currentSession.user.id },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!user || !user.stripeCustomerId) {
      throw new NotFoundError("User not found");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: user.stripeCustomerId,
      line_items: [
        {
          price: env.STRIPE_CHAT_SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${env.NEXT_PUBLIC_BASE_URL}/dashboard/chat`,
      cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/dashboard/chat`,
    });

    if (!session) {
      throw new BadRequestError("Failed to create checkout session");
    }

    return NextResponse.json(session, { status: 201 });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
