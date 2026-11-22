import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sardyxai.com";
  const now = new Date();

  const coreRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/services", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/founder", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/cookies", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  const serviceSlugs = [
    "professional-websites",
    "pos-softwares",
    "sales-management-systems",
    "mobile-apps",
    "game-development",
    "social-media-marketing",
    "ads-creatives",
    "windows-apps",
    "graphic-design-video-editing",
    "ai-automations",
    "ai-chatbot-callbot",
    "enterprise-seo",
  ];

  const portfolioSlugs = [
    "nsk-enterprise",
    "unity-mark-firm",
    "ifixcars",
    "jamia-siddiqiyyah",
  ];

  const blogSlugs = [
    "why-your-business-needs-ai-agents-in-2026",
    "guide-to-workflow-automation-and-roi",
    "enterprise-seo-maximizing-organic-traffic",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [
    ...coreRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...portfolioSlugs.map((slug) => ({
      url: `${baseUrl}/portfolio/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  return sitemapEntries;
}
