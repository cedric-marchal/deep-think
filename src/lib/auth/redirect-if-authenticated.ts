import { getCurrentSession } from "@/src/lib/auth-session";
import { redirect } from "next/navigation";

export async function redirectIfAuthenticated() {
  const currentSession = await getCurrentSession();

  if (currentSession) {
    redirect("/dashboard/settings");
  }
}
