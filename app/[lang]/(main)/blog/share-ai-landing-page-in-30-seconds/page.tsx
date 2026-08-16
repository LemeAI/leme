import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import BlogPostContent from "@/components/BlogPostContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const post = dict.blogPosts.shareLandingPage;
  return {
    title: post.metadataTitle,
    description: post.metadataDescription,
    openGraph: {
      title: post.ogTitle,
      description: post.ogDescription,
    },
  };
}

export default async function ShareLandingPagePost({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <BlogPostContent post={dict.blogPosts.shareLandingPage} dict={dict} locale={locale} />;
}
