"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useState } from "react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "philosopher";
  timestamp: Date;
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome! Select a philosopher from the sidebar to start a conversation or ask me a question directly.",
      sender: "philosopher",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "This is a simulated response. In a real application, this would come from the API.",
        sender: "philosopher",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader>
        <CardTitle>Deep Think Chat</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[450px] p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex max-w-[80%] flex-col rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <span className="mt-1 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="bg-muted flex max-w-[80%] animate-pulse flex-col rounded-lg p-3">
                <p>Thinking...</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t p-3">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a philosophical question..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
