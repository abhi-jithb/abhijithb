import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Abhijith B to discuss ideas, products, or collaborations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Abhijith B",
    description: "Get in touch with Abhijith B.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <ContactSection />
    </main>
  );
}
