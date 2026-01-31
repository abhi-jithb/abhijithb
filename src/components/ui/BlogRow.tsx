export interface BlogRowProps {
  title: string;
  excerpt: string;
  date: string;
  link?: string;
}

export function BlogRow({ title, excerpt, date, link }: BlogRowProps) {
  return (
    <div className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors">
      {link ? (
        <a href={link} className="hover:text-blue-600">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-gray-600 mt-2">{excerpt}</p>
        </a>
      ) : (
        <>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-gray-600 mt-2">{excerpt}</p>
        </>
      )}
    </div>
  );
}
