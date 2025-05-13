"use client";

import type { PhilosophicalEra } from "@/prisma/generated/prisma";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { cn } from "@/src/lib/utils";
import { getPhilosophicalEra } from "@/src/utils/enum/get-philosophical-era";
import { SendIcon } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Philosopher = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  slug: string;
  era: PhilosophicalEra;
};

type Message = {
  id: string;
  content: string;
  sender: "user" | "philosopher";
  timestamp: Date;
  philosopher?: {
    name: string;
    avatar?: string;
  };
};

type ChatInterfaceProps = {
  philosopher: Philosopher;
};

export const ChatInterface = ({ philosopher }: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Welcome to a conversation with ${philosopher.name}. What would you like to discuss?`,
      sender: "philosopher",
      timestamp: new Date(),
      philosopher: {
        name: philosopher.name,
        avatar: philosopher.imageUrl,
      },
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const response = await fetch(`/api/chat/${philosopher.id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const philosopherResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          data.message || "I couldn't process your request. Please try again.",
        sender: "philosopher",
        timestamp: new Date(),
        philosopher: {
          name: philosopher.name,
          avatar: philosopher.imageUrl,
        },
      };

      setMessages((prev) => [...prev, philosopherResponse]);
    } catch (error) {
      console.error("Error sending message:", error);

      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm having trouble connecting at the moment. Please try again later.",
        sender: "philosopher",
        timestamp: new Date(),
        philosopher: {
          name: philosopher.name,
          avatar: philosopher.imageUrl,
        },
      };
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="flex h-[600px] flex-col border-0 bg-[#0d0d0e] text-white">
      <CardContent className="flex-1 p-0">
        <div className="flex items-center border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={philosopher.imageUrl} alt={philosopher.name} />
              <AvatarFallback>{philosopher.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{philosopher.name}</p>
              <p className="text-xs text-white/50">
                {getPhilosophicalEra(philosopher.era)}
              </p>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[470px]">
          <div className="flex flex-col gap-6 p-4 pb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.sender === "philosopher" && (
                  <Avatar className="mt-1 mr-3 h-8 w-8 flex-shrink-0">
                    <AvatarImage
                      src={message.philosopher?.avatar}
                      alt={message.philosopher?.name || "Philosopher"}
                    />
                    <AvatarFallback>
                      {message.philosopher?.name?.[0] || "P"}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%]",
                    message.sender === "user" ? "text-right" : "",
                  )}
                >
                  <div className="inline-block">
                    <p className="leading-relaxed">{message.content}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-xs text-white/40">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <Avatar className="mt-1 mr-3 h-8 w-8">
                  <AvatarImage
                    src={philosopher.imageUrl}
                    alt={philosopher.name}
                  />
                  <AvatarFallback>{philosopher.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex h-8 items-center space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white/30"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-white/30"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-white/30"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t border-white/10 p-3">
        <form onSubmit={onSubmit} className="flex w-full gap-2">
          <Input
            defaultValue={input}
            name="message"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setInput(event.target.value)
            }
            placeholder={`Message ${philosopher.name}...`}
            disabled={isLoading}
            className="border-0 bg-[#1a1a1a] text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-white px-3 text-black hover:bg-white/90"
            aria-label="Send message"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
