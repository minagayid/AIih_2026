import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radiograph Ready | Dental AI quality benchmark",
  description:
    "Radiograph Ready is a pilot benchmark for trustworthy multimodal AI assessment of dental radiograph quality before diagnosis.",
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
