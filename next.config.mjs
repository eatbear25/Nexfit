// next.config.mjs - 添加完整的 CORS 支援

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ui-avatars.com", "localhost", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },

  // 添加完整的 CORS headers
  async headers() {
    return [
      {
        // 對所有 API 路由設定 CORS
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // 在生產環境中，建議設定為具體的域名
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400", // 24 小時
          },
        ],
      },
      {
        // 對上傳路徑的 CORS 設定
        source: "/uploads/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },

  // SVGR 設定
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/, // 限制只有 JS/TS 檔才會觸發 SVGR
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
