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

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  location?: string;
  notes?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export interface ProfilePageLink {
  title: string;
  description: string;
  href: "/profile/skills" | "/profile/certifications" | "/profile/experience" | "/profile/education";
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

export type EventCategory = "organized" | "hackathon" | "experience" | "mentorship";

export interface EventLink {
  label: string;
  url: string;
}

export interface Event {
  title: string;
  date: string;
  category: EventCategory;
  role: string;
  location?: string;
  description: string;
  highlights?: string[];
  links?: EventLink[];
  outcome?: string;
}

export interface Hackathon {
  title: string;
  date: string;
  role: string;
  project?: string;
  location?: string;
  outcome?: string;
  organized?: boolean;
}

export interface HackathonProject {
  name: string;
  description: string;
}

export const siteData = {
  name: "Abhijith B",
  heroLine: "I build useful software, share what I learn, and contribute in public.",
  profileImage: "/images/profile.webp",
  resumePath: "/resume.pdf",
  email: "babhijith58@gmail.com",
  location: "Kerala, India",
  role: "Building OSS Projects and Communities | Kerala Tech Builder | TinkerHub | Full-Stack Dev",
  linkedInUrl: "https://www.linkedin.com/in/abhi-jithb/",
  navItems: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "events", label: "Events" },
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
  summary: [
    "I believe technology is a tool, not an end goal. My core focus is empowering people through community leadership and practical knowledge sharing.",
    "I co-founded a non-profit community and serve as a tech lead across organizations. Beyond titles, I focus on meaningful social connections and helping others discover their passions.",
    "I share actionable insights from real project work, open source, and community building so people can apply what they learn and grow.",
    "My approach is human-centered: people first, then technology. Success is measured by impact and inspiration, not output alone.",
  ],
  topSkills: [
    "Hackathon mentor",
    "Software Development",
    "Software",
  ],
  certifications: [
    "Introduction to Generative AI",
    "Level 3 GenAI: Prompt Engineering",
    "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    "Build and Secure Networks in Google Cloud",
  ],
  experiences: [
    {
      organization: "TinkerHub",
      role: "Council Member",
      period: "Nov 2025 - Present",
      location: "Kochi, Kerala, India",
      notes: "Support campuses by identifying challenges, shaping chapter programs, and improving student tech communities.",
    },
    {
      organization: "TinkerHub CEKnpy",
      role: "Campus Lead",
      period: "Jun 2025 - Present",
      location: "Karunagappally, Kerala, India",
    },
    {
      organization: "TinkerHub CEKnpy",
      role: "Co Lead",
      period: "Aug 2024 - Jun 2025",
      location: "Karunagappally, Kerala, India",
    },
    {
      organization: "To ByaaG",
      role: "Co-Founder",
      period: "Jun 2024 - Present",
      location: "Kollam, Kerala, India",
      notes: "Ignite your goals, level up your passion.",
    },
    {
      organization: "Xyvin Technologies Pvt Ltd",
      role: "Software Developer",
      period: "Jun 2024 - Sep 2024",
      location: "Ernakulam, Kerala, India",
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      institution: "APJ Abdul Kalam Technological University",
      degree: "BTech, Computer Science",
      period: "Sep 2023 - Nov 2027",
    },
    {
      institution: "College of Engineering Karunagappally",
      degree: "BTech, Computer Science",
      period: "Sep 2023 - 2027",
    },
  ] satisfies EducationItem[],
  profilePages: [
    {
      title: "Skills",
      description: "Core strengths across mentoring and software development.",
      href: "/profile/skills",
    },
    {
      title: "Certifications",
      description: "Verified learning paths in GenAI and Google Cloud.",
      href: "/profile/certifications",
    },
    {
      title: "Experience",
      description: "Leadership and development journey across communities and teams.",
      href: "/profile/experience",
    },
    {
      title: "Education",
      description: "Academic foundation in Computer Science.",
      href: "/profile/education",
    },
  ] satisfies ProfilePageLink[],
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
    id: "otium",
    year: 2026,
    title: "Otium",
    description: "Flutter cognitive focus app built during MAGNATHON 2026, with sprint timer and focus recovery workflows.",
    links: [{ label: "Repo", url: "https://github.com/abhi-jithb/Otium" }],
  },
  {
    id: "earthbin",
    year: 2025,
    title: "EarthBin",
    description: "Biomedical waste tracker from reCet/NASA Space Apps path using React, Firebase, and hardware integration.",
    links: [],
  },
  {
    id: "voyage",
    year: 2025,
    title: "Voyage",
    description: "Tink Her Hack mentoring track project that reached 2nd place with guided product support.",
    links: [],
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

export const events: Event[] = [
  {
    title: "Tink Her Hack 4.0 After-Summit / WMC 2026",
    date: "March 14, 2026",
    category: "organized",
    role: "Venue Operations Lead",
    location: "Kerala Startup Mission, Kochi",
    description: "Coordinated a large-scale women-in-tech after event with late-night planning, mentor flow, and on-ground risk management.",
    highlights: ["College of Engineering Karunagappally recognized", "2000+ attendees"],
    links: [],
  },
  {
    title: "Winter Camp 2025",
    date: "Dec 12-14, 2025",
    category: "experience",
    role: "Panel Discussion Guest",
    location: "Kerala",
    description: "Joined TinkerHub core team discussions on chapter quality, community strategy, and long-term direction.",
  },
  {
    title: "TinkerHub Campus Program Strategy Circle",
    date: "Nov 2025",
    category: "organized",
    role: "Council Member",
    location: "Kochi, Kerala",
    description: "Worked with council teams to map campus struggles and create program interventions for stronger chapters.",
  },
  {
    title: "TinkerSpace 3rd Anniversary Carnival",
    date: "2025",
    category: "experience",
    role: "Attendee and Community Contributor",
    location: "TinkerSpace, Kochi",
    description: "Participated in zine making, music workshops, and panel sessions with a strong people-first builder culture.",
    highlights: ["Creative workshops", "Community networking"],
  },
  {
    title: "Chrome Extensions Workshop",
    date: "2025",
    category: "mentorship",
    role: "Lead Mentor",
    location: "TinkerHub CEAL",
    description: "Ran a hands-on build session that inspired beginner projects including the PinTab extension direction.",
  },
  {
    title: "Campus Chapter Mentor Sprint",
    date: "2025",
    category: "mentorship",
    role: "Student Mentor",
    location: "Chengannur",
    description: "Mentored chapter students on project clarity, collaboration habits, and presentation readiness.",
  },
  {
    title: "Open Source Onboarding Session",
    date: "2025",
    category: "mentorship",
    role: "Community Mentor",
    location: "TinkerHub CEKnpy",
    description: "Guided beginners through Git, GitHub workflow, and first contribution pathways.",
  },
  {
    title: "Hackathon Mentorship at CEK",
    date: "2024",
    category: "mentorship",
    role: "Hackathon Mentor",
    location: "College of Engineering Karunagappally",
    description: "Supported student teams with ideation, MVP scoping, and final demo storytelling.",
  },
  {
    title: "Useless Projects Hackathon",
    date: "Oct 2024",
    category: "organized",
    role: "Organizer",
    location: "TinkerHub CEKnpy",
    description: "Designed a playful hackathon that taught rapid prototyping through unconventional project ideas.",
  },
  {
    title: "Community Build Nights",
    date: "2024",
    category: "organized",
    role: "Program Curator",
    location: "CEKnpy",
    description: "Hosted recurring evening build sessions to improve consistency, code review quality, and peer feedback loops.",
  },
  {
    title: "DevTown Campus Programs",
    date: "Dec 2023 - Jun 2024",
    category: "experience",
    role: "Campus Ambassador",
    location: "Kerala",
    description: "Facilitated student participation in tech programs and connected campus learners to practical project tracks.",
  },
  {
    title: "Web Development Internship Journey",
    date: "Jan - Feb 2024",
    category: "experience",
    role: "Web Development Intern",
    location: "Codeway Solutions",
    description: "Applied foundational frontend and workflow skills in a structured internship setting.",
  },
  {
    title: "Campus Placement Coordination Drives",
    date: "Feb 2024 - Jun 2025",
    category: "organized",
    role: "Placement Coordinator",
    location: "College of Engineering Karunagappally",
    description: "Coordinated campus placement communication, student readiness efforts, and execution logistics.",
  },
  {
    title: "Open Source Reflection Session",
    date: "2026",
    category: "experience",
    role: "Speaker",
    location: "Community Circle",
    description: "Shared practical lessons from contribution consistency, pull-request culture, and builder mindset.",
  },
];

export const hackathons: Hackathon[] = [
  {
    title: "MAGNATHON 2026",
    date: "Feb 9-10, 2026",
    role: "Participant (Team Thudarum)",
    project: "Otium",
    location: "College of Engineering Vadakara",
    outcome: "Top 12/200 teams, continuing development",
  },
  {
    title: "reCet Hackathon",
    date: "2025",
    role: "Participant",
    project: "EarthBin",
    location: "CET Trivandrum",
    outcome: "NASA Space Apps global nominee",
  },
  {
    title: "Zilckathon-HFT",
    date: "-",
    role: "Participant",
    location: "Kerala Startup Mission",
  },
  {
    title: "FOSSASIA 2024",
    date: "2024",
    role: "Participant",
  },
  {
    title: "Hack For Tomorrow",
    date: "-",
    role: "Participant",
    location: "MEC",
  },
  {
    title: "IEEE SB GCEK Hackathon",
    date: "-",
    role: "Participant",
    location: "GCEK",
  },
  {
    title: "NASA Space Apps",
    date: "-",
    role: "Participant",
    project: "EarthBin",
    location: "Global",
    outcome: "Global nominee",
  },
  {
    title: "Useless Projects",
    date: "Oct 2024",
    role: "Organizer",
    project: "Various small prototypes",
    location: "TinkerHub CEKnpy",
    outcome: "Fun and experimental success",
    organized: true,
  },
  {
    title: "Tink Her Hack 4.0",
    date: "March 2026",
    role: "Venue Ops + Mentor",
    location: "Kerala Startup Mission",
    outcome: "College venue recognized",
    organized: true,
  },
  {
    title: "Tink Her Hack 3.0",
    date: "2025",
    role: "Mentor",
    project: "Voyage",
    location: "College of Engineering Pathanapuram",
    outcome: "Multiple team support",
  },
];

export const hackathonSummary = {
  total: 10,
  organized: 2,
  participated: 7,
  notable: ["MAGNATHON Top 12", "NASA Space Apps nominee"],
  homeCampus: "TinkerHub CEKnpy",
};

export const hackathonProjects: HackathonProject[] = [
  {
    name: "Otium",
    description: "MAGNATHON 2026 - Flutter focus app (sprints + breathing resets)",
  },
  {
    name: "EarthBin",
    description: "reCet + NASA Space Apps nominee - Biomedical waste tracker",
  },
  {
    name: "Voyage",
    description: "TinkHerHack 3.0 (mentored team, 2nd place)",
  },
];

export const getProjects = async (): Promise<Project[]> => projects;
export const getBlogPosts = async (): Promise<BlogPost[]> => blogPosts;
export const getReleases = async (): Promise<Release[]> => releases;
export const getEvents = async (): Promise<Event[]> => events;
export const getHackathons = async (): Promise<Hackathon[]> => hackathons;
