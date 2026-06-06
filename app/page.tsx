import Link from "next/link";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import FadeIn from "@/app/components/FadeIn";
import SearchBar from "@/app/components/SearchBar";

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const allPosts = getAllPosts();
  const posts = q
    ? allPosts.filter(
        (p) =>
          p.title.includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.excerpt.includes(q)
      )
    : allPosts;

  return (
    <main>
      {/* ヒーローセクション */}
      <section
        style={{
          background: "linear-gradient(160deg, #f0e4d0 0%, #faf6f1 45%, #fdf4ea 100%)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "clamp(100px, 18vw, 220px)",
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            color: "rgba(181,118,58,0.06)",
            lineHeight: 1,
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          Blog
        </div>

        <div className="max-w-3xl mx-auto px-6 py-24 relative">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "var(--accent)" }}>
              Self Growth
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-5xl font-bold leading-tight mb-6" style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}>
              学んだことを、<br />言葉にする場所。
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-base max-w-md leading-relaxed" style={{ color: "var(--muted)" }}>
              日々の自己研鑽を記録するブログ。<br />技術・読書・思考の断片を残していきます。
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10 flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
              <span className="text-xs tracking-widest" style={{ color: "var(--muted)" }}>SCROLL</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 記事一覧 */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold tracking-wide" style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}>
              All Posts
            </h2>
            <span className="text-xs tracking-widest" style={{ color: "var(--muted)" }}>{posts.length} articles</span>
          </div>

          {/* 検索バー */}
          <div className="mb-8">
            <Suspense>
              <SearchBar defaultValue={q} />
            </Suspense>
          </div>

          {q && (
            <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
              「{q}」の検索結果: {posts.length} 件
            </p>
          )}
        </FadeIn>

        <ul className="grid gap-3">
          {posts.length === 0 ? (
            <FadeIn>
              <p className="text-sm py-8 text-center" style={{ color: "var(--muted)" }}>記事が見つかりませんでした</p>
            </FadeIn>
          ) : (
            posts.map((post, i) => (
              <li key={post.slug}>
                <FadeIn delay={i * 80}>
                  <Link href={`/posts/${post.slug}`} className="block group card-hover">
                    <article
                      className="rounded-xl p-6 transition-all duration-300 group-hover:shadow-md"
                      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-lg font-bold mb-1 title-underline inline"
                            style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}
                          >
                            {post.title}
                          </h3>
                          <p className="text-xs mt-2 mb-2 line-clamp-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs tracking-wider" style={{ color: "var(--muted)" }}>{post.date}</span>
                            <span className="text-xs" style={{ color: "var(--accent)" }}>約{post.readingTime}分</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2.5 py-0.5 rounded-full"
                                style={{ background: "var(--tag-bg)", color: "var(--tag-text)" }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span
                          className="text-lg mt-1 shrink-0 group-hover:translate-x-1 transition-transform"
                          style={{ color: "var(--accent)", opacity: 0.5 }}
                        >
                          →
                        </span>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              </li>
            ))
          )}
        </ul>

        <FadeIn delay={200}>
          <div className="mt-16 divider-ornament">
            <span className="text-xs tracking-widest px-4" style={{ color: "var(--muted)" }}>✦</span>
          </div>
        </FadeIn>

        {/* プロフィールカード */}
        <FadeIn delay={250}>
          <div
            className="mt-10 rounded-2xl p-6 flex items-center gap-6"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-2xl font-bold"
              style={{ background: "var(--tag-bg)", color: "var(--accent)", fontFamily: "var(--font-serif)" }}
            >
              ア
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm mb-0.5" style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}>アイク</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                インフラエンジニア。自己研鑽でAIを触り始め、学びをここに記録しています。
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://x.com/r_nextstage"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                style={{ color: "var(--foreground)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <Link
                href="/about"
                className="text-xs px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity"
                style={{ background: "var(--tag-bg)", color: "var(--tag-text)" }}
              >
                詳細 →
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
