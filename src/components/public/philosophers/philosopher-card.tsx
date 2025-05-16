import type { PhilosophicalEra } from "@/prisma/generated/prisma";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { getPhilosophicalEra } from "@/src/utils/enum/get-philosophical-era";
import { truncateString } from "@/src/utils/string/truncate-string";

import Image from "next/image";
import Link from "next/link";

import {
  MotionArticle,
  MotionHeading3,
  MotionParagraph,
} from "./motion-components";

type PhilosopherProps = {
  imageUrl: string;
  name: string;
  slug: string;
  description: string;
  era: PhilosophicalEra;
  isLoggedIn: boolean;
};

export const PhilosopherCard = ({
  imageUrl,
  name,
  slug,
  description,
  era,
  isLoggedIn,
}: PhilosopherProps) => {
  return (
    <MotionArticle>
      <Card className="h-full overflow-hidden py-0 transition-shadow hover:shadow-md">
        <div className="relative block h-72 w-full overflow-hidden transition-transform duration-500 hover:scale-105">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 transition-opacity duration-300 hover:opacity-100" />
        </div>
        <CardHeader className="pb-2">
          <MotionHeading3
            className="hover:text-primary text-xl font-bold transition-colors"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {truncateString(name, 50)}
          </MotionHeading3>
          <MotionParagraph
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {getPhilosophicalEra(era)}
          </MotionParagraph>
        </CardHeader>
        <CardContent>
          <MotionParagraph
            className="line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            {truncateString(description, 150)}
          </MotionParagraph>
        </CardContent>
        <CardFooter className="mb-6">
          {isLoggedIn ? (
            <Button asChild className="w-full" type="button">
              <Link href={`/dashboard/chat/${slug}`}>
                Chat with {truncateString(name, 20)}
              </Link>
            </Button>
          ) : (
            <Button asChild className="w-full" type="button">
              <Link href={`/sign-in`}>Sign in to chat</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </MotionArticle>
  );
};
