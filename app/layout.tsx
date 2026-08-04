import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIih 2026 | Multimodal dentistry workshop",
  description:
    "An invitation to the AIih 2026 workshop on trustworthy multimodal AI for dental radiographic quality assessment.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
