export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

/**
 * Shared by the visible FAQ section and the FAQPage JSON-LD on the homepage.
 * Keep answers factual — search engines and AI assistants quote them directly.
 */
export const faqData: FAQ[] = [
  {
    id: "item-1",
    question: "What services does FA Media offer?",
    answer:
      "FA Media provides custom web design and development, including business websites, landing pages, portfolio websites, personal brand sites, hosting and maintenance. We also build custom AI chatbots and business automation tailored to your needs.",
  },
  {
    id: "item-2",
    question:
      "Do you work with clients in the USA, UK, Canada and Australia?",
    answer:
      "Yes. FA Media is a remote-first agency and works with clients worldwide, with a focus on the United States, United Kingdom, Canada and Australia, as well as businesses across India. Projects are run online through video calls, shared project boards and regular progress updates.",
  },
  {
    id: "item-3",
    question: "How do you handle time zones for international projects?",
    answer:
      "We schedule calls at times that suit your working hours and share written updates so you always know where your project stands, regardless of time zone. You get a single point of contact throughout the project.",
  },
  {
    id: "item-4",
    question: "How long does it take to build a website?",
    answer:
      "Timelines vary based on the project scope. Simple landing pages are typically delivered within 3–5 days, while complete websites can take 1–2 weeks. We provide a detailed timeline after the initial consultation.",
  },
  {
    id: "item-5",
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer optional maintenance plans that include updates, backups, performance monitoring, and security patches to ensure your website stays optimized and secure.",
  },
  {
    id: "item-6",
    question: "Can you help with design, branding, or content?",
    answer:
      "Yes! While development is our core focus, we help refine your layout, visuals, and basic content. For deep branding or copy, we can refer trusted creatives or collaborate with yours.",
  },
  {
    id: "item-7",
    question: "Which technologies do you use?",
    answer:
      "We build custom-coded websites with Next.js, React, TypeScript and Tailwind CSS, with headless CMS options such as Sanity, and deploy on Vercel, Netlify or Cloudflare. Every site is built for speed, Core Web Vitals and technical SEO from day one.",
  },
  {
    id: "item-8",
    question: "Why choose FA Media over other agencies?",
    answer:
      "We combine technical excellence with business-focused strategy. Our sites are 100% custom-coded, fast, mobile-first, SEO-ready, and built to convert — all with personal attention from the founders, who treat your project like their own.",
  },
];
