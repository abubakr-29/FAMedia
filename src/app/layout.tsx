import type { Metadata } from "next";
import { Inter, Antonio } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footerSection.jsx/Footer";
import MarqueeSection from "@/components/marqueeSection/MarqueeSection";
import ReactLenis from "lenis/react";
import CustomCursor from "@/components/CustomCursor";
import TabTitleChanger from "@/components/TabTitleChanger";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "FA Media | Web Development Agency",
  description:
    "FA Media is a professional web development agency specializing in high-performance websites, landing pages, and automation solutions for businesses that want to scale online.",
  keywords: [
    "FA Media",
    "web development agency India",
    "Next.js websites",
    "React developer Kolkata",
    "landing page design",
    "portfolio website development",
    "business automation",
    "website hosting and maintenance",
    "conversion optimization",
    "AI automation services",
  ],
  authors: [{ name: "FA Media", url: "https://famedia.co.in" }],
  creator: "FA Media",
  publisher: "FA Media",
  metadataBase: new URL("https://fa-media.co.in"),

  alternates: {
    canonical: "https://famedia.co.in",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico",
  },

  openGraph: {
    type: "website",
    url: "https://famedia.co.in",
    title:
      "FA Media | Professional Web Development & Automation Agency in India",
    description:
      "We build fast, responsive, and modern websites for brands that want results. FA Media helps businesses grow through digital design, automation, and AI-powered systems.",
    siteName: "FA Media",
    images: [
      {
        url: "/FAMediaLogo.svg",
        width: 1200,
        height: 630,
        alt: "FA Media - Web Development & Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FA Media | Web Development & Automation Experts",
    description:
      "Building high-performance, modern websites and automation systems for businesses that want to scale.",
    creator: "@fa_media",
    images: ["/FAMediaLogo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: "/site.webmanifest",
  themeColor: "#0a0a0a",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${antonio.variable} antialiased`}>
        <ReactLenis root>
          <TabTitleChanger />
          <Navbar />
          <CustomCursor />
          {children}
          <MarqueeSection />
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
