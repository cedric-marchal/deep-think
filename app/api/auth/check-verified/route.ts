import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new Response(null, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { emailVerified: true },
  });

  if (!user || !user.emailVerified) {
    return new Response(null, { status: 403 });
  }

  return NextResponse.json({ isVerified: true });
}
