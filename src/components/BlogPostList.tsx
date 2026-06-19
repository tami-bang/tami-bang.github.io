import Link from "next/link"; // 용도 게시글 상세 페이지와 카테고리 페이지 이동
import type { BlogPost } from "@/lib/post"; // 용도 공부 기록 목록 데이터 타입
import { getCategorySlug } from "@/lib/site"; // 용도 카테고리 URL 생성

type BlogPostListProps = {
  posts: BlogPost[];
};

function createPostHref(slug: string) {
  return `/blog/${slug}`;
}

function createCategoryHref(category: string) {
  return `/blog/category/${getCategorySlug(category)}`;
}

function getDisplayDate(post: BlogPost) {
  return post.updatedAt || post.createdAt;
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <section className="study-list page-section--reveal-delayed" aria-label="공부 기록 목록">
      {posts.map((post) => (
        <article className="study-list-item" key={post.slug}>
          <div className="study-list-item__main">
            <Link className="category-pill" href={createCategoryHref(post.category)}>
              {post.category}
            </Link>

            <Link className="study-list-item__title" href={createPostHref(post.slug)}>
              {post.title}
            </Link>

            <p>{post.description}</p>
          </div>

          <div className="study-list-item__meta">
            <span>수정</span>
            <time dateTime={getDisplayDate(post)}>{getDisplayDate(post)}</time>

            <Link href={createPostHref(post.slug)} className="study-list-item__link">
              읽기
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
