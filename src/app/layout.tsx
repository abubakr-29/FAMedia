import type { Metadata, Viewport } from "next";
import { Inter, Antonio } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footerSection.jsx/Footer";
import MarqueeSection from "@/components/marqueeSection/MarqueeSection";
import ReactLenis from "lenis/react";
import CustomCursor from "@/components/CustomCursor";
import TabTitleChanger from "@/components/TabTitleChanger";
import NavigationProgress from "@/components/NavigationProgress";
import { preloaderBootScript } from "@/lib/preloader";
import { Suspense } from "react";
import BackToTop from "@/components/BackToTop";
import Script from "next/script";
import JsonLd from "@/components/seo/JsonLd";
import { SITE, SITE_URL, KEYWORDS } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FA Media | Custom Web Design & Development Agency Worldwide",
    template: "%s | FA Media",
  },
  description:
    "FA Media is a remote-first web design & development agency building fast, custom-coded Next.js websites, landing pages and AI chatbots for businesses in the USA, UK, Canada, Australia and India. Book a free call.",
  applicationName: SITE.name,
  keywords: KEYWORDS,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    alternateLocale: ["en_GB", "en_CA", "en_AU", "en_IN"],
    title: "FA Media | Custom Web Design & Development Agency Worldwide",
    description:
      "Fast, custom-coded websites, landing pages and AI chatbots for brands in the USA, UK, Canada, Australia and India. 100% custom code — no templates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FA Media | Custom Web Design & Development Agency",
    description:
      "Fast, custom-coded websites, landing pages and AI chatbots for growing brands worldwide.",
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
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderBootScript }} />
        <noscript>
          <style>{`#fa-preloader{display:none}`}</style>
        </noscript>
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="LLM-friendly summary of FA Media"
        />
      </head>
      <body className={`${inter.variable} ${antonio.variable} antialiased`}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ReactLenis root>
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          <TabTitleChanger />
          <Navbar />
          <CustomCursor />
          {children}
          <MarqueeSection />
          <Footer />
          <BackToTop />
        </ReactLenis>
        <Script
          src="https://widget.famedia.co.in//chatbot-widget.iife.js"
          data-api-url="https://famedia-chatbot.onrender.com"
          data-api-key="bef39b6058e5cf4a0f8f2c6fc61961dc72bf9d0a3bb565e8801cc88c0a389ee7"
          data-color="#54d265"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
