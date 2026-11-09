import { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await client.fetch<
    { slug: string; _updatedAt: string; image?: string }[]
  >(
    `*[_type == "blog" && defined(slug.current)] | order(_updatedAt desc){
        "slug": slug.current,
        _updatedAt,
        "image": titleImage.asset->url
      }`
  );

  const latestBlogUpdate = blogs[0]?._updatedAt
    ? new Date(blogs[0]._updatedAt)
    : new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/opengraph-image`],
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: latestBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
    images: blog.image ? [blog.image] : undefined,
  }));

  return [...staticPages, ...blogPages];
}
