"use client";

import { useEffect, useRef, useState } from "react";

interface GiscusCommentsProps {
  postSlug: string;
  postTitle: string;
}

export default function GiscusComments({ postSlug, postTitle }: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [errorConfig, setErrorConfig] = useState(false);

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO || "abhi-jithb/abhijithb";
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements";
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  useEffect(() => {
    // Check if configuration is missing
    if (!repoId || !categoryId) {
      setErrorConfig(true);
      return;
    }

    // Lazy load using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [repoId, categoryId]);

  useEffect(() => {
    if (!shouldLoad || errorConfig || !containerRef.current) return;

    // Create the script tag
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId!);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId!);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [shouldLoad, errorConfig, repo, repoId, category, categoryId, postSlug]);

  if (errorConfig) {
    return (
      <div className="paper-panel my-8 rounded-2xl p-6 border border-amber-500/20 bg-amber-500/5 text-left">
        <h4 className="mb-2 text-sm font-semibold text-neutral-900 flex items-center gap-2">
          💬 Giscus Comments Setup
        </h4>
        <p className="mb-4 text-xs text-neutral-700 leading-relaxed">
          Giscus discussion threads are integrated, but the repository config is incomplete. To enable comments on your posts:
        </p>
        <ol className="list-decimal pl-4 space-y-1.5 text-xs text-neutral-600">
          <li>Ensure your GitHub repository <strong>{repo}</strong> is public and has <strong>Discussions</strong> enabled in settings.</li>
          <li>Go to <a href="https://giscus.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">giscus.app</a> and enter your repository.</li>
          <li>Copy your generated <strong>data-repo-id</strong> and <strong>data-category-id</strong>.</li>
          <li>Add them as environment variables in your hosting dashboard or local <code>.env.local</code>:
            <pre className="mt-2 rounded bg-neutral-900/10 p-2 text-[10px] text-neutral-800 font-mono">
{`NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id_here
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id_here`}
            </pre>
          </li>
        </ol>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="giscus mt-8 w-full min-h-[150px]">
      {!shouldLoad && (
        <div className="flex items-center justify-center py-10 text-xs text-neutral-400">
          Scroll down to load comments...
        </div>
      )}
    </div>
  );
}
