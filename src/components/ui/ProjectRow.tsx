export interface ProjectRowProps {
  title: string;
  description: string;
  link?: string;
}

export function ProjectRow({ title, description, link }: ProjectRowProps) {
  return (
    <div className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors">
      {link ? (
        <a href={link} className="hover:text-blue-600">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </a>
      ) : (
        <>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </>
      )}
    </div>
  );
}
