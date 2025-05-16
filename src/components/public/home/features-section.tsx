export const FeaturesSection = () => {
  return (
    <section className="bg-muted w-full py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Why DeepThink?</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <svg
                className="text-primary h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Authentic Philosophical Voices
            </h3>
            <p className="text-muted-foreground">
              Our AI is trained on the complete works and historical records of
              each philosopher, ensuring authentic perspectives.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <svg
                className="text-primary h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Natural Conversations</h3>
            <p className="text-muted-foreground">
              Ask questions, debate ideas, or just chat casually with
              philosophers from any era in history.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <svg
                className="text-primary h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Learn Through Dialogue</h3>
            <p className="text-muted-foreground">
              Gain deeper understanding of complex philosophical concepts
              through interactive conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
