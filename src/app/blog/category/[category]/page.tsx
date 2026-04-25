import Link from "next/link"; // 용도 페이지 이동
import { notFound } from "next/navigation"; // 용도 잘못된 카테고리 404 처리
import { getAllPosts } from "@/lib/post"; // 용도 전체 게시글 조회
import { studyCategories } from "@/lib/site"; // 용도 카테고리 목록 기준 검증

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return studyCategories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

function decodeCategory(category: string) {
  return decodeURIComponent(category);
}

function isValidCategory(category: string) {
  const decodedCategory = decodeCategory(category);

  return studyCategories.includes(decodedCategory);
}

function filterPostsByCategory(category: string) {
  const decodedCategory = decodeCategory(category);
  const posts = getAllPosts();

  return posts.filter((post) => post.category === decodedCategory);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const decodedCategory = decodeCategory(category);
  const filteredPosts = filterPostsByCategory(category);

  return (
    <main className="content-shell">
      <section className="page-hero page-section--reveal">
        <h1>{decodedCategory}</h1>
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