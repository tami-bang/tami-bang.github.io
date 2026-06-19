import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import HeaderNavLinks from "@/components/HeaderNavLinks"; // 용도 활성 상태가 있는 헤더 메뉴
import ThemeToggle from "@/components/ThemeToggle"; // 용도 다크모드/화이트모드 전환
import { siteConfig } from "@/lib/site"; // 용도 사이트 공통 설정 조회

export default function Header() {
  return (
    <header className="site-header">
      <nav className="site-header__nav">
        <Link href="/" className="site-logo">
          {siteConfig.name}
          <span>.log</span>
        </Link>

        <div className="site-header__right">
          <HeaderNavLinks />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
