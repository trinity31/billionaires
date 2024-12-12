import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Billionaires List",
  description: "List of world's billionaires",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
