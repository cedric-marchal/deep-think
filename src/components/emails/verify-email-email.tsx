import { env } from "@/src/lib/env";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export const VerifyEmail = ({ url, name }: { url: string; name: string }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          margin: "0",
          padding: "0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              overflow: "hidden",
            }}
          >
            <Section
              style={{
                borderBottom: "1px solid #e5e7eb",
                padding: "1.5rem",
                backgroundColor: "#f8fafc",
              }}
            >
              <Heading
                style={{
                  color: "#111827",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Email Verification
              </Heading>
            </Section>

            <Section
              style={{
                padding: "1.5rem",
              }}
            >
              <Text
                style={{
                  color: "#374151",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  margin: "0 0 1rem 0",
                }}
              >
                Hello {name},
              </Text>

              <Text
                style={{
                  color: "#374151",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  margin: "0 0 1.5rem 0",
                }}
              >
                Please verify your email address by clicking the button below:
              </Text>

              <Button
                type="button"
                href={url}
                style={{
                  backgroundColor: "#4f46e5",
                  borderRadius: "0.375rem",
                  color: "#ffffff",
                  display: "inline-block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  lineHeight: "1.25rem",
                  padding: "0.625rem 1.25rem",
                  textAlign: "center",
                  textDecoration: "none",
                  width: "auto",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                Verify My Email
              </Button>

              <Text
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  margin: "0 0 1rem 0",
                }}
              >
                If you didn't request this verification, you can safely ignore
                this email.
              </Text>

              <Text
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  margin: "0",
                }}
              >
                Or copy and paste this URL into your browser:{" "}
                <Link
                  href={url}
                  style={{
                    color: "#4f46e5",
                    textDecoration: "underline",
                  }}
                >
                  {url}
                </Link>
              </Text>
            </Section>

            <Section
              style={{
                borderTop: "1px solid #e5e7eb",
                padding: "1rem 1.5rem",
                backgroundColor: "#f8fafc",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  color: "#6b7280",
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  margin: "0",
                }}
              >
                © {currentYear} {env.NEXT_PUBLIC_APP_NAME}. All rights
                reserved.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
