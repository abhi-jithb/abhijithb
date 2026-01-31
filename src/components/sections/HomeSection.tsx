import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

export default function HomeSection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Profile Image */}
      <div className="mb-8">
        <Image
          src="/images/profile.png"
          alt="Abhijith"
          width={200}
          height={240}
          className="rounded-full"
          priority
        />
      </div>

      {/* Name */}
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Abhijith
      </h1>

      {/* One-liner */}
      <p className="max-w-xl text-base text-gray-700 mb-10">
        I use technology to build things and help people grow.
      </p>

      {/* Social Icons */}
      <div className="flex items-center gap-8 mb-10">
        <Link
          href="https://linkedin.com/in/abhi-jthb"
          target="_blank"
          aria-label="LinkedIn"
          className="text-black hover:text-gray-600 transition-colors"
        >
          <FaLinkedinIn size={24} />
        </Link>

        <Link
          href="https://github.com/abhi-jithb"
          target="_blank"
          aria-label="GitHub"
          className="text-black hover:text-gray-600 transition-colors"
        >
          <FaGithub size={24} />
        </Link>

        <Link
          href="https://abhijith1.substack.com"
          target="_blank"
          aria-label="Substack"
          className="text-black hover:text-gray-600 transition-colors"
        >
          <SiSubstack size={24} />
        </Link>
      </div>

      {/* Resume Button */}
      <Link
        href="/resume.pdf"
        className="
          inline-flex items-center
          rounded-full
          border border-black
          px-6 py-2
          text-sm font-medium
          text-black
          hover:bg-black hover:text-white
          transition-colors
        "
      >
        Download Resume
      </Link>
    </div>
  );
}
