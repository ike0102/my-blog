import type { Metadata } from "next";
import { Noto_Serif_JP, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "自己研鑽ブログ",
  description: "学んだことの記録",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} ${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>

        <Header />

        <div className="flex-1">{children}</div>

        <footer style={{ borderTop: "1px solid var(--border)", background: "var(--header-bg)" }}>
          <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col items-center gap-2">
            <p className="font-bold text-base tracking-wide" style={{ color: "var(--foreground)", fontFamily: "var(--font-serif)" }}>自己研鑽ブログ</p>
            <p className="text-xs tracking-widest" style={{ color: "var(--muted)" }}>小さな積み重ねを、丁寧に。</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
