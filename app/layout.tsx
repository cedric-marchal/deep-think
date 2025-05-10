import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Providers } from "./providers";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noimageindex: true,
    noarchive: true,
    nosnippet: true,
  },
};

export default function GlobalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NuqsAdapter>
          <Providers>{children}</Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
