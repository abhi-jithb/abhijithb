export interface ReleaseRowProps {
  title: string;
  version: string;
  description: string;
  date: string;
  link?: string;
}

export function ReleaseRow({ title, version, description, date, link }: ReleaseRowProps) {
  return (
    <div className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors">
      {link ? (
        <a href={link} className="hover:text-blue-600">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{title}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {version}
            </span>
          </div>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-gray-600 mt-2">{description}</p>
        </a>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{title}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {version}
            </span>
          </div>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-gray-600 mt-2">{description}</p>
        </>
      )}
    </div>
  );
}
