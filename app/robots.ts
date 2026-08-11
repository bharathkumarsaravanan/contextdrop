import { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://usecontextdrop.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/dashboard",
                "/dashboard/*",
                "/auth/*"
            ]
        },
        sitemap: `${baseUrl}/sitemap.xml`
    }
}