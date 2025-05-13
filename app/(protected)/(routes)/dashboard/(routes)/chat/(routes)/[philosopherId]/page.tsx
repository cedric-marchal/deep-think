import { env } from "@/src/lib/env";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { ChatInterface } from "./_components/chat-interface";

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

export default async function PhilosopherChatPage(props: {
  params: Promise<{ philosopherId: string }>;
}) {
  const params = await props.params;

  const philosopherId = params.philosopherId;

  const chat = await prisma.chat.findUnique({
    where: { id: philosopherId },
    include: {
      philosopher: true,
    },
  });

  if (!chat) {
    notFound();
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
