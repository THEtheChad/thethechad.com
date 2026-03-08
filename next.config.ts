import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  redirects: () => [
    {
      source: '/',
      destination: '/about',
      permanent: true,
    },
  ] as const,
} as const satisfies NextConfig;

export default nextConfig;
