import { Search } from "lucide-react";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

interface Blogs extends SanityDocument {
  _id: string;
  title: string;
  slug: string;
  category: string;
  titleImage: string;
  excerpt: string;
  readTime: number;
  author: string;
  _createdAt: string;
}

// Query for filtered blogs (for grid)
const BLOGS_QUERY = `*[_type == 'blog' 
  && ($category == 'all' || category == $category)
  && (
      !defined($search) ||
      title match '*' + $search + '*' ||
      excerpt match '*' + $search + '*'
    )
  ] | order(_createdAt desc) {
    _id,
    title,
    category,
    "slug": slug.current,
    "titleImage": titleImage.asset->url,
    excerpt,
    readTime,
    author,
    _createdAt
}`;

const FEATURED_BLOG_QUERY = `*[_type == 'blog'] | order(_createdAt desc) [0] {
  _id,
  title,
  category,
  "slug": slug.current,
  "titleImage": titleImage.asset->url,
  excerpt,
  readTime,
  author,
  _createdAt
}`;

const CATEGORIES_QUERY = `
  array::unique(*[_type == "blog"].category)
`;

const options = { next: { revalidate: 30 } };

const BLOG_TITLE = "Web Development, Design & SEO Blog";
const BLOG_DESCRIPTION =
  "Practical insights on web development, Next.js, UI design, SEO, AI chatbots and automation from the FA Media team — for founders and businesses worldwide.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}): Promise<Metadata> {
  const { category, search } = await searchParams;
  // Filtered / search views are thin duplicates of /blogs: keep them out of the index.
  const isFiltered = Boolean(search?.trim()) || (category && category !== "all");

  return {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    alternates: { canonical: "/blogs" },
    robots: isFiltered ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${BLOG_TITLE} | FA Media`,
      description: BLOG_DESCRIPTION,
      url: "/blogs",
      siteName: "FA Media",
      type: "website",
    },
  };
}

export default async function IndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category ?? "all";
  const search = resolvedParams.search?.trim() || null;

  // ✅ Fetch featured blog separately (always latest)
  const [allBlogs, featuredBlog, categories] = await Promise.all([
    client.fetch<Blogs[]>(BLOGS_QUERY, { category, search }, options),
    client.fetch<Blogs>(FEATURED_BLOG_QUERY, {}, options),
    client.fetch<string[]>(CATEGORIES_QUERY, {}, options),
  ]);

  const formatDate = (date: string | Date): string =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getInitials = (name: string): string => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const capitalizeName = (name: string): string => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="pt-30 pb-20">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${SITE_URL}/blogs#blog`,
            name: "FA Media Blog",
            description: BLOG_DESCRIPTION,
            url: `${SITE_URL}/blogs`,
            inLanguage: "en",
            publisher: { "@id": `${SITE_URL}/#organization` },
            blogPost: allBlogs.slice(0, 20).map((b) => ({
              "@type": "BlogPosting",
              headline: b.title,
              url: `${SITE_URL}/blogs/${b.slug}`,
              datePublished: b._createdAt,
              image: b.titleImage || undefined,
              author: { "@type": "Person", name: b.author },
            })),
          },
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Blog", url: `${SITE_URL}/blogs` },
          ]),
        ]}
      />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Header Section */}
        <div className="mb-10 pt-8">
          <h1 className="font-serif text-5xl md:text-6xl text-stone-200 mb-6">
            Engineering & Design
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl leading-relaxed mb-8">
            Deep dives into product development, UI patterns, and the technical
            challenges we solve daily. Written by the team building the future.
          </p>

          {/* Search Bar */}
          <form
            action="/blogs"
            method="GET"
            className="relative w-full max-w-sm group"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-stone-600 group-focus-within:text-stone-400 transition-colors" />
            </div>
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              className="block w-full pl-10 pr-3 py-2 bg-[#1a1a1a] border border-stone-800 rounded-lg leading-5 text-stone-300 placeholder-stone-600 focus:outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600 sm:text-sm transition-all duration-200 ease-in-out hover:border-stone-700"
              placeholder="Search blogs..."
              aria-label="Search blogs"
            />
            {category !== "all" && (
              <input type="hidden" name="category" value={category} />
            )}
          </form>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 border-b border-stone-800/50 scrollbar-hide">
          <Link
            href="/blogs"
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
              category === "all"
                ? "bg-stone-100 text-stone-900"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            All Blogs
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blogs?category=${encodeURIComponent(cat)}${
                search ? `&search=${encodeURIComponent(search)}` : ""
              }`}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                category === cat
                  ? "bg-stone-100 text-stone-900"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Clear Filters */}
        {(category !== "all" || search) && (
          <div className="mb-6 flex items-center gap-2 text-sm text-stone-400">
            <span>
              {search && `Searching for "${search}" `}
              {category !== "all" && `in "${category}"`}
              {` - ${allBlogs.length} result${
                allBlogs.length !== 1 ? "s" : ""
              }`}
            </span>
            <Link
              href="/blogs"
              className="text-stone-500 hover:text-stone-300 underline"
            >
              Clear filters
            </Link>
          </div>
        )}

        {/* ✅ Featured Post - Always shows latest blog */}
        {featuredBlog && (
          <div className="mb-12 group">
            <Link href={`/blogs/${featuredBlog.slug}`}>
              <div className="relative bg-[#1a1a1a] border border-stone-800 rounded-2xl grid md:grid-cols-2 overflow-hidden hover:border-stone-600 transition-colors duration-300 shadow-2xl">
                <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-2 text-xs text-[#54d265] mb-4 font-mono uppercase tracking-wider">
                    <span className="w-2 h-2 bg-[#54d265] rounded-full animate-pulse"></span>
                    Featured
                  </div>
                  <h2 className="text-3xl md:text-4xl font-medium text-stone-200 mb-4 tracking-tight group-hover:underline decoration-stone-700 underline-offset-4">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-stone-400 mb-8 leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-[10px] text-white font-bold border border-stone-700">
                      {getInitials(featuredBlog.author)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-stone-200">
                        {capitalizeName(featuredBlog.author)}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {`${formatDate(featuredBlog._createdAt)} · ${
                          featuredBlog.readTime
                        } min read`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative bg-[#1a1a1a] border-l border-stone-800/50 min-h-[300px]">
                  <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-size-[16px_16px] opacity-50" />
                  <div className="absolute inset-6 border border-stone-800 rounded-lg overflow-hidden shadow-2xl">
                    {featuredBlog.titleImage && (
                      <>
                        <Image
                          src={featuredBlog.titleImage}
                          alt={featuredBlog.title}
                          fill
                          priority
                          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-2.5 py-1 rounded-md font-medium tracking-wide uppercase">
                            {featuredBlog.category}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ✅ No Results State or Grid Layout */}
        {allBlogs.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-800 flex items-center justify-center">
                <Search className="w-8 h-8 text-stone-600" />
              </div>
              <h3 className="text-2xl font-medium text-stone-200 mb-3">
                No blogs found
              </h3>
              <p className="text-stone-500 mb-6">
                {search
                  ? `We couldn't find any posts matching "${search}"${
                      category !== "all" ? ` in the ${category} category` : ""
                    }.`
                  : category !== "all"
                    ? `There are no posts in the "${category}" category yet.`
                    : "No blog posts available at the moment."}
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors"
              >
                View all posts
              </Link>
            </div>
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.map((blog) => (
              <article
                key={blog._id}
                className="group flex flex-col h-full transition-opacity"
              >
                <Link href={`/blogs/${blog.slug}`}>
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-stone-800 mb-5 bg-stone-800/50">
                    <div className="absolute inset-0 overflow-hidden">
                      {blog.titleImage && (
                        <Image
                          src={blog.titleImage}
                          alt={blog.title}
                          fill
                          className="object-cover transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-2.5 py-1 rounded-md font-medium tracking-wide uppercase">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
                      <span>{formatDate(blog._createdAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-stone-700"></span>
                      <span>{`${blog.readTime} min read`}</span>
                    </div>

                    <h3 className="text-xl text-stone-100 font-medium leading-tight mb-3 group-hover:text-[#54d265] transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-stone-400 leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-2">
                      <div className="w-5 h-5 flex items-center justify-center bg-stone-700 rounded-full text-[10px] text-white font-bold">
                        {getInitials(blog.author)}
                      </div>
                      <span className="text-xs text-stone-300">
                        {capitalizeName(blog.author)}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
