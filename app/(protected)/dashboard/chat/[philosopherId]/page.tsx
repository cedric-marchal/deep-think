import { ChatInterface } from "@/src/components/protected/dashboard/chat/philosopherId/chat-interface";
import { SubscriptionRequired } from "@/src/components/protected/dashboard/chat/subscription-required";
import { checkActiveSubscription } from "@/src/lib/auth/require-subscription";
import { env } from "@/src/lib/env";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { philosopherId: string };
}) {
  const chat = await prisma.chat.findUnique({
    where: { id: params.philosopherId },
    select: { name: true },
  });

  if (!chat) {
    notFound();
  }

  return {
    title: `${chat.name} | ${env.NEXT_PUBLIC_APP_NAME}`,
  };
}

export default async function ChatPage({
  params: { philosopherId },
}: {
  params: { philosopherId: string };
}) {
  // Dans cette page, nous avons besoin d'un comportement spécial pour les utilisateurs sans abonnement
  // au lieu de rediriger, nous affichons un composant SubscriptionRequired
  const { isAuthenticated, hasSubscription, user, currentSession } =
    await checkActiveSubscription();

  if (!isAuthenticated || !user) {
    notFound();
  }

  if (!hasSubscription) {
    return (
      <div className="container py-8">
        <SubscriptionRequired
          hasStripeAccount={!!user.stripeCustomerId}
          userId={currentSession!.user.id}
        />
      </div>
    );
  }

  const chat = await prisma.chat.findUnique({
    where: { id: philosopherId },
    include: {
      philosopher: true,
    },
  });

  if (!chat) {
    return notFound();
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Conversation with {chat.philosopher.name}
      </h1>
      <ChatInterface philosopher={chat.philosopher} />
    </div>
  );
}
