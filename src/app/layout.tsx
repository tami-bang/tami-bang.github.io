import type { Metadata } from "next"; // 메타데이터 타입 정의
import { Geist, Geist_Mono } from "next/font/google"; // Google 폰트 설정
import Header from "@/components/Header"; // 공통 상단 네비게이션
import { siteConfig } from "@/lib/site"; // 사이트 메타 정보 조회
import "./globals.css"; // 전역 스타일 적용

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#fffaf3] text-slate-950">
        <Header />
        {children}
      </body>
    </html>
  );
}