import type { MetadataRoute } from "next";

const baseUrl = "https://abhijithb.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/releases",
    "/profile",
    "/profile/skills",
    "/profile/certifications",
    "/profile/experience",
    "/profile/education",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
