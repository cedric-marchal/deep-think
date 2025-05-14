import { env } from "@/src/lib/env";
import { stripe } from "@/src/lib/stripe";

export async function getActiveChatSubscription(customerId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
    price: env.STRIPE_CHAT_SUBSCRIPTION_PRICE_ID,
  });

  return subscriptions.data;
}
