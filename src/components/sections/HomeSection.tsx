import Image from "next/image";
import Link from "next/link";

export default function HomeSection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Profile Image */}
      <div className="mb-6">
        <Image
          src="/images/profile.jpg"
          alt="Abhijith"
          width={120}
          height={120}
          className="rounded-full"
          priority
        />
      </div>

      {/* Name */}
      <h1 className="text-2xl font-medium mb-2">
        Abhijith
      </h1>

      {/* One-liner */}
      <p className="max-w-xl text-gray-600 mb-6">
        I use technology to build things and help people grow.
      </p>

      {/* Social Links */}
      <div className="flex gap-4 mb-6">
        <Link
          href="https://linkedin.com/in/yourhandle"
          target="_blank"
          className="text-sm text-gray-700 hover:text-black"
        >
          LinkedIn
        </Link>

        <Link
          href="https://github.com/yourhandle"
          target="_blank"
          className="text-sm text-gray-700 hover:text-black"
        >
          GitHub
        </Link>

        <Link
          href="https://yourname.substack.com"
          target="_blank"
          className="text-sm text-gray-700 hover:text-black"
        >
          Blog
        </Link>
      </div>

      {/* Resume */}
      <Link
        href="/resume.pdf"
        className="text-sm underline underline-offset-4 hover:text-gray-700"
      >
        Download Resume
      </Link>
    </div>
  );
}
