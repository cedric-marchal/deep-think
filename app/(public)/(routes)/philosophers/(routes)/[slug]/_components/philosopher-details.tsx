import { PhilosophicalEra } from "@/prisma/generated/prisma";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { getPhilosophicalEra } from "@/src/utils/enum/get-philosophical-era";
import { ExternalLink, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Import animation utilities
import {
  fadeIn,
  fadeInUp,
  listItemAnimation,
  quoteAnimation,
  scaleUp,
  slideIn,
  staggerContainer,
} from "./animations";
import {
  MotionBadge,
  MotionCard,
  MotionDiv,
  MotionHeading,
  MotionImage,
  MotionLi,
  MotionParagraph,
  MotionSection,
  MotionUl,
} from "./motion-components";

type PhilosopherDetailsProps = {
  id: string;
  name: string;
  slug: string;
  era: PhilosophicalEra;
  imageUrl: string;
  description: string;
  birthDate: Date;
  deathDate: Date | null;
  birthPlace: string;
  deathPlace: string | null;
  schoolOfThought: string;
  notableWorks: string[];
  mainIdeas: string[];
  influences: string[];
  influenced: string[];
  quotes: string[];
  wikipediaUrl: string;
  isLoggedIn: boolean;
};

export const PhilosopherDetails = ({
  name,
  slug,
  era,
  imageUrl,
  description,
  birthDate,
  deathDate,
  birthPlace,
  deathPlace,
  schoolOfThought,
  notableWorks,
  mainIdeas,
  influences,
  influenced,
  quotes,
  wikipediaUrl,
  isLoggedIn,
}: PhilosopherDetailsProps) => {
  // Format dates
  const formatDate = (date: Date | null) => {
    if (!date) return "Unknown";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Calculate lifespan years
  const birthYear = birthDate.getFullYear();
  const deathYear = deathDate ? deathDate.getFullYear() : "present";
  const lifespan = `${birthYear} - ${deathYear}`;

  return (
    <MotionSection {...staggerContainer} className="flex flex-col gap-8">
      {/* Hero section */}
      <MotionDiv
        {...staggerContainer}
        className="flex flex-col items-center md:flex-row md:items-start md:gap-8"
      >
        <MotionImage
          {...scaleUp}
          className="relative mb-6 h-64 w-64 overflow-hidden rounded-full md:h-80 md:w-80"
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 256px, 320px"
            priority
          />
        </MotionImage>
        <MotionDiv {...staggerContainer} className="flex flex-col">
          <MotionDiv
            {...staggerContainer}
            className="mb-4 text-center md:text-left"
          >
            <MotionHeading {...fadeInUp} className="mb-2 text-4xl font-bold">
              {name}
            </MotionHeading>
            <MotionBadge {...fadeInUp} className="inline-block">
              <Badge variant="outline" className="mb-3">
                {getPhilosophicalEra(era)}
              </Badge>
            </MotionBadge>
            <MotionParagraph
              {...fadeInUp}
              className="text-muted-foreground text-lg"
            >
              {lifespan} • {birthPlace}
              {deathPlace ? ` to ${deathPlace}` : ""}
            </MotionParagraph>
          </MotionDiv>
          <MotionParagraph {...fadeInUp} className="mb-4 text-lg">
            {description}
          </MotionParagraph>
          <MotionDiv
            {...fadeInUp}
            className="flex flex-col gap-2 sm:flex-row sm:gap-4"
          >
            {isLoggedIn ? (
              <Button className="w-full sm:w-auto" type="button" asChild>
                <Link href={`/dashboard/chat/${slug}`}>Chat with {name}</Link>
              </Button>
            ) : (
              <Button className="w-full sm:w-auto" type="button" asChild>
                <Link href="/sign-in">Sign in to Chat</Link>
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <Link
                href={wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </MotionDiv>
        </MotionDiv>
      </MotionDiv>

      {/* Biographical details */}
      <MotionCard {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle>Biographical Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                Born
              </h3>
              <p>
                {formatDate(birthDate)} in {birthPlace}
              </p>
            </div>
            <div>
              <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                Died
              </h3>
              <p>
                {deathDate
                  ? `${formatDate(deathDate)} in ${deathPlace || "Unknown"}`
                  : "Still alive"}
              </p>
            </div>
            <div>
              <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                School of Thought
              </h3>
              <p>{schoolOfThought}</p>
            </div>
            <div>
              <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                Era
              </h3>
              <p>{getPhilosophicalEra(era)}</p>
            </div>
          </CardContent>
        </Card>
      </MotionCard>

      {/* Main ideas */}
      <MotionCard {...slideIn}>
        <Card>
          <CardHeader>
            <CardTitle>Main Ideas</CardTitle>
            <CardDescription>
              Key philosophical concepts developed by {name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MotionUl
              {...staggerContainer}
              className="ml-6 list-disc space-y-2"
            >
              {mainIdeas.map((idea, index) => (
                <MotionLi key={index} {...listItemAnimation}>
                  {idea}
                </MotionLi>
              ))}
            </MotionUl>
          </CardContent>
        </Card>
      </MotionCard>

      {/* Notable works */}
      <MotionCard {...slideIn}>
        <Card>
          <CardHeader>
            <CardTitle>Notable Works</CardTitle>
            <CardDescription>Major publications and writings</CardDescription>
          </CardHeader>
          <CardContent>
            <MotionUl
              {...staggerContainer}
              className="ml-6 list-disc space-y-2"
            >
              {notableWorks.map((work, index) => (
                <MotionLi key={index} {...listItemAnimation}>
                  {work}
                </MotionLi>
              ))}
            </MotionUl>
          </CardContent>
        </Card>
      </MotionCard>

      {/* Influences and Legacy */}
      <div className="grid gap-6 md:grid-cols-2">
        <MotionCard {...fadeIn} className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Influences</CardTitle>
              <CardDescription>Thinkers who influenced {name}</CardDescription>
            </CardHeader>
            <CardContent>
              <MotionUl
                {...staggerContainer}
                className="ml-6 list-disc space-y-2"
              >
                {influences.map((influence, index) => (
                  <MotionLi key={index} {...listItemAnimation}>
                    {influence}
                  </MotionLi>
                ))}
              </MotionUl>
            </CardContent>
          </Card>
        </MotionCard>

        <MotionCard {...fadeIn} className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Influenced</CardTitle>
              <CardDescription>Thinkers influenced by {name}</CardDescription>
            </CardHeader>
            <CardContent>
              <MotionUl
                {...staggerContainer}
                className="ml-6 list-disc space-y-2"
              >
                {influenced.map((person, index) => (
                  <MotionLi key={index} {...listItemAnimation}>
                    {person}
                  </MotionLi>
                ))}
              </MotionUl>
            </CardContent>
          </Card>
        </MotionCard>
      </div>

      {/* Quotes */}
      <MotionCard {...fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle>Notable Quotes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quotes.map((quote, index) => (
              <MotionDiv
                key={index}
                {...quoteAnimation}
                className="bg-primary/5 flex rounded-lg p-4"
              >
                <Quote className="text-primary mr-3 h-6 w-6 shrink-0" />
                <p className="italic">{quote}</p>
              </MotionDiv>
            ))}
          </CardContent>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      href={wikipediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more about {name}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit Wikipedia page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </MotionCard>
    </MotionSection>
  );
};
