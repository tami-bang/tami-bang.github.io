import type { NextConfig } from "next"; // 용도 Next.js 설정 타입 정의

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["172.30.1.40:3000", "172.30.1.94:3000", "localhost:3000"],
};

export default nextConfig;