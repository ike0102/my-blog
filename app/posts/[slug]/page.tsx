import type { Metadata } from "next";
import Link from "next/link";
import { getPost, getAllPosts, getPrevNextPosts } from "@/lib/posts";
import TableOfContents from "@/app/components/TableOfContents";
import ReadingProgress from "@/app/components/ReadingProgress";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: `${post.title} | 自己研鑽ブログ`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      siteName: "自己研鑽ブログ",
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
      site: "@r_nextstage",
      creator: "@r_nextstage",
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, { prev, next }] = await Promise.all([getPost(slug), Promise.resolve(getPrevNextPosts(slug))]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <ReadingProgress />

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-widest hover:opacity-60 transition-opacity mb-14"
        style={{ color: "var(--muted)" }}
      >
        ← BACK
      </Link>

      {/* 記事ヘッダー */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs px-3 py-0.5 rounded-full hover:opacity-70 transition-opacity"
              style={{ background: "var(--tag-bg)", color: "var(--tag-text)" }}
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1
          className="text-4xl font-bold leading-snug mb-4"
          style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}
        >
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
          <span className="tracking-widest">{post.date}</span>
          <span>·</span>
          <span style={{ color: "var(--accent)" }}>約{post.readingTime}分で読めます</span>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, var(--accent), transparent)" }} />
          <span style={{ color: "var(--accent)", opacity: 0.5 }}>✦</span>
        </div>
      </header>

      {/* 目次 */}
      <TableOfContents headings={post.headings} />

      {/* 記事本文 */}
      <article
        className="prose prose-stone max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
          prose-p:leading-relaxed prose-p:mb-6
          prose-li:leading-relaxed
          prose-strong:font-semibold"
        style={{ fontFamily: "var(--font-sans)" }}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* 前後ナビ */}
      <div
        className="mt-16 pt-10 grid grid-cols-2 gap-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="group rounded-xl p-4 card-glow"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <p className="text-xs mb-2 tracking-widest" style={{ color: "var(--muted)" }}>← 前の記事</p>
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}>
              {prev.title}
            </p>
          </Link>
        ) : <div />}

        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="group rounded-xl p-4 text-right card-glow"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <p className="text-xs mb-2 tracking-widest" style={{ color: "var(--muted)" }}>次の記事 →</p>
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}>
              {next.title}
            </p>
          </Link>
        ) : <div />}
      </div>

      {/* 記事フッター */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
          style={{ color: "var(--accent)" }}
        >
          ← 記事一覧に戻る
        </Link>
      </div>

    </main>
  );
}
