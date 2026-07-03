import fs from "node:fs"; // 용도 로컬 파일 시스템에서 게시글 파일 조회
import path from "node:path"; // 용도 게시글 파일 경로 조합

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  content: string;
};

const POSTS_DIRECTORY = path.join(process.cwd(), "src/content/posts");
const MARKDOWN_EXTENSION = ".md";
const DEFAULT_CATEGORY = "Study";

function ensurePostsDirectory() {
  if (fs.existsSync(POSTS_DIRECTORY)) {
    return;
  }

  fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
}

function normalizeSlug(slug: string) {
  return decodeURIComponent(slug).normalize("NFC").trim();
}

function parseFrontmatterValue(line: string) {
  return line
    .replace(/^.*?:\s*/, "")
    .replace(/^["']|["']$/g, "")
    .trim();
}

function getMarkdownFileNames() {
  ensurePostsDirectory();

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(MARKDOWN_EXTENSION));
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, "").normalize("NFC");
}

function getFrontmatterLine(frontmatter: string, key: string) {
  return frontmatter.split(/\r?\n/).find((line) => line.startsWith(`${key}:`));
}

function createFallbackPost(slug: string, rawContent: string): BlogPost {
  return {
    slug,
    title: slug,
    description: "",
    category: DEFAULT_CATEGORY,
    createdAt: "",
    updatedAt: "",
    content: rawContent,
  };
}

function stripFirstHeading(content: string) {
  return content.replace(/^\s*#\s+.*(?:\r?\n){1,2}/, "");
}

function parseMarkdownPost(slug: string, rawContent: string): BlogPost {
  const frontmatterMatch = rawContent.match(
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/,
  );

  if (!frontmatterMatch) {
    return createFallbackPost(slug, rawContent);
  }

  const frontmatter = frontmatterMatch[1];
  const content = stripFirstHeading(frontmatterMatch[2]);

  const titleLine = getFrontmatterLine(frontmatter, "title");
  const descriptionLine = getFrontmatterLine(frontmatter, "description");
  const categoryLine = getFrontmatterLine(frontmatter, "category");
  const createdAtLine = getFrontmatterLine(frontmatter, "createdAt");
  const updatedAtLine = getFrontmatterLine(frontmatter, "updatedAt");
  const createdAt = createdAtLine ? parseFrontmatterValue(createdAtLine) : "";

  return {
    slug,
    title: titleLine ? parseFrontmatterValue(titleLine) : slug,
    description: descriptionLine ? parseFrontmatterValue(descriptionLine) : "",
    category: categoryLine
      ? parseFrontmatterValue(categoryLine)
      : DEFAULT_CATEGORY,
    createdAt,
    updatedAt: updatedAtLine ? parseFrontmatterValue(updatedAtLine) : createdAt,
    content,
  };
}

function readPostFile(fileName: string) {
  const slug = getSlugFromFileName(fileName);
  const filePath = path.join(POSTS_DIRECTORY, fileName);
  const rawContent = fs.readFileSync(filePath, "utf-8");

  return parseMarkdownPost(slug, rawContent);
}

export function getAllPosts() {
  return getMarkdownFileNames()
    .map(readPostFile)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPostBySlug(slug: string) {
  ensurePostsDirectory();

  const normalizedSlug = normalizeSlug(slug);
  const filePath = path.join(
    POSTS_DIRECTORY,
    `${normalizedSlug}${MARKDOWN_EXTENSION}`,
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");

  return parseMarkdownPost(normalizedSlug, rawContent);
}
