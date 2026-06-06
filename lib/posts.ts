import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export type Heading = { id: string; text: string; level: number };

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  readingTime: number;
  excerpt: string;
};

export type Post = PostMeta & {
  contentHtml: string;
  headings: Heading[];
};

function calcReadingTime(content: string): number {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(chars / 400));
}

function extractExcerpt(content: string): string {
  const lines = content.split("\n").filter((l) => l.trim() && !l.startsWith("#") && !l.startsWith("-"));
  const text = lines[0] ?? "";
  return text.length > 80 ? text.substring(0, 80) + "…" : text;
}

function extractHeadings(content: string): Heading[] {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.replace(/[^\w぀-ゟ゠-ヿ一-鿿]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}

function addIdsToHeadings(html: string, headings: Heading[]): string {
  let result = html;
  for (const h of headings) {
    result = result.replace(
      new RegExp(`<(h${h.level})>(${h.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})<\\/h${h.level}>`),
      `<$1 id="${h.id}">$2</$1>`
    );
  }
  return result;
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        readingTime: calcReadingTime(content),
        excerpt: extractExcerpt(content),
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const headings = extractHeadings(content);
  const processed = await remark().use(html).process(content);
  const contentHtml = addIdsToHeadings(processed.toString(), headings);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: calcReadingTime(content),
    excerpt: extractExcerpt(content),
    contentHtml,
    headings,
  };
}

export function getPrevNextPosts(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}
