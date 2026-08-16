// Fail early during Vercel production builds if the API URL is missing or
// still pointing at the local fallback. This prevents shipping a frontend that
// silently tries to reach localhost:8000 in production.
if (process.env.VERCEL_ENV === "production") {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is required in production. Set it to the public URL of the Leme backend (e.g. https://api.leme.app).",
    );
  }
  if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
    throw new Error(
      `NEXT_PUBLIC_API_URL cannot point to localhost in production. Current value: ${apiUrl}`,
    );
  }
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
