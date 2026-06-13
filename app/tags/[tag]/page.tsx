import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getAllPosts().filter((p) => p.tags.includes(decodedTag));

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm mb-12 hover:opacity-60 transition-opacity"
        style={{ color: "var(--muted)" }}
      >
        ← 一覧に戻る
      </Link>

      <div className="mb-12">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Tag</p>
        <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>{decodedTag}</h1>
        <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>{posts.length} 件の記事</p>
      </div>

      <ul className="grid gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="block group">
              <article
                className="rounded-2xl p-6 card-glow"
                style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1 group-hover:opacity-70 transition-opacity" style={{ color: "var(--foreground)" }}>
                      {post.title}
                    </h3>
                    <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>{post.date}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-0.5 rounded-full"
                          style={
                            t === decodedTag
                              ? { background: "var(--accent)", color: "#fff" }
                              : { background: "var(--tag-bg)", color: "var(--tag-text)" }
                          }
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xl mt-1 shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: "var(--border)" }}>
                    →
                  </span>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

    </main>
  );
}
