// Data loaders for portfolio content

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  link?: string;
}

export interface Release {
  id: string;
  title: string;
  version: string;
  description: string;
  date: string;
  link?: string;
}

// Example data loaders
export const getProjects = async (): Promise<Project[]> => {
  // Replace with your data source
  return [];
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  // Replace with your data source
  return [];
};

export const getReleases = async (): Promise<Release[]> => {
  // Replace with your data source
  return [];
};
