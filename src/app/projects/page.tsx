import { featuredProjects } from "@/lib/site"; // 프로젝트 목록 데이터 조회

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-5xl font-black">Projects</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        직접 설계하고 구현한 프로젝트를 문제 해결, 기술 스택, 핵심 기능, 결과 중심으로 정리합니다.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <article
            key={project.title}
            className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm"
          >
            <h2 className="text-2xl font-black">{project.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{project.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}