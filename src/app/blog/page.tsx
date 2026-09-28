import EditorialPageHeader from "@/components/EditorialPageHeader";
import Link from "next/link"; // 용도 게시글 상세 페이지와 카테고리 페이지 이동
import BlogPostList from "@/components/BlogPostList"; // 용도 공부 기록 목록형 표시
import { getAllPosts } from "@/lib/post"; // 용도 로컬 Markdown 게시글 목록 조회
import { studyCategoryItems } from "@/lib/site"; // 용도 공부 카테고리 URL 생성

export const metadata = {
  title: "Study Log | Tami.log",
  description: "개발 공부 과정에서 배운 내용을 과목별로 정리합니다.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="content-shell editorial-page editorial-subpage editorial-study-page">
      <section className="page-hero">
        <EditorialPageHeader
          eyebrow="STUDY / NOTES & ARCHIVE"
          title="STUDY"
        />

        <div className="category-strip">
          {studyCategoryItems.map((category) => (
            <Link
              className="category-link"
              href={`/blog/category/${category.slug}`}
              key={category.slug}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <BlogPostList posts={posts} />

      {posts.length === 0 && (
        <section className="empty-panel">
          <h2>아직 작성된 글이 없습니다.</h2>
          <p>src/content/posts 폴더에 Markdown을 추가하면 이곳에 표시됩니다.</p>
        </section>
      )}
    </main>
  );
}
