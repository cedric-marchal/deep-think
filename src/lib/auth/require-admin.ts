import { getCurrentSession } from "@/src/lib/auth-session";
import { prisma } from "@/src/lib/prisma";
import { notFound, redirect } from "next/navigation";

export async function requireAdmin() {
  const currentSession = await getCurrentSession();

  if (!currentSession) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { id: currentSession.user.id },
    select: { role: true },
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "ADMIN") {
    notFound();
  }

  return user;
}
