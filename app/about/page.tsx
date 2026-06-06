import Link from "next/link";
import FadeIn from "@/app/components/FadeIn";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      <FadeIn>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest hover:opacity-60 transition-opacity mb-14"
          style={{ color: "var(--muted)" }}
        >
          ← BACK
        </Link>
      </FadeIn>

      <FadeIn delay={100}>
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--accent)" }}>
          About
        </p>
        <h1
          className="text-4xl font-bold mb-10"
          style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}
        >
          アイク
        </h1>
      </FadeIn>

      {/* 装飾ライン */}
      <FadeIn delay={150}>
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, var(--accent), transparent)" }} />
          <span style={{ color: "var(--accent)", opacity: 0.5 }}>✦</span>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--foreground)" }}>
          <p>
            インフラエンジニアとして日々サーバーやネットワークと向き合いながら、
            自己研鑽の一環としてAIを触り始めました。
          </p>
          <p>
            このブログは、学んだことや気づいたことを言葉にして残していく場所です。
            技術的なメモから思考の断片まで、小さな積み重ねを丁寧に記録していきます。
          </p>
        </div>
      </FadeIn>

      {/* SNSリンク */}
      <FadeIn delay={300}>
        <div className="mt-12 flex items-center gap-4">
          <a
            href="https://x.com/r_nextstage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-80 hover:-translate-y-0.5"
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X でフォロー
          </a>
        </div>
      </FadeIn>

    </main>
  );
}
