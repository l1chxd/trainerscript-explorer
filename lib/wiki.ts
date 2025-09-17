import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const CONTENT_ROOT = path.resolve("content");

export interface WikiListItem {
  slug: string[];
  title: string;
}

export interface WikiArticle extends WikiListItem {
  html: string;
}

function normalizeSlugSegment(segment: string): string {
  return segment.replace(/\\.md$/i, "");
}

function resolveMarkdownPath(slug: string[]): string | null {
  const sanitizedSegments = slug.map(normalizeSlugSegment);
  const targetPath = path.join(CONTENT_ROOT, ...sanitizedSegments) + ".md";
  const normalized = path.normalize(targetPath);
  const relative = path.relative(CONTENT_ROOT, normalized);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }
  return normalized;
}

async function collectMarkdownFiles(directory: string, prefix: string[] = []): Promise<{
  slug: string[];
  filePath: string;
}[]> {
  const dirents = await fs.readdir(directory, { withFileTypes: true });
  const entries: { slug: string[]; filePath: string }[] = [];

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      const nested = await collectMarkdownFiles(path.join(directory, dirent.name), [
        ...prefix,
        dirent.name,
      ]);
      entries.push(...nested);
    } else if (dirent.isFile() && dirent.name.endsWith(".md")) {
      const baseName = dirent.name.slice(0, -3);
      entries.push({
        slug: [...prefix, baseName],
        filePath: path.join(directory, dirent.name),
      });
    }
  }

  return entries;
}

function extractTitle(data: Record<string, unknown>, slug: string[]): string {
  const rawTitle = data.title;
  if (typeof rawTitle === "string" && rawTitle.trim().length > 0) {
    return rawTitle.trim();
  }
  const fallback = slug[slug.length - 1] ?? "Unbenannt";
  return fallback.replace(/[-_]/g, " ");
}

export async function getWikiList(): Promise<WikiListItem[]> {
  const entries = await collectMarkdownFiles(CONTENT_ROOT);
  const items: WikiListItem[] = [];

  for (const entry of entries) {
    const fileContent = await fs.readFile(entry.filePath, "utf8");
    const parsed = matter(fileContent);
    items.push({
      slug: entry.slug,
      title: extractTitle(parsed.data as Record<string, unknown>, entry.slug),
    });
  }

  return items.sort((a, b) => a.title.localeCompare(b.title, "de"));
}

export async function getWikiSlugs(): Promise<string[][]> {
  const entries = await collectMarkdownFiles(CONTENT_ROOT);
  return entries.map((entry) => entry.slug);
}

export async function getWikiArticle(slug: string[]): Promise<WikiArticle | null> {
  const filePath = resolveMarkdownPath(slug);
  if (!filePath) {
    return null;
  }

  let fileContent: string;
  try {
    fileContent = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }

  const parsed = matter(fileContent);
  const processed = await remark().use(remarkHtml).process(parsed.content);

  const sanitizedSlug = slug.map(normalizeSlugSegment);

  return {
    slug: sanitizedSlug,
    title: extractTitle(parsed.data as Record<string, unknown>, sanitizedSlug),
    html: processed.toString(),
  };
}

export async function getWikiTitle(slug: string[]): Promise<string | null> {
  const filePath = resolveMarkdownPath(slug);
  if (!filePath) {
    return null;
  }

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const parsed = matter(fileContent);
    const sanitizedSlug = slug.map(normalizeSlugSegment);
    return extractTitle(parsed.data as Record<string, unknown>, sanitizedSlug);
  } catch {
    return null;
  }
}
