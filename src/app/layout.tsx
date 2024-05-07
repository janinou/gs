import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grande section",
  description: "Outils pédagogiques pour la grande section.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
