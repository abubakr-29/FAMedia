import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";

interface BlogPost extends SanityDocument {
  _id: string;
  title: string;
  slug: string;
  category: string;
  topics: string[];
  titleImage: string;
  excerpt: string;
  readTime: number;
  author: string;
  authorRole: string;
  _createdAt: string;
}

const BLOGS_QUERY = `*[_type == 'blog' && slug.current == $slug] {
    _id,
    title,
    "slug": slug.current,
    category,
    topics,
    "titleImage": titleImage.asset->url,
    excerpt,
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "alt": alt
      }
    },
    readTime,
    author,
    authorRole,
    _createdAt
  }[0]`;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title,
      excerpt,
      "slug": slug.current,
      "image": titleImage.asset->url
    }`,
    { slug: params.slug }
  );

  if (!blog) {
    return {
      title: "Blog Not Found | FA Media",
    };
  }

  return {
    title: `${blog.title} | FA Media`,
    description: blog.excerpt,
    alternates: {
      canonical: `https://famedia.co.in/blogs/${blog.slug}`,
    },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt,
      url: `https://famedia.co.in/blogs/${blog.slug}`,
      images: blog.image
        ? [
            {
              url: blog.image,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.image ? [blog.image] : [],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await client.fetch<BlogPost>(BLOGS_QUERY, await params, options);

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

  const isOnlineIST = (): boolean => {
    const hours = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    });

    const currentHour = parseInt(hours);
    return currentHour >= 9 && currentHour < 21;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 pt-30 pb-20 font-inter">
      <Link
        href={"/blogs"}
        className="group flex items-center gap-2 text-stone-400 hover:text-stone-200 transition-colors text-sm mb-4"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Blogs</span>
      </Link>
      <div className="relative w-full max-w-2xl lg:max-w-3xl mx-auto mt-12">
        {/* Main Blog Card */}
        <div className="relative z-10 bg-[#1a1a1a] border border-stone-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
          {/* Blog Header */}
          <div className="border-b border-stone-800 mb-6 pb-4">
            <h2 className="text-lg sm:text-xl font-normal mb-2 flex items-center gap-2">
              {blog.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mb-3">
              {blog.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(blog._createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {`${blog.readTime} min read`}
              </span>
              <span>{blog.category}</span>
            </div>
          </div>

          {/* Article Metadata */}
          <div className="mb-6">
            {/* Category */}
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4 items-start sm:items-center py-3 border-b border-stone-800">
              <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1 sm:mb-0">
                Category
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-stone-300">{blog.category}</span>
              </div>
            </div>

            {/* Author */}
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4 items-start sm:items-center py-3 border-b border-stone-800">
              <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1 sm:mb-0">
                Author
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-6 h-6 flex items-center justify-center bg-stone-700 rounded-full">
                  <span className="text-xs font-semibold text-white">
                    {getInitials(blog.author)}
                  </span>
                </div>
                <span className="text-sm text-white">
                  {capitalizeName(blog.author)}
                </span>
                {isOnlineIST() ? (
                  <span
                    className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                    title="Online"
                  ></span>
                ) : (
                  <span
                    className="w-2 h-2 rounded-full bg-gray-600"
                    title="Offline"
                  ></span>
                )}
              </div>
            </div>

            {/* Topics */}
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4 items-start sm:items-center py-3">
              <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1 sm:mb-0">
                Topics
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {blog.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-stone-700 hover:bg-stone-600 rounded px-2 py-1 cursor-pointer transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Article Content Sections */}
          <div className="border-t border-stone-800 pt-6">
            <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
              {blog.category}
            </h3>

            {/* Featured Image */}
            <div className="overflow-hidden bg-stone-800/50 border border-stone-800 rounded-lg mb-4">
              <div className="aspect-video flex items-center justify-center relative">
                <Image
                  src={blog.titleImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Article Content */}
            <div className="mb-6 space-y-4 leading-relaxed prose prose-sm max-w-none prose-invert prose-p:text-stone-300 prose-li:text-stone-300 prose-strong:text-stone-200 prose-headings:text-stone-200 prose-a:text-stone-300 hover:prose-a:text-stone-200">
              <PortableText
                value={blog.content}
                components={{
                  types: {
                    image: ({ value }) => {
                      return (
                        <div className="aspect-video flex items-center justify-center relative">
                          <Image
                            src={value.url || ""}
                            alt={value.alt || "Blog image"}
                            width={800}
                            height={600}
                            className="object-cover"
                          />
                        </div>
                      );
                    },
                  },
                }}
              />
            </div>

            {/* Author Section */}
            <div className="flex items-center justify-between border-t border-stone-800/50 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-stone-700 rounded-full">
                  <span className="text-sm font-semibold text-white">
                    {getInitials(blog.author)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {capitalizeName(blog.author)}
                  </div>
                  <div className="text-xs text-stone-400">
                    {blog.authorRole}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-stone-300 mb-1 font-serif">
                  {capitalizeName(blog.author)}
                </div>
                <div className="text-xs text-stone-500">
                  Published: {formatDate(blog._createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
