import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/praxis", destination: "/programs/praxis" },
      { source: "/ascenda", destination: "/programs/ascenda" },
      { source: "/initium", destination: "/programs/initium" },
      { source: "/ai-agent-builder", destination: "/programs/praxis/ai-agent-builder" },
      { source: "/ai-assisted-coding", destination: "/programs/praxis/ai-assisted-coding" },
      { source: "/ai-media-studio", destination: "/programs/praxis/ai-media-studio" },
    ];
  },
};

export default nextConfig;
