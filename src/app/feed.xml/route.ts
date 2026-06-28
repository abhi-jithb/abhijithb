import { getBlogPosts } from "@/lib/blog";

export async function GET() {
  const posts = getBlogPosts();
  const siteUrl = "https://abhijithb.vercel.app";

  const xmlItems = posts
    .map((post) => {
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Abhijith B | Blog</title>
  <link>${siteUrl}/blog</link>
  <description>Essays and reflections on technology, open source, and learning.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${xmlItems}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
