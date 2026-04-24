import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import { siteConfig } from "@/lib/site"; // 용도 사이트 공통 설정 조회

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-sky-200/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-7 py-6">
        <Link
          href="/"
          className="text-3xl font-black tracking-tight text-indigo-600"
        >
          {siteConfig.name}
          <span className="ml-1 text-slate-900">.log</span>
        </Link>

        <div className="hidden items-center gap-10 text-lg font-bold text-slate-900 md:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-indigo-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}