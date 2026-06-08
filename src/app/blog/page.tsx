import Link from "next/link"; // 용도 게시글 상세 페이지와 카테고리 페이지 이동
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import { getAllPosts } from "@/lib/post"; // 용도 로컬 Markdown 게시글 목록 조회
import { getCategorySlug, studyCategoryItems } from "@/lib/site"; // 용도 공부 카테고리 URL 생성

export const metadata = {
  title: "Backend Notes | Tami.log",
  description: "자동화와 백엔드 구현 과정에서 배운 것을 기록합니다.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="content-shell">
      <section className="page-hero page-section--reveal">
        <SectionHeader
          eyebrow="Backend Notes"
          title="자동화와 백엔드 구현 과정에서 배운 것을 기록합니다."
          description="개념을 따로 정리하기보다, 반복 작업을 줄이거나 API 흐름을 구현하면서 마주친 문제를 중심으로 기록합니다. Python, FastAPI, 데이터 처리, 네트워크, AI 활용은 모두 자동화와 백엔드 구현을 위한 도구로 다룹니다."
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

      <section className="blog-grid page-section--reveal-delayed">
        {posts.map((post) => (
          <article className="study-card" key={post.slug}>
            <div>
              <Link
                className="category-pill"
                href={`/blog/category/${getCategorySlug(post.category)}`}
              >
                {post.category}
              </Link>

              <h2>{post.title}</h2>

              <p>{post.description}</p>
            </div>

            <div className="study-card__footer">
              <span>{post.createdAt}</span>

              <Link href={`/blog/${post.slug}`} className="read-more-link">
                Read more
              </Link>
            </div>
          </article>
        ))}
      </section>

      {posts.length === 0 && (
        <section className="empty-panel page-section--reveal-delayed">
          <h2>아직 작성된 글이 없습니다.</h2>
          <p>src/content/posts 폴더에 자동화와 백엔드 구현 기록을 Markdown으로 추가하면 이곳에 표시됩니다.</p>
        </section>
      )}
    </main>
  );
}
