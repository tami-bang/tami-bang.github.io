import { studyCategories } from "@/lib/site"; // 공부 카테고리 데이터 조회

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-5xl font-black">Study Log</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        공부한 내용을 주제별로 정리하는 공간입니다. 개념, 코드, 에러 해결, 프로젝트 적용까지 연결해 기록합니다.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {studyCategories.map((category) => (
          <article
            key={category}
            className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm"
          >
            <h2 className="text-xl font-black">{category}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {category} 학습 기록을 정리할 예정입니다.
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}