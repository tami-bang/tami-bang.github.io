import Link from "next/link"; // 용도 블로그 목록과 게시글 상세 페이지 이동
import { notFound } from "next/navigation"; // 용도 잘못된 카테고리 404 처리
import { getAllPosts } from "@/lib/post"; // 용도 전체 게시글 조회
import {
  getCategoryLabel,
  getCategorySlug,
  isValidCategorySlug,
  studyCategoryItems,
} from "@/lib/site"; // 용도 카테고리 slug 검증과 표시명 변환

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return studyCategoryItems.map((category) => ({
    category: category.slug,
  }));
}

function filterPostsByCategory(categorySlug: string) {
  const posts = getAllPosts();

  return posts.filter((post) => getCategorySlug(post.category) === categorySlug);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isValidCategorySlug(category)) {
    notFound();
  }

  const categoryLabel = getCategoryLabel(category);
  const filteredPosts = filterPostsByCategory(category);

  return (
    <main className="content-shell">
      <section className="page-hero page-section--reveal">
        <h1>{categoryLabel}</h1>
        <p>해당 카테고리의 학습 기록입니다.</p>

        <Link href="/blog" className="read-more-link">
          전체 보기
        </Link>
      </section>

      <section className="blog-grid page-section--reveal-delayed">
        {filteredPosts.map((post) => (
          <article className="study-card" key={post.slug}>
            <div>
              <p className="category-pill">{post.category}</p>

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

      {filteredPosts.length === 0 && (
        <section className="empty-panel page-section--reveal-delayed">
          <h2>해당 카테고리에 글이 없습니다.</h2>
        </section>
      )}
    </main>
  );
}