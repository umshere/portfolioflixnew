import "./globals.css";
import type { ReactNode } from "react";
import { Metadata } from "next";
import GlobalNebulaBackground from "../../components/GlobalNebulaBackground";

// Static profile data for SEO (to avoid dynamic imports in layout)
const profile = {
  name: "Umesh Muzhayil Chathoth",
  title: "Full Stack Engineer",
  location: "Chicago, Illinois",
  links: {
    github: "https://github.com/umshere",
    linkedin: "https://linkedin.com/in/umesh-muzhayil-chathoth",
    email: "umshere@gmail.com"
  }
};

export const metadata: Metadata = {
  metadataBase: new URL('https://umeshmc.com'), // Update with your actual domain
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: `Portfolio of ${profile.name}, a ${profile.title} based in ${profile.location}. Showcasing projects, experience, and skills in full-stack development.`,
  keywords: [
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    profile.name,
    profile.title,
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://umeshmc.com", // Update with your actual domain
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://umeshmc.com", // Update with your actual domain
    title: `${profile.name} | ${profile.title}`,
    description: `Portfolio of ${profile.name}, a ${profile.title} based in ${profile.location}. Showcasing projects, experience, and skills in full-stack development.`,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.title}`,
    description: `Portfolio of ${profile.name}, a ${profile.title} based in ${profile.location}. Showcasing projects, experience, and skills in full-stack development.`,
    images: ["/og-image.png"],
    creator: "@umshere", // Update with your actual Twitter handle
  },
  verification: {
    google: "", // Add your Google Search Console verification code here
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalNebulaBackground />
        {children}
      </body>
    </html>
  );
}
