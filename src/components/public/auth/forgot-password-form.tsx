"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { authClient } from "@/src/lib/auth-client";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const emailValue = formData.get("email") as string;

    await authClient.forgetPassword(
      {
        email: emailValue,
        redirectTo: "/reset-password",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          setEmail(emailValue);
          setIsSuccess(true);
          router.refresh();
        },
        onError: (ctx: { error: { message: string } }) => {
          console.log(ctx.error.message);
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <section className="mx-auto w-full max-w-md">
      <Card className="border-border shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2">
          <CardTitle className="text-center text-2xl font-bold">
            Forgot password
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            {isSuccess
              ? "Check your email to reset your password"
              : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-4">
              <Alert className="bg-primary/10 border-primary text-primary">
                <AlertDescription>
                  A password reset email has been sent to{" "}
                  <strong>{email}</strong>. Check your inbox and follow the
                  instructions.
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => setIsSuccess(false)}
                variant="outline"
                className="w-full gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Try another email address
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john.doe@email.com"
                    className="bg-card border-border pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gap-2 transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send reset link
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm">
          <p>
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Back to login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};
