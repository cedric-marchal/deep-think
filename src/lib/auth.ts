import { env } from "@/src/lib/env";
import { prisma } from "@/src/lib/prisma";

import { ResetPasswordEmail } from "@/src/components/emails/reset-password-email";
import { resend } from "@/src/lib/resend";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { VerifyEmail } from "../components/emails/verify-email-email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  appName: env.NEXT_PUBLIC_APP_NAME,
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day refresh
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset Password",
        react: ResetPasswordEmail({ url }),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    redirectUrl: "/verification-success?token=verified",
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify Your Email",
        react: VerifyEmail({ url, name: user.name }),
      });
    },
  },

  plugins: [nextCookies()],
});
