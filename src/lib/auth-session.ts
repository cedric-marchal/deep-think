import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

/**
 * Types for session data based on the auth library structure
 */
export type SessionInfo = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
};

export type AuthSession = {
  session: SessionInfo;
  user: UserInfo;
} | null;

export const getCurrentSession = async (): Promise<AuthSession> => {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    return null;
  }
};
