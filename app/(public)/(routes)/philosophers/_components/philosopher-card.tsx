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

type PhilosopherProps = {
  imageUrl: string;
  name: string;
  slug: string;
  description: string;
  era: PhilosophicalEra;
};

export const PhilosopherCard = ({
  imageUrl,
  name,
  slug,
  description,
  era,
}: PhilosopherProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">{truncateString(name, 20)}</h3>
        <p className="text-muted-foreground text-sm">
          {getPhilosophicalEra(era)}
        </p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{truncateString(description, 100)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" type="button">
          <Link href={`/protected/chat/${slug}`}>
            Chat with {truncateString(name, 20)}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
