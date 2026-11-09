import { SITE, SITE_URL, FOUNDERS, SERVICES } from "./site";
import type { FAQ } from "@/data/faqs";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const areaServed = [
  ...SITE.markets.map((m) => ({ "@type": "Country", name: m.name })),
  { "@type": "Place", name: "Worldwide" },
];

/** Organization + ProfessionalService: who we are, where we are, who we serve. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.alternateName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: SITE.logo,
    },
    image: SITE.logo,
    description: SITE.shortDescription,
    slogan: "Beyond Website, We Build Brand",
    foundingDate: SITE.foundingYear,
    email: SITE.email,
    telephone: SITE.phones[0],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed,
    knowsLanguage: ["en"],
    founder: FOUNDERS.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.jobTitle,
      image: f.image,
      sameAs: f.sameAs,
    })),
    sameAs: SITE.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phones[0],
        areaServed: SITE.markets.map((m) => m.code),
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: [
      "Web design",
      "Web development",
      "Next.js",
      "React",
      "TypeScript",
      "Landing page optimization",
      "Conversion rate optimization",
      "Technical SEO",
      "AI chatbots",
      "Business automation",
      "Headless CMS",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web design & development services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@id": ORG_ID },
          areaServed,
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.shortDescription,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blogs?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description?: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  authorRole?: string;
  category?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: post.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": post.url },
    image: post.image ? [post.image] : undefined,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    inLanguage: "en",
    articleSection: post.category,
    keywords: post.keywords?.join(", "),
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
      worksFor: { "@id": ORG_ID },
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** Serialise JSON-LD safely for inline <script> (prevents </script> breakouts). */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
