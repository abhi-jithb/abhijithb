import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  author?: string;
  date: string; // ISO date string (YYYY-MM-DD)
  summary: string;
  category: string;
  tags: string[];
  coverImage?: string;
  coverImageAlt?: string;
  draft: boolean;
  featured: boolean;
  readingTime: number; // in minutes
  content: string;
  htmlContent?: string;
}

const postsDirectory = path.join(process.cwd(), "src/content/blog");

// Calculate reading time based on word count
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Convert gray-matter date to string safely
function normalizeDate(rawDate: any): string {
  if (!rawDate) {
    return new Date().toISOString().split("T")[0];
  }
  if (rawDate instanceof Date) {
    return rawDate.toISOString().split("T")[0];
  }
  return String(rawDate).trim();
}

// Get all posts sorted by date
export function getBlogPosts(includeDrafts = false): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      const { data, content } = matter(fileContents);
      const readingTime = calculateReadingTime(content);

      return {
        slug,
        title: data.title || "Untitled",
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        author: data.author || "Abhijith B",
        date: normalizeDate(data.date),
        summary: data.summary || "",
        category: data.category || "General",
        tags: data.tags || [],
        coverImage: data.coverImage,
        coverImageAlt: data.coverImageAlt,
        draft: !!data.draft,
        featured: !!data.featured,
        readingTime,
        content,
      } as BlogPost;
    });

  // Filter drafts unless specified, and sort by date descending
  return allPostsData
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    const readingTime = calculateReadingTime(content);
    // Parse markdown to html using marked
    const htmlContent = await marked.parse(content);

    return {
      slug,
      title: data.title || "Untitled",
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      author: data.author || "Abhijith B",
      date: normalizeDate(data.date),
      summary: data.summary || "",
      category: data.category || "General",
      tags: data.tags || [],
      coverImage: data.coverImage,
      coverImageAlt: data.coverImageAlt,
      draft: !!data.draft,
      featured: !!data.featured,
      readingTime,
      content,
      htmlContent,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}
