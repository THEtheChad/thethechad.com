import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav/Nav";
import { profile, projects } from "@/data/resume";
import { Projects } from "./_components/Projects/Projects";
import { Hero } from "./_components/Hero/Hero";

export default function Home() {
  return (
    <div className="min-h-screen text-body">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <Hero className="mb-20" />
        <Projects />
      </main>

      <footer className="mx-auto max-w-4xl border-t border-line px-6 py-8 text-center text-sm text-soft">
        {profile.firstName} &middot; Built with Next.js
      </footer>
    </div>
  );
}
