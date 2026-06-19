import Link from "next/link"; // 용도 게시글 상세 페이지와 카테고리 페이지 이동
import BlogPostList from "@/components/BlogPostList"; // 용도 공부 기록 목록형 표시
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import { getAllPosts } from "@/lib/post"; // 용도 로컬 Markdown 게시글 목록 조회
import { studyCategoryItems } from "@/lib/site"; // 용도 공부 카테고리 URL 생성

export const metadata = {
  title: "공부 기록 | Tami.log",
  description: "개발 공부 과정에서 배운 내용을 과목별로 정리합니다.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="content-shell">
      <section className="page-hero page-section--reveal">
        <SectionHeader
          eyebrow="Study Log"
          title="공부 기록을 과목별로 정리합니다."
          description="리눅스, 네트워크, C언어, HTML/CSS/JS, 파이썬/Django처럼 배운 내용을 주제별로 나누고, 프로젝트와 연결되는 개념은 함께 기록합니다."
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
        <section className="empty-panel page-section--reveal-delayed">
          <h2>아직 작성된 글이 없습니다.</h2>
          <p>src/content/posts 폴더에 공부 기록을 Markdown으로 추가하면 이곳에 표시됩니다.</p>
        </section>
      )}
    </main>
  );
}
