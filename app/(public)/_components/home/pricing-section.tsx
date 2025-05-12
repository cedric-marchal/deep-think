import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";

const PricingCheckMark = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center">
    <svg
      className="text-primary mr-2 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
    {children}
  </li>
);

export const PricingSection = () => {
  return (
    <section className="w-full max-w-7xl px-4 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Simple, Transparent Pricing
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Basic Plan */}
        <Card className="flex flex-col border-2">
          <CardContent className="flex flex-1 flex-col p-6">
            <h3 className="mb-2 text-xl font-bold">Starter</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold">€9.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Separator className="my-4" />
            <ul className="mb-6 space-y-2 text-sm">
              <PricingCheckMark>Chat with 10 philosophers</PricingCheckMark>
              <PricingCheckMark>100 messages per day</PricingCheckMark>
              <PricingCheckMark>Save 5 conversations</PricingCheckMark>
            </ul>
            <Button asChild className="mt-auto w-full" type="button">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-primary flex flex-col border-2">
          <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
            Most Popular
          </div>
          <CardContent className="flex flex-1 flex-col p-6">
            <h3 className="mb-2 text-xl font-bold">Pro</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold">€19.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Separator className="my-4" />
            <ul className="mb-6 space-y-2 text-sm">
              <PricingCheckMark>Chat with all philosophers</PricingCheckMark>
              <PricingCheckMark>Unlimited messages</PricingCheckMark>
              <PricingCheckMark>Save unlimited conversations</PricingCheckMark>
              <PricingCheckMark>Multi-philosopher debates</PricingCheckMark>
            </ul>
            <Button asChild className="mt-auto w-full" type="button">
              <Link href="/sign-up">Get Pro</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col border-2">
          <CardContent className="flex flex-1 flex-col p-6">
            <h3 className="mb-2 text-xl font-bold">Enterprise</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold">€49.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Separator className="my-4" />
            <ul className="mb-6 space-y-2 text-sm">
              <PricingCheckMark>Everything in Pro</PricingCheckMark>
              <PricingCheckMark>API access</PricingCheckMark>
              <PricingCheckMark>Custom philosopher training</PricingCheckMark>
              <PricingCheckMark>Priority support</PricingCheckMark>
            </ul>
            <Button asChild className="mt-auto w-full" type="button">
              <Link href="/sign-up">Contact Sales</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
