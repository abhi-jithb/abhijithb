const GITHUB_USER = "abhi-jithb";
const GITHUB_API_BASE = "https://api.github.com";
const CACHE_SECONDS = 3600;

interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  updated_at: string;
}

export interface RankedGitHubProject {
  id: number;
  name: string;
  fullName: string;
  url: string;
  description: string;
  stars: number;
  commits: number;
  languages: string[];
  updatedAt: string;
}

function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "abhijithb-portfolio",
  };
}

async function fetchGitHubJson<T>(path: string): Promise<T | null> {
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    headers: githubHeaders(),
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

async function fetchCommitCount(repoName: string): Promise<number> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${GITHUB_USER}/${repoName}/commits?per_page=1`,
    {
      headers: githubHeaders(),
      next: { revalidate: CACHE_SECONDS },
    }
  );

  if (!response.ok) {
    return 0;
  }

  const linkHeader = response.headers.get("link");
  const lastPageMatch = linkHeader?.match(/&page=(\d+)>; rel="last"/);

  if (lastPageMatch && lastPageMatch[1]) {
    return Number(lastPageMatch[1]);
  }

  const commitList = (await response.json()) as unknown;

  return Array.isArray(commitList) ? commitList.length : 0;
}

async function fetchTopLanguages(repoName: string): Promise<string[]> {
  const languageMap = await fetchGitHubJson<Record<string, number>>(
    `/repos/${GITHUB_USER}/${repoName}/languages`
  );

  if (!languageMap) {
    return [];
  }

  return Object.entries(languageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([language]) => language);
}

export async function getRankedGitHubProjects(limit = 8): Promise<RankedGitHubProject[]> {
  const repoList = await fetchGitHubJson<GitHubRepoResponse[]>(
    `/users/${GITHUB_USER}/repos?type=owner&sort=updated&per_page=24`
  );

  if (!repoList || repoList.length === 0) {
    return [];
  }

  const candidateRepos = repoList.filter(
    (repo) => !repo.fork && !repo.archived && !repo.disabled
  );

  const enrichedRepos = await Promise.all(
    candidateRepos.map(async (repo) => {
      const [commits, languages] = await Promise.all([
        fetchCommitCount(repo.name),
        fetchTopLanguages(repo.name),
      ]);

      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        url: repo.html_url,
        description:
          repo.description?.trim() ||
          "Built for fun, experimentation, and learning in public.",
        stars: repo.stargazers_count,
        commits,
        languages,
        updatedAt: repo.updated_at,
      } satisfies RankedGitHubProject;
    })
  );

  return enrichedRepos
    .sort((a, b) => b.stars - a.stars || b.commits - a.commits || a.name.localeCompare(b.name))
    .slice(0, limit);
}
