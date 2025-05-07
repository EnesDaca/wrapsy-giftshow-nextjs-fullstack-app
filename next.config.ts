import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.stripe.com", "res.cloudinary.com"]
  }
};

export default nextConfig;
