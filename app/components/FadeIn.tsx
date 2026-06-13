"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  blur?: boolean;
};

export default function FadeIn({ children, delay = 0, blur = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        filter: blur ? (visible ? "blur(0px)" : "blur(4px)") : undefined,
        transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms${blur ? `, filter 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms` : ""}`,
      }}
    >
      {children}
    </div>
  );
}
