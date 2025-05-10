export default async function PhilosopherChatPage(props: {
  params: Promise<{ philosopherId: string }>;
}) {
  const params = await props.params;
  const philosopherId = params.philosopherId;

  // This would normally fetch philosopher data from an API
  const philosopher = {
    id: philosopherId,
    name:
      philosopherId === "socrates"
        ? "Socrates"
        : philosopherId === "plato"
          ? "Plato"
          : philosopherId === "aristotle"
            ? "Aristotle"
            : "Unknown Philosopher",
    imageUrl: `/images/philosophers/${philosopherId}.jpg`,
  };

  return (
    <div className="container flex h-[calc(100vh-200px)] flex-col py-4">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-2xl font-bold">
          Conversation with {philosopher.name}
        </h1>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border">
        {/* <ChatWindow philosopherId={philosopherId} />
        <MessageInput philosopherId={philosopherId} /> */}
      </div>
    </div>
  );
}
