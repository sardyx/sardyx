import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sardyxai.com";

  const routes = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
    "/cookies",
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
    changeFrequency: "weekly" as const,
    priority: route === "" 
      ? 1.0 
      : route.startsWith("/services/") 
        ? 0.9 
        : route.startsWith("/blog/") 
          ? 0.7 
          : 0.5,
  }));
}
