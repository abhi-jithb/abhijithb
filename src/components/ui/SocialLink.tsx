export interface SocialLinkProps {
  name: string;
  url: string;
  icon?: string;
}

export function SocialLink({ name, url, icon }: SocialLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      {icon && <span>{icon}</span>}
      <span>{name}</span>
    </a>
  );
}
