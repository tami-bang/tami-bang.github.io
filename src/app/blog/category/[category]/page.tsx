import Link from "next/link"; // 용도 블로그 목록과 게시글 상세 페이지 이동
import { notFound } from "next/navigation"; // 용도 잘못된 카테고리 404 처리
import BlogPostList from "@/components/BlogPostList"; // 용도 공부 기록 목록형 표시
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
        <p>공부 기록에서 해당 과목으로 정리한 글입니다.</p>

        <div className="category-strip">
          <Link href="/blog" className="category-link">
            전체 보기
          </Link>

          {studyCategoryItems.map((item) => (
            <Link
              aria-current={item.slug === category ? "page" : undefined}
              className={
                item.slug === category ? "category-link category-link--active" : "category-link"
              }
              href={`/blog/category/${item.slug}`}
              key={item.slug}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <BlogPostList posts={filteredPosts} />

      {filteredPosts.length === 0 && (
        <section className="empty-panel page-section--reveal-delayed">
          <h2>해당 카테고리에 작성된 글이 없습니다.</h2>
        </section>
      )}
    </main>
  );
}
