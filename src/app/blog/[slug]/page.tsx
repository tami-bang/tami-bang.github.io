import Link from "next/link"; // 용도 블로그 목록 페이지 이동
import { notFound } from "next/navigation"; // 용도 존재하지 않는 게시글 404 처리
import MarkdownRenderer from "@/components/MarkdownRenderer"; // 용도 Markdown 본문 렌더링
import { getAllPosts, getPostBySlug } from "@/lib/post"; // 용도 게시글 목록 및 상세 조회

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
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
    <main className="content-shell">
      <Link href="/blog" className="back-link">
        ← 공부 기록으로 돌아가기
      </Link>

      <article className="blog-detail-card page-section--reveal">
        <p className="category-pill">{post.category}</p>

        <h1 className="blog-detail-title">{post.title}</h1>

        <p className="blog-detail-description">{post.description}</p>

        <p className="blog-detail-date">{post.createdAt}</p>

        <MarkdownRenderer content={post.content} />
      </article>
    </main>
  );
}
