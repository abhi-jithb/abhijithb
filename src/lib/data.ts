export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLinkItem {
  id: "linkedin" | "github" | "substack";
  label: string;
  url: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  year: number;
  title: string;
  description: string;
  links: ProjectLink[];
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  date: string;
  title: string;
  summary: string;
  url: string;
}

export interface Release {
  id: string;
  date: string;
  product: string;
  version: string;
  repo: string;
}

export const siteData = {
  name: "Abhijith B",
  heroLine: "I use technology to build things and help people grow.",
  profileImage: "/images/profile.webp",
  resumePath: "/resume.pdf",
  email: "abhijith@example.com",
  navItems: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Writing" },
    { id: "releases", label: "Releases" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],
  socialLinks: [
    { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/abhi-jthb" },
    { id: "github", label: "GitHub", url: "https://github.com/abhi-jithb" },
    { id: "substack", label: "Substack", url: "https://abhijith1.substack.com" },
  ] satisfies SocialLinkItem[],
};

export const projects: Project[] = [
  {
    id: "community-learning-platform",
    year: 2025,
    title: "Community Learning Platform",
    description: "A platform to help students explore learning beyond academics.",
    featured: true,
    links: [
      { label: "Repo", url: "https://github.com/abhi-jithb/project" },
      { label: "Live", url: "https://example.com" },
    ],
  },
  {
    id: "personal-portfolio-v2",
    year: 2024,
    title: "Personal Portfolio v2",
    description: "A minimal personal site focused on projects, writing, and releases.",
    links: [{ label: "Repo", url: "https://github.com/abhi-jithb/portfolio" }],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "learning-in-public",
    date: "2025-01-18",
    title: "Learning in Public Is Uncomfortable - And That Is the Point",
    summary: "Why sharing unfinished thoughts matters more than polished outcomes.",
    url: "https://yourname.substack.com/p/example-1",
  },
  {
    id: "technology-not-identity",
    date: "2024-11-02",
    title: "Technology Is a Tool, Not an Identity",
    summary: "Reflections on how we often confuse what we use with who we are.",
    url: "https://yourname.substack.com/p/example-2",
  },
];

export const releases: Release[] = [
  {
    id: "clp-v0-3",
    date: "2025-01-12",
    product: "Community Learning Platform",
    version: "v0.3",
    repo: "https://github.com/abhi-jithb/project",
  },
  {
    id: "portfolio-v1-0",
    date: "2024-09-05",
    product: "Personal Portfolio",
    version: "v1.0",
    repo: "https://github.com/abhi-jithb/portfolio",
  },
];

export const getProjects = async (): Promise<Project[]> => projects;
export const getBlogPosts = async (): Promise<BlogPost[]> => blogPosts;
export const getReleases = async (): Promise<Release[]> => releases;
