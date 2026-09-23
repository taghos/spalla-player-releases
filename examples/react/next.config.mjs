/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Evita o aviso de "múltiplos lockfiles": o repo raiz também tem um.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
