import View from "@/components/View";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import ProjectCard from "@/components/ProjectCard";
import Intro from "@/components/Intro";

export default function Home() {
  return (
    <>
      {/* SPLIT IMAGE CONTAINER */}
      <div className="relative w-full h-[200vh]">
        {/* First section (top half) */}
        <View id="home">
          <div className="w-full h-full border-4 border-amber-700">
            <Intro />
          </div>
        </View>

        {/* Second section (bottom half) */}
        <View id="projects">
          <HorizontalCarousel>
            <ProjectCard title="Project A" />
            <ProjectCard title="Project B" />
            <ProjectCard title="Project C" />
            <ProjectCard title="Project D" />
            <ProjectCard title="Project E" />
          </HorizontalCarousel>
        </View>
      </div>

      <View id="about">
        <h2 className="text-4xl font-bold">About Me</h2>
      </View>
    </>
  );
}
