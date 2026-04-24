import fs from "node:fs"; // 용도 로컬 파일 시스템에서 게시글 파일 조회
import path from "node:path"; // 용도 게시글 파일 경로 조합

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  content: string;
};

const POSTS_DIRECTORY = path.join(process.cwd(), "src/content/posts");

function ensurePostsDirectory() {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
  }
}

function parseFrontmatterValue(line: string) {
  return line.replace(/^.*?:\s*/, "").replace(/^["']|["']$/g, "").trim();
}

function parseMarkdownPost(slug: string, rawContent: string): BlogPost {
  const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    return {
      slug,
      title: slug,
      description: "",
      category: "Study",
      createdAt: "",
      content: rawContent,
    };
  }

  const frontmatter = frontmatterMatch[1];
  const content = frontmatterMatch[2];

  const titleLine = frontmatter
    .split("\n")
    .find((line) => line.startsWith("title:"));

  const descriptionLine = frontmatter
    .split("\n")
    .find((line) => line.startsWith("description:"));

  const categoryLine = frontmatter
    .split("\n")
    .find((line) => line.startsWith("category:"));

  const createdAtLine = frontmatter
    .split("\n")
    .find((line) => line.startsWith("createdAt:"));

  return {
    slug,
    title: titleLine ? parseFrontmatterValue(titleLine) : slug,
    description: descriptionLine ? parseFrontmatterValue(descriptionLine) : "",
    category: categoryLine ? parseFrontmatterValue(categoryLine) : "Study",
    createdAt: createdAtLine ? parseFrontmatterValue(createdAtLine) : "",
    content,
  };
}

export function getAllPosts() {
  ensurePostsDirectory();

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const filePath = path.join(POSTS_DIRECTORY, fileName);
      const rawContent = fs.readFileSync(filePath, "utf-8");

      return parseMarkdownPost(slug, rawContent);
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPostBySlug(slug: string) {
  ensurePostsDirectory();

  const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");

  return parseMarkdownPost(slug, rawContent);
}