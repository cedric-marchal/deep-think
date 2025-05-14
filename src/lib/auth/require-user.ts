import { getCurrentSession } from "@/src/lib/auth-session";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export async function requireUser() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  return { user, session };
}
