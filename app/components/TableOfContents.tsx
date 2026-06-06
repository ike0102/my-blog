"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/posts";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      className="rounded-xl p-5 mb-10"
      style={{ background: "var(--tag-bg)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
        目次
      </p>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? "1rem" : "0" }}>
            <a
              href={`#${h.id}`}
              className="text-sm transition-all hover:opacity-100"
              style={{
                color: activeId === h.id ? "var(--accent)" : "var(--muted)",
                fontWeight: activeId === h.id ? 600 : 400,
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
