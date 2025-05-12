import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email(),
  },
  runtimeEnv: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  },
  emptyStringAsUndefined: true,
  skipValidation: false,
});
