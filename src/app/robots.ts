import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/adminpanel/", "/adminsecure/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/adminpanel/", "/adminsecure/"],
      }
    ],
    sitemap: "https://www.sardyxai.com/sitemap.xml",
    host: "https://www.sardyxai.com",
  };
}
