import Link from "next/link"; // 용도 블로그 목록 페이지 이동
import { notFound } from "next/navigation"; // 용도 존재하지 않는 게시글 404 처리
import { getAllPosts, getPostBySlug } from "@/lib/post"; // 용도 게시글 상세/정적 경로 조회

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function renderMarkdownLine(line: string, index: number) {
  if (line.startsWith("### ")) {
    return (
      <h3 key={index} className="mt-8 text-2xl font-black">
        {line.replace("### ", "")}
      </h3>
    );
  }

  if (line.startsWith("## ")) {
    return (
      <h2 key={index} className="mt-10 text-3xl font-black">
        {line.replace("## ", "")}
      </h2>
    );
  }

  if (line.startsWith("# ")) {
    return (
      <h1 key={index} className="mt-10 text-4xl font-black">
        {line.replace("# ", "")}
      </h1>
    );
  }

  if (line.startsWith("- ")) {
    return (
      <li key={index} className="ml-5 list-disc leading-8 text-slate-700">
        {line.replace("- ", "")}
      </li>
    );
  }

  if (line.trim() === "") {
    return <div key={index} className="h-4" />;
  }

  return (
    <p key={index} className="leading-9 text-slate-700">
      {line}
    </p>
  );
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/blog" className="text-sm font-black text-indigo-600">
        ← 공부 기록으로 돌아가기
      </Link>

      <article className="mt-10 rounded-3xl bg-white p-7 shadow-sm md:p-10">
        <p className="mb-5 inline-flex rounded-full bg-sky-200 px-4 py-2 text-sm font-bold text-slate-900">
          {post.category}
        </p>

        <h1 className="text-fluid-title font-black leading-tight tracking-tight text-slate-950">
          {post.title}
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          {post.description}
        </p>

        <p className="mt-4 text-sm font-bold text-slate-500">
          {post.createdAt}
        </p>

        <div className="mt-12 space-y-2">
          {post.content.split("\n").map(renderMarkdownLine)}
        </div>
      </article>
    </main>
  );
}