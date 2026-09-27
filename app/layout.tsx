import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://minagayid.github.io/AIih_2026";
const siteRoot = siteUrl + "/";
const siteName = "Radiograph Ready";
const siteDescription =
  "Research on AI for dental X-ray quality: an 810-row model-rated dataset, an exploratory image-feature baseline, and a separate 13-image expert-scored pilot.";
const pageTitle = "Dental X-ray Quality AI Research | Radiograph Ready";
const socialImage = {
  url: "/og.png",
  width: 1730,
  height: 909,
  type: "image/png",
  alt: "Radiograph Ready — Dental radiograph quality benchmark for trustworthy multimodal AI",
};

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
      name: "Radiograph Ready: Dental X-ray Quality AI Research",
      description: siteDescription,
      areaOfStudy: "Dentistry",
      keywords: [
        "dental X-ray image quality",
        "dental radiograph quality",
        "AI for dental imaging",
        "vision-language models in dentistry",
        "exploratory machine learning",
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
    default: pageTitle,
    template: "%s | Radiograph Ready",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "dental X-ray image quality",
    "dental radiograph quality",
    "AI for dental imaging",
    "vision-language models in dentistry",
    "radiograph quality assessment",
    "exploratory machine learning",
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
  verification: {
    google: "ha-tm7yeQYXIPwMPSd0jlXRZToyQhWpGTgxe2kwbnCk",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteRoot,
    siteName,
    title: pageTitle,
    description: siteDescription,
    locale: "en_US",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: siteDescription,
    images: [socialImage.url],
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
