import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sardyxai.com";

  const routes = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
    "/cookies",
    "/services/professional-websites",
    "/services/pos-softwares",
    "/services/sales-management-systems",
    "/services/mobile-apps",
    "/services/game-development",
    "/services/social-media-marketing",
    "/services/ads-creatives",
    "/services/windows-apps",
    "/services/graphic-design-video-editing",
    "/services/ai-automations",
    "/services/ai-chatbot-callbot",
    "/services/ai-consulting",
    "/services/ai-development",
    "/services/ai-workflow-automation",
    "/services/ai-chatbot-development",
    "/services/ai-voice-agent-development",
  ];

  const blogs = [
    "/blog/why-your-business-needs-ai-agents-in-2026",
    "/blog/guide-to-workflow-automation-and-roi",
    "/blog/enterprise-seo-maximizing-organic-traffic",
  ];

  const allUrls = [...routes, ...blogs];

  return allUrls.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" 
      ? 1.0 
      : route.startsWith("/services/") 
        ? 0.9 
        : route.startsWith("/blog/") 
          ? 0.7 
          : 0.5,
  }));
}
