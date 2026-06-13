# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # 開発サーバー起動 (localhost:3000)
npm run build   # 本番ビルド
npm start       # 本番ビルド後のサーバー起動
npm run lint    # ESLint 実行
```

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v3** + **@tailwindcss/typography**
- **gray-matter** — Markdown フロントマター（タイトル・日付・タグ）のパース
- **remark / remark-html** — Markdown 本文を HTML に変換

> Tailwind CSS は v3 を使用。v4 は Windows の日本語パスでビルドエラーが発生するため。

## Architecture

記事を Markdown ファイルで管理するシンプルな静的ブログ。

```
posts/*.md          ← 記事ファイル（フロントマター: title, date, tags[]）
lib/posts.ts        ← getAllPosts() / getPost(slug) — ファイルシステムから記事を読み込む
app/page.tsx        ← 記事一覧
app/posts/[slug]/   ← 記事詳細（動的ルーティング）
app/tags/[tag]/     ← タグ絞り込み一覧
```

## Styling

色はすべて `app/globals.css` の CSS 変数で管理している。

```css
--background, --foreground, --accent, --border, --tag-bg, --tag-text, --muted
```

コンポーネント内では Tailwind クラスと `style={{ color: "var(--accent)" }}` を併用。

## Adding Posts

`posts/` に `.md` ファイルを追加するだけで記事が増える。フロントマターの形式：

```markdown
---
title: "記事タイトル"
date: "YYYY-MM-DD"
tags: ["タグ1", "タグ2"]
---
```
