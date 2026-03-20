export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLinkItem {
  id: "linkedin" | "github" | "substack";
  label: string;
  url: string;
}

export interface SiteStat {
  label: string;
  value: string;
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
  heroLine: "I build useful software, share what I learn, and contribute in public.",
  profileImage: "/images/profile.webp",
  resumePath: "/resume.pdf",
  email: "abhijith@example.com",
  location: "Kerala, India",
  role: "Full-stack developer and open-source contributor",
  navItems: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Writing" },
    { id: "releases", label: "Releases" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],
  socialLinks: [
    { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/abhi-jithb/" },
    { id: "github", label: "GitHub", url: "https://github.com/abhi-jithb" },
    { id: "substack", label: "Substack", url: "https://substack.com/@abhijithb1" },
  ] satisfies SocialLinkItem[],
  stats: [
    { label: "GitHub Repos", value: "113" },
    { label: "GitHub Followers", value: "60" },
    { label: "GitHub Following", value: "28" },
    { label: "Yearly Contributions", value: "467" },
  ] satisfies SiteStat[],
  principles: [
    "Technology is a tool, not an identity",
    "Build in public and learn out loud",
    "Consistency beats intensity",
    "Helping people grow matters most",
  ],
  insights: [
    "Most contribution activity is pull-request driven.",
    "Current active repositories include NutriDecide and storyweaver-frontend.",
    "Writing focuses on open source onboarding and execution mindset.",
  ],
};

export const projects: Project[] = [
  {
    id: "idea-thattukada",
    year: 2026,
    title: "Idea Thattukada",
    description: "Capture and organize ideas quickly while browsing, researching, or building.",
    featured: true,
    links: [
      { label: "Repo", url: "https://github.com/abhi-jithb/Idea-Thattukada" },
    ],
  },
  {
    id: "storyweaver-frontend",
    year: 2026,
    title: "StoryWeaver Frontend",
    description: "Frontend contributions for a multilingual digital story platform.",
    links: [{ label: "Repo", url: "https://github.com/abhi-jithb/storyweaver-frontend" }],
  },
  {
    id: "nutridecide",
    year: 2026,
    title: "NutriDecide",
    description: "Nutrition-focused product work with consistent March 2026 development activity.",
    links: [{ label: "Repo", url: "https://github.com/abhi-jithb/NutriDecide" }],
  },
  {
    id: "college-vyapari",
    year: 2025,
    title: "College Vyapari",
    description: "A campus marketplace where students discover tasks and earning opportunities.",
    links: [{ label: "Repo", url: "https://github.com/abhi-jithb/collegeVyapari" }],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "we-finally-launched",
    date: "2026-01-20",
    title: "We Finally Launched. Not Perfectly. But Honestly.",
    summary: "A practical story about shipping early, facing rejection, and getting the first client.",
    url: "https://abhijithb1.substack.com/p/we-finally-launched-not-perfectly",
  },
  {
    id: "how-to-start-open-source",
    date: "2026-01-19",
    title: "How to Start Contributing to Open Source (When You Feel Lost)",
    summary: "A beginner-friendly path into open source through small projects and collaboration.",
    url: "https://abhijithb1.substack.com/p/how-to-start-contributing-to-open",
  },
  {
    id: "what-im-building-2026",
    date: "2026-01-18",
    title: "What I am Building, Learning, and Contributing to This Year",
    summary: "A yearly direction note covering open source, projects, hackathons, and community growth.",
    url: "https://abhijithb1.substack.com/p/what-im-building-learning-and-contributing",
  },
];

export const releases: Release[] = [
  {
    id: "abhijithb-mar-2026",
    date: "2026-03-20",
    product: "abhijithb",
    version: "6 commits",
    repo: "https://github.com/abhi-jithb/abhijithb",
  },
  {
    id: "nutridecide-mar-2026",
    date: "2026-03-20",
    product: "NutriDecide",
    version: "25 commits (Mar)",
    repo: "https://github.com/abhi-jithb/NutriDecide",
  },
  {
    id: "storyweaver-mar-2026",
    date: "2026-03-20",
    product: "storyweaver-frontend",
    version: "7 commits (Mar)",
    repo: "https://github.com/abhi-jithb/storyweaver-frontend",
  },
];

export const getProjects = async (): Promise<Project[]> => projects;
export const getBlogPosts = async (): Promise<BlogPost[]> => blogPosts;
export const getReleases = async (): Promise<Release[]> => releases;
