import type { NextConfig } from "next";

/**
 * Security headers sent with every response. The Content Security Policy is set per
 * request in proxy.ts (it needs a fresh nonce each time), everything else lives here.
 */
const securityHeaders = [
  // Browsers must always use HTTPS for this site for the next two years.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Never let another site show this app inside a frame (stops click-jacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Browsers must not guess file types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send the site name, not full page addresses, to other sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Turn off browser features the app does not use.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  // Old Internet Explorer download protection; harmless elsewhere.
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
