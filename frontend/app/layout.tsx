import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Placement Copilot",
  description: "AI Powered Placement Preparation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        {children}

      </body>
    </html>
  );
}