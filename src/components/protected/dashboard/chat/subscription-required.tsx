"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Euro } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SubscriptionRequiredProps = {
  hasStripeAccount: boolean;
  userId: string;
};

export const SubscriptionRequired = ({
  hasStripeAccount,
  userId,
}: SubscriptionRequiredProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // Create checkout session
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnUrl: window.location.origin + "/dashboard/chat",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();

      // Redirect to checkout page
      window.location.href = url;
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);

      // Create customer portal session
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnUrl: window.location.origin + "/dashboard/chat",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await response.json();

      // Redirect to customer portal
      window.location.href = url;
    } catch (error) {
      console.error("Error during portal session creation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Subscription Required
        </CardTitle>
        <CardDescription>
          To access philosophical discussions, you need an active subscription.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b py-4">
            <div>
              <h3 className="font-medium">Chat with Philosophers</h3>
              <p className="text-muted-foreground text-sm">
                Engage in deep conversations with history's greatest thinkers
              </p>
            </div>
            <div className="flex items-center">
              <Euro className="mr-1 h-4 w-4" />
              <span className="font-bold">20</span>
              <span className="text-muted-foreground ml-1 text-sm">/month</span>
            </div>
          </div>
          <ul className="list-inside list-disc space-y-2 text-sm">
            <li>Unlimited conversations with all philosophers</li>
            <li>Access to conversation history</li>
            <li>Engage in deep philosophical discussions</li>
            <li>Learn from history's greatest minds</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        {hasStripeAccount ? (
          <Button
            className="w-full"
            onClick={handleManageSubscription}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Manage Subscription"}
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Subscribe Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
