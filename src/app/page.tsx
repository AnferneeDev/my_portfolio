import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";

export default function Home() {
  return (
    <main className="bg-background">
      <Hero />
      <Experience />
      <Projects />
    </main>
  );
}
