interface ProfileHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export default function ProfileHeader({ eyebrow, title, description }: ProfileHeaderProps) {
  return (
    <header className="mb-8 sm:mb-10">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">{eyebrow}</p>
      ) : null}
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">{title}</h1>
      <p className="max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">{description}</p>
    </header>
  );
}
