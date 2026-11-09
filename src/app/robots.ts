import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const DISALLOW = ["/admin/", "/dashboard/", "/api/", "/studio/"];

/**
 * AI search / answer-engine crawlers are explicitly welcomed so FA Media can be
 * cited in ChatGPT, Claude, Perplexity, Gemini, Copilot and Google AI Overviews.
 * To opt out of model *training* only (while staying visible in AI search),
 * move GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot and
 * meta-externalagent into a separate rule with `disallow: "/"`.
 */
const AI_CRAWLERS = [
  // OpenAI
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / AI Overviews
  "Google-Extended",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // Microsoft Copilot (Bing)
  "bingbot",
  // Meta AI
  "meta-externalagent",
  // Others
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
