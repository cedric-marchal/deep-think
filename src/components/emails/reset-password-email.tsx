import { Tailwind } from "@react-email/components";
import Link from "next/link";

export const ResetPasswordEmail = ({ url }: { url: string }) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
              primary: "#6366f1", // shadcn primary
              "primary-foreground": "#fff",
            },
          },
        },
      }}
    >
      <p>Click the link below to reset your password:</p>
      <Link
        href={url}
        target="_blank"
        style={{
          display: "inline-block",
          backgroundColor: "#6366f1",
          color: "#fff",
          borderRadius: "0.375rem",
          padding: "0.5rem 1rem",
          fontWeight: 500,
          fontSize: "0.875rem",
          textDecoration: "none",
          marginTop: "12px",
        }}
      >
        Reset Password
      </Link>
    </Tailwind>
  );
};
