import Link from "next/link"; // 용도 게시글 상세 및 카테고리 페이지 이동
import SectionHeader from "@/components/SectionHeader"; // 용도 공통 섹션 헤더 표시
import { getAllPosts } from "@/lib/post"; // 용도 로컬 Markdown 게시글 목록 조회
import { studyCategories } from "@/lib/site"; // 용도 공부 카테고리 데이터 조회

export const metadata = {
  title: "Study Log | Tami.log",
  description: "AI, Backend, Network, Frontend 학습 기록",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="content-shell">
      <section className="page-hero page-section--reveal">
        <SectionHeader
          eyebrow="Study Log"
          title="Learning records connected to projects"
          description="개념만 정리하지 않고, 배운 내용을 어떤 프로젝트 구조에 적용했는지 함께 기록합니다."
        />

        <div className="category-strip">
          {studyCategories.map((category) => (
            <Link
              className="category-link"
              href={`/blog/category/${encodeURIComponent(category)}`}
              key={category}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="blog-grid page-section--reveal-delayed">
        {posts.map((post) => (
          <article className="study-card" key={post.slug}>
            <div>
              <p className="category-pill">{post.category}</p>

              <h2>{post.title}</h2>

              <p>{post.description}</p>
            </div>

            <div className="study-card__footer">
              <span>{post.createdAt}</span>

              <Link className="read-more-link" href={`/blog/${post.slug}`}>
                Read more
              </Link>
            </div>
          </article>
        ))}
      </section>

      {posts.length === 0 && (
        <section className="empty-panel page-section--reveal-delayed">
          <h2>아직 작성된 글이 없습니다.</h2>

          <p>/admin 페이지에서 첫 공부 기록을 작성하면 이곳에 표시됩니다.</p>
        </section>
      )}
    </main>
  );
}