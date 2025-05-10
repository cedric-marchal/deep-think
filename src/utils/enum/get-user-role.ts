import { UserRole } from "@/prisma/generated/prisma";

export function getUserRole(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return "Administrator";
    case UserRole.CUSTOMER:
      return "Customer";
    default:
      return "Unknown";
  }
}
