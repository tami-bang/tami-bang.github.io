"use client";

import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import { usePathname } from "next/navigation"; // 용도 현재 경로 기준 활성 메뉴 표시
import { siteConfig } from "@/lib/site"; // 용도 사이트 공통 메뉴 데이터 조회

function isActiveNavItem(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function HeaderNavLinks() {
  const pathname = usePathname();

  return (
    <div className="site-header__links">
      {siteConfig.navItems.map((item) => {
        const isActive = isActiveNavItem(pathname, item.href);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={isActive ? "site-nav-link site-nav-link--active" : "site-nav-link"}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
