"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled
          ? "rgba(var(--header-bg-raw, 245, 237, 226), 0.8)"
          : "var(--header-bg)",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            ア
          </div>
          <span className="text-base font-bold tracking-tight" style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}>
            自己研鑽ブログ
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium" style={{ color: "var(--muted)" }}>
          <Link href="/" className="nav-link hover:text-[var(--foreground)] transition-colors">記事一覧</Link>
          <Link href="/about" className="nav-link hover:text-[var(--foreground)] transition-colors">About</Link>
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

          <button onClick={toggleTheme} className="theme-toggle" aria-label="テーマ切り替え">
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
