import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

type PostConfig = Dictionary["blogPosts"][keyof Dictionary["blogPosts"]];

export default function BlogPostContent({
  post,
  dict,
  locale,
}: {
  post: PostConfig;
  dict: Dictionary;
  locale: string;
}) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <header className="border-b border-line-soft pb-12">
        <h1 className="headline">{post.title}</h1>
        <p className="lead mt-5">{post.subtitle}</p>
      </header>

      <div className="mt-12">
        {post.sections.map((section, index) => {
          if (section.type === "heading") {
            return (
              <h2 key={index} className="section-head mt-14 first:mt-0">
                {section.content}
              </h2>
            );
          }
          if (section.type === "paragraph") {
            return (
              <p key={index} className="mt-6 text-[17px] leading-[1.75] text-mute">
                {section.content}
              </p>
            );
          }
          if (section.type === "list" && section.items) {
            return (
              <ol
                key={index}
                className="mt-6 list-outside list-decimal space-y-3 pl-6 text-[17px] leading-[1.75] text-mute marker:font-medium marker:text-brand-500"
              >
                {section.items.map((item) => (
                  <li key={item} className="pl-1.5">
                    {item}
                  </li>
                ))}
              </ol>
            );
          }
          return null;
        })}
      </div>

      <div className="glow-cta mt-20 rounded-xl border border-line-soft px-6 py-12 text-center">
        <h2 className="subhead">{post.ctaTitle}</h2>
        <p className="mt-2.5 text-[15px] text-mute">{post.ctaSubtitle}</p>
        <Link href={`/${locale}/new`} className="btn btn-primary mt-7">
          {dict.home.ctaUpload}
        </Link>
      </div>
    </article>
  );
}
