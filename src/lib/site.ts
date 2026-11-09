/**
 * Single source of truth for brand, contact and SEO facts.
 * Used by metadata, JSON-LD structured data, sitemap, robots and llms.txt.
 *
 * If the site ever moves to a global domain (e.g. a .com), change SITE_URL
 * here and add 301 redirects from famedia.co.in — everything else follows.
 */
export const SITE_URL = "https://famedia.co.in";

export const SITE = {
  name: "FA Media",
  legalName: "FA Media",
  alternateName: ["FA Media Labs", "FAMedia"],
  url: SITE_URL,
  logo: `${SITE_URL}/famedialogo.jpeg`,
  email: "support@famedia.co.in",
  phones: ["+91 90078 73303", "+91 82828 35993"],
  whatsapp: "https://wa.me/919007873303",
  booking: "https://calendly.com/famediacoin",
  foundingYear: "2025",
  address: {
    locality: "Kolkata",
    region: "West Bengal",
    country: "IN",
    countryName: "India",
  },
  tagline: "Web design & development agency for growing brands worldwide",
  shortDescription:
    "FA Media is a remote-first web design and development agency building fast, custom-coded, conversion-focused websites, landing pages and AI chatbots for businesses in the USA, UK, Canada, Australia and India.",
  sameAs: [
    "https://www.linkedin.com/company/fa-media-labs/",
    "https://www.instagram.com/famedia.labs/",
  ],
  /** Primary international markets first, then home market. */
  markets: [
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "IN", name: "India" },
  ],
} as const;

export const FOUNDERS = [
  {
    name: "Faraz Khan",
    jobTitle: "Founder & Creative Director",
    image: `${SITE_URL}/FarazKhan_Profile.webp`,
    sameAs: ["https://www.linkedin.com/in/-faraz-khan-/"],
  },
  {
    name: "MD. Mustaffa Aman",
    jobTitle: "Co-Founder & Marketing Strategist",
    image: `${SITE_URL}/MustaffaAman_Profile.webp`,
    sameAs: ["https://www.instagram.com/aman.mustaffa/"],
  },
  {
    name: "Abu Bakr Ahmed",
    jobTitle: "Co-Founder & Full Stack Developer",
    image: `${SITE_URL}/AbuBakrAhmed_Profile.webp`,
    sameAs: ["https://www.linkedin.com/in/abu-bakr-ahmed-01a9532bb/"],
  },
] as const;

export const SERVICES = [
  {
    name: "Custom Website Design & Development",
    description:
      "Fully custom-coded business websites built with Next.js and React — fast, mobile-first, SEO-ready and designed to convert. No templates.",
  },
  {
    name: "Landing Page Design & Development",
    description:
      "High-converting landing pages for product launches, lead generation and ad campaigns, with built-in SEO, CTAs, forms and analytics.",
  },
  {
    name: "AI Chatbot Development",
    description:
      "Custom AI chatbots trained on your business that answer questions 24/7, capture leads and book calls.",
  },
  {
    name: "Portfolio Website Development",
    description:
      "Custom portfolio sites for designers, developers and creators with galleries, CMS-backed blogs and contact or booking flows.",
  },
  {
    name: "Personal Brand Website Development",
    description:
      "Personal brand websites for coaches, consultants and creators — bio, services, testimonials, newsletter and blog on your own domain.",
  },
  {
    name: "Website Hosting, Deployment & Maintenance",
    description:
      "Domain setup, deployment on Vercel, Netlify or Cloudflare, SSL, performance tuning, backups and ongoing support.",
  },
] as const;

export const KEYWORDS = [
  "web design agency",
  "web development agency",
  "custom website development",
  "Next.js development agency",
  "React web development",
  "landing page design agency",
  "AI chatbot development",
  "offshore web development agency",
  "outsource web development",
  "website development for small business",
  "web design agency USA",
  "web design agency UK",
  "web development company Canada",
  "web design agency Australia",
  "web development agency India",
  "web design company Kolkata",
  "FA Media",
];
