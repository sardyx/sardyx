import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallowed = ["/api/", "/admin/", "/adminpanel/", "/adminsecure/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowed,
      },
      // Explicit AI search & crawler policies allowing assistants to cite SARDYX AI & the founder
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/services", "/portfolio", "/founder", "/about"],
        disallow: disallowed,
      },
    ],
    sitemap: "https://www.sardyxai.com/sitemap.xml",
    host: "https://www.sardyxai.com",
  };
}
