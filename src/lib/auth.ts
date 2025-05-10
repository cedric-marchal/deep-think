import { env } from "@/src/lib/env";
import { prisma } from "@/src/lib/prisma";

import { ResetPasswordEmail } from "@/src/components/emails/reset-password-email";
import { resend } from "@/src/lib/resend";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  appName: env.NEXT_PUBLIC_APP_NAME,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const userData = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!userData) {
        return;
      }

      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset Password",
        react: ResetPasswordEmail({ url }),
      });
    },
  },

  plugins: [nextCookies()],
});
