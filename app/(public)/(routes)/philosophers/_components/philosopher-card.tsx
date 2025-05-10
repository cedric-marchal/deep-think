import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";

import Image from "next/image";
import Link from "next/link";

type PhilosopherProps = {
  id: string;
  name: string;
  era: string;
  imageUrl: string;
  description: string;
};

export const PhilosopherCard = ({
  id,
  name,
  era,
  imageUrl,
  description,
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
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-muted-foreground text-sm">{era}</p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" type="button">
          <Link href={`/protected/chat/${id}`}>Chat with {name}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
