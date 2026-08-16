import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.footer.blog,
    description: dict.blog.subtitle,
    openGraph: {
      title: `${dict.blog.title} — ${dict.site.tagline}`,
      description: dict.blog.subtitle,
    },
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const b = dict.blog;

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <div className="text-center">
        <h1 className="headline">{b.title}</h1>
        <p className="lead mx-auto mt-5">{b.subtitle}</p>
      </div>

      <div className="mt-16">
        {b.posts.map((post) => (
          <article key={post.slug} className="group border-t border-line-soft py-9">
            <time className="text-xs tracking-[0.08em] text-mute-dim">{post.date}</time>
            <h2 className="subhead mt-3">
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="transition-colors group-hover:text-brand-500"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-mute">{post.excerpt}</p>
            <Link
              href={`/${locale}/blog/${post.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand-500 transition-colors hover:text-brand-400"
            >
              {b.readMore}
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
