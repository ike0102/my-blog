"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(245, 237, 226, 0.75)" : "var(--header-bg)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
            自己研鑽ブログ
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: "var(--tag-bg)", color: "var(--accent)" }}
          >
            記録
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium" style={{ color: "var(--muted)" }}>
          <Link href="/" className="hover:opacity-60 transition-opacity">記事一覧</Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
          <a
            href="https://x.com/r_nextstage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
            style={{ color: "var(--foreground)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
