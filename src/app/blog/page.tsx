import Link from "next/link"; // 용도 게시글 상세 페이지 이동
import { getAllPosts } from "@/lib/post"; // 용도 로컬 Markdown 게시글 목록 조회
import { studyCategories } from "@/lib/site"; // 용도 공부 카테고리 데이터 조회

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-5 text-sm font-black uppercase tracking-[0.45em] text-pink-600">
        Study Log
      </p>

      <h1 className="text-fluid-title font-black tracking-tight text-slate-950">
        공부 기록
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        공부한 내용을 주제별로 정리하는 공간입니다. 개념, 코드, 에러 해결,
        프로젝트 적용까지 연결해 기록합니다.
      </p>

      <section className="mt-10 flex flex-wrap gap-3">
        {studyCategories.map((category) => (
          <span
            key={category}
            className="rounded-xl bg-sky-200 px-4 py-3 text-base font-bold text-slate-900"
          >
            {category}
          </span>
        ))}
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="mb-4 inline-flex rounded-full bg-sky-200 px-4 py-2 text-sm font-bold text-slate-900">
              {post.category}
            </p>

            <h2 className="text-2xl font-black leading-snug text-slate-950">
              {post.title}
            </h2>

            <p className="mt-4 min-h-16 text-base leading-7 text-slate-600">
              {post.description}
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-slate-500">
                {post.createdAt}
              </span>

              <Link
                href={`/blog/${post.slug}`}
                className="text-base font-black text-slate-950"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
      </section>

      {posts.length === 0 && (
        <section className="mt-14 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8">
          <h2 className="text-2xl font-black">아직 작성된 글이 없습니다.</h2>
          <p className="mt-3 leading-7 text-slate-600">
            /admin 페이지에서 첫 공부 기록을 작성하면 이곳에 표시됩니다.
          </p>
        </section>
      )}
    </main>
  );
}