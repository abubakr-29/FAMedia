import { client } from "@/sanity/client";
import { SITE, SITE_URL, FOUNDERS, SERVICES } from "@/lib/site";
import { faqData } from "@/data/faqs";

interface BlogSummary {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  _createdAt: string;
}

async function getBlogs(): Promise<BlogSummary[]> {
  try {
    return await client.fetch<BlogSummary[]>(
      `*[_type == "blog" && defined(slug.current)] | order(_createdAt desc){
        title, "slug": slug.current, excerpt, category, _createdAt
      }`
    );
  } catch {
    return [];
  }
}

const markets = SITE.markets.map((m) => m.name).join(", ");

function header() {
  return `# ${SITE.name}

> ${SITE.shortDescription}

${SITE.name} is a web design and development agency founded in ${SITE.foundingYear} and headquartered in ${SITE.address.locality}, ${SITE.address.countryName}. The team works remotely with clients worldwide — primarily in the United States, United Kingdom, Canada and Australia — as well as businesses across India. Every website is 100% custom-coded (no templates), built with Next.js and React, and optimised for speed, technical SEO and conversions.

Key facts:

- Company: ${SITE.name} (also known as ${SITE.alternateName.join(", ")})
- Website: ${SITE_URL}
- Headquarters: ${SITE.address.locality}, ${SITE.address.region}, ${SITE.address.countryName}
- Markets served: ${markets} (remote, worldwide)
- Email: ${SITE.email}
- Phone / WhatsApp: ${SITE.phones.join(", ")}
- Book a free discovery call: ${SITE.booking}
- Typical timelines: landing pages in 3–5 days, complete websites in 1–2 weeks
- Tech stack: Next.js, React, TypeScript, Tailwind CSS, Node.js, Sanity CMS, Vercel, Netlify, Cloudflare
- Founders: ${FOUNDERS.map((f) => `${f.name} (${f.jobTitle})`).join("; ")}
`;
}

function servicesSection() {
  return `## Services

${SERVICES.map((s) => `- **${s.name}**: ${s.description}`).join("\n")}
`;
}

function blogLinks(blogs: BlogSummary[]) {
  if (!blogs.length) return "";
  return `## Blog

${blogs
  .map(
    (b) =>
      `- [${b.title}](${SITE_URL}/blogs/${b.slug})${b.excerpt ? `: ${b.excerpt}` : ""}`
  )
  .join("\n")}
`;
}

function pages() {
  return `## Pages

- [Home](${SITE_URL}/): Services, process, founders, projects, testimonials, FAQs and contact
- [Blog](${SITE_URL}/blogs): Articles on web development, UI design, SEO and automation
- [Contact](${SITE_URL}/#contact): Contact form, email and phone
- [Book a call](${SITE.booking}): Free discovery call
`;
}

function faqs() {
  return `## Frequently asked questions

${faqData.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}
`;
}

/** Concise llms.txt per https://llmstxt.org */
export async function buildLlmsTxt() {
  const blogs = await getBlogs();
  return [
    header(),
    servicesSection(),
    pages(),
    blogLinks(blogs),
    `## Optional

- [Full content for LLMs](${SITE_URL}/llms-full.txt): Expanded version including FAQs
- [Privacy Policy](${SITE_URL}/privacy-policy)
- [Terms of Service](${SITE_URL}/terms-of-service)
- [LinkedIn](${SITE.sameAs[0]})
- [Instagram](${SITE.sameAs[1]})
`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Expanded single-file context for AI assistants. */
export async function buildLlmsFullTxt() {
  const blogs = await getBlogs();
  return [
    header(),
    servicesSection(),
    `## How we work

1. Discovery call to understand your business, goals and audience.
2. User research and identifying your audience's challenges.
3. Conversion-focused copywriting and strategy.
4. Custom design and development — no templates.
5. Launch, hosting and optional ongoing maintenance.

We work with international clients remotely: calls are scheduled to suit the client's time zone, and progress is shared through written updates.
`,
    faqs(),
    pages(),
    blogLinks(blogs),
  ]
    .filter(Boolean)
    .join("\n");
}
