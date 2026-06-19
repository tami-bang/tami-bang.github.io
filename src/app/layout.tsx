import type { Metadata } from "next"; // 용도 Next.js 메타데이터 타입 정의
import { Geist, Geist_Mono } from "next/font/google"; // 용도 Google 폰트 로드 및 CSS 변수 연결
import Footer from "@/components/Footer"; // 용도 공통 하단 푸터 렌더링
import GlobalAmbientEffects from "@/components/GlobalAmbientEffects"; // 용도 전역 별/별똥별 배경 효과
import Header from "@/components/Header"; // 용도 공통 상단 네비게이션 렌더링
import NeonCardGlow from "@/components/NeonCardGlow"; // 용도 카드 커서 추적 네온 효과 전역 적용
import { siteConfig } from "@/lib/site"; // 용도 사이트 공통 메타 정보 관리
import "./globals.css"; // 용도 전역 스타일 적용

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <GlobalAmbientEffects />
        <NeonCardGlow />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
