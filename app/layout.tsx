import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://minagayid.github.io/AIih_2026";
const siteRoot = siteUrl + "/";
const siteName = "Radiograph Ready";
const siteDescription =
  "Radiograph Ready is an open pilot benchmark for trustworthy multimodal AI assessment of dental radiograph quality before diagnosis.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": siteRoot + "#website",
      url: siteRoot,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": siteRoot + "#organization" },
    },
    {
      "@type": "ResearchProject",
      "@id": siteRoot + "#research-project",
      url: siteRoot,
      name: siteName,
      description: siteDescription,
      areaOfStudy: "Dentistry",
      keywords: [
        "dental radiograph quality",
        "multimodal AI",
        "vision-language models",
        "dental imaging",
      ],
      creator: [
        {
          "@type": "Person",
          name: "Ashhadul Islam",
          url: "https://ashhadulislam.github.io/",
          sameAs: "https://www.linkedin.com/in/ashhadul-islam-b508581a/",
        },
        {
          "@type": "Person",
          name: "Mina Maged Zekry Gayid",
          url: "https://minagayid.github.io/",
          sameAs: "https://www.linkedin.com/in/mina-maged-zekry-gayid/",
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": siteRoot + "#organization",
      name: "Radiograph Ready research team",
      url: siteRoot,
      sameAs: "https://github.com/minagayid/AIih_2026",
      member: [
        { "@type": "Person", name: "Ashhadul Islam" },
        { "@type": "Person", name: "Mina Maged Zekry Gayid" },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteRoot),
  title: {
    default: "Radiograph Ready | Dental AI quality benchmark",
    template: "%s | Radiograph Ready",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "dental radiograph quality",
    "dental imaging AI",
    "multimodal AI dentistry",
    "vision-language models",
    "radiograph usability benchmark",
  ],
  authors: [
    {
      name: "Ashhadul Islam",
      url: "https://ashhadulislam.github.io/",
    },
    {
      name: "Mina Maged Zekry Gayid",
      url: "https://minagayid.github.io/",
    },
  ],
  creator: "Ashhadul Islam and Mina Maged Zekry Gayid",
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteRoot,
    siteName,
    title: "Radiograph Ready | Dental AI quality benchmark",
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Radiograph Ready | Dental AI quality benchmark",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
      <head>
        <script
          id="radiograph-ready-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
