import { env } from "@/src/lib/env";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-10">
      <div className="container mx-auto px-4">
        <p className="text-muted-foreground text-center text-sm">
          &copy; {currentYear} {env.NEXT_PUBLIC_APP_NAME}
        </p>
      </div>
    </footer>
  );
};
