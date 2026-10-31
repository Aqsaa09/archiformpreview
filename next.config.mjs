/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Lets a phone on the same Wi-Fi or hotspot (http://192.168.x.x / 172.20.10.x:3000) load the dev server's scripts; dev only.
  allowedDevOrigins: ['192.168.*.*', '172.*.*.*', '10.*.*.*', '*.local'],
  images: {
    // AVIF where the browser supports it, WebP otherwise, the original JPG as a last resort.
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
  },
  async headers() {
    return [
      {
        // Images and videos are replaced under the same name (see README), so browsers keep them for a week and then
        // check for a newer copy in the background rather than caching them forever.
        source: '/:dir(m|v)/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' }],
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
