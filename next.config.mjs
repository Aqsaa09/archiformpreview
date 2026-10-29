/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Lets a phone on the same Wi-Fi or hotspot (http://192.168.x.x / 172.20.10.x:3000) load the dev server's scripts; dev only.
  allowedDevOrigins: ['192.168.*.*', '172.*.*.*', '10.*.*.*', '*.local'],
  async headers() {
    return [
      {
        // Images, videos and fonts never change name, so browsers can cache them for a long time.
        source: '/:dir(m|v)/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
