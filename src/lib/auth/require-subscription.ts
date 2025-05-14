import { getCurrentSession } from "@/src/lib/auth-session";
import { prisma } from "@/src/lib/prisma";
import { getActiveChatSubscription } from "@/src/utils/stripe/get-active-chat-subscription";
import { redirect } from "next/navigation";

export async function checkActiveSubscription() {
  const currentSession = await getCurrentSession();

  if (!currentSession) {
    return {
      isAuthenticated: false,
      hasSubscription: false,
      currentSession: null,
      user: null,
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: currentSession.user.id },
    select: {
      stripeCustomerId: true,
    },
  });

  if (!user || !user.stripeCustomerId) {
    return {
      isAuthenticated: true,
      hasSubscription: false,
      currentSession,
      user,
    };
  }

  const activeSubscription = await getActiveChatSubscription(
    user.stripeCustomerId,
  );

  const hasSubscription = activeSubscription.length > 0;

  return {
    isAuthenticated: true,
    hasSubscription,
    currentSession,
    user,
    activeSubscription,
  };
}

export async function requireActiveSubscription() {
  const { isAuthenticated, hasSubscription, user, currentSession } =
    await checkActiveSubscription();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  if (!hasSubscription) {
    redirect("/dashboard/billing");
  }

  return { user, currentSession };
}
