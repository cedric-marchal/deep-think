"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

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

import { signIn, signUp } from "@/src/lib/auth-client";
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignUpForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !name.trim()) {
      toast.error("Full name is required");
      return;
    }

    await signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          await signIn.email({
            email,
            password,
          });

          toast.success("Verification email sent");
          router.refresh();
        },
        onError: (ctx: { error: { message: string } }) => {
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
            Sign up
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="bg-card border-border pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john.doe@email.com"
                  required
                  className="bg-card border-border pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="bg-card border-border pr-10 pl-10"
                />
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={() =>
                    setShowPassword(
                      (currentShowPassword) => !currentShowPassword,
                    )
                  }
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gap-2 transition-all"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create my account
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm">
          <p className="text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/conditions" className="text-primary hover:underline">
              conditions of use
            </Link>{" "}
            and our{" "}
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>
          <p>
            Already registered ?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};
