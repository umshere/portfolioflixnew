/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://umeshmc.com", // Update with your actual domain
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/api/*"],
      },
    ],
  },
  // Exclude specific paths
  exclude: ["/api/*", "/_next/static/*"],

  // Additional sitemap options
  changefreq: "daily",
  priority: 0.7,
  alternateRefs: [
    {
      href: "https://umeshmc.com", // Update with your actual domain
      hreflang: "en",
    },
  ],
};
