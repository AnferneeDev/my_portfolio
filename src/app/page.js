"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const introRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const getScrollContainer = () => {
      return document.querySelector("main") || window;
    };

    const handleScroll = () => {
      const scrollContainer = getScrollContainer();
      const introElement = introRef.current;
      const projectsElement = projectsRef.current;

      if (!introElement) return;

      const rect = introElement.getBoundingClientRect();
      const scrollContainerHeight = scrollContainer.clientHeight || window.innerHeight;

      const introBottom = rect.bottom;
      const triggerStart = scrollContainerHeight;
      const triggerEnd = -scrollContainerHeight * 0.5;

      let newProgress = 0;
      if (introBottom < triggerStart && introBottom > triggerEnd) {
        newProgress = (triggerStart - introBottom) / (triggerStart - triggerEnd);
      } else if (introBottom <= triggerEnd) {
        newProgress = 1;
      }

      setProgress(Math.max(0, Math.min(1, newProgress)));

      // Calculate transition progress (Projects to AboutMe)
      if (projectsElement) {
        const projectsRect = projectsElement.getBoundingClientRect();
        const projectsBottom = projectsRect.bottom;

        const projectTriggerStart = scrollContainerHeight;
        const projectTriggerEnd = -scrollContainerHeight * 0.5;

        let projectProgress = 0;
        if (projectsBottom < projectTriggerStart && projectsBottom > projectTriggerEnd) {
          projectProgress = (projectTriggerStart - projectsBottom) / (projectTriggerStart - projectTriggerEnd);
        } else if (projectsBottom <= projectTriggerEnd) {
          projectProgress = 1;
        }

        setTransitionProgress(Math.max(0, Math.min(1, projectProgress)));
      }

      // Update CSS variable for body background
      document.documentElement.style.setProperty("--bg-overlay-opacity", newProgress);
      document.documentElement.style.setProperty("--bg-overlay-opacity-projects", transitionProgress);
    };

    const scrollContainer = getScrollContainer();
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [transitionProgress]);

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(
            rgba(0, 0, 0, var(--bg-overlay-opacity, 0)),
            rgba(0, 0, 0, var(--bg-overlay-opacity, 0))
          ),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'%3E%3Cdefs%3E%3CradialGradient id='gggrain-gradient' r='0.8'%3E%3Cstop offset='0%25' stop-color='hsl(0, 0%25, 74%25)'%3E%3C/stop%3E%3Cstop offset='50%25' stop-color='hsl(0, 0%25, 73%25)'%3E%3C/stop%3E%3Cstop offset='100%25' stop-color='hsl(0, 0%25, 85%25)'%3E%3C/stop%3E%3C/radialGradient%3E%3Cfilter id='gggrain-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' seed='78' stitchTiles='stitch' result='turbulence'%3E%3C/feTurbulence%3E%3CfeColorMatrix type='saturate' values='0' in='turbulence' result='colormatrix'%3E%3C/feColorMatrix%3E%3CfeComponentTransfer in='colormatrix' result='componentTransfer'%3E%3CfeFuncR type='linear' slope='3'%3E%3C/feFuncR%3E%3CfeFuncG type='linear' slope='3'%3E%3C/feFuncG%3E%3CfeFuncB type='linear' slope='3'%3E%3C/feFuncB%3E%3C/feComponentTransfer%3E%3CfeColorMatrix in='componentTransfer' result='colormatrix2' type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 15 -7'%3E%3C/feColorMatrix%3E%3C/filter%3E%3C/defs%3E%3Cg%3E%3Crect width='100%25' height='100%25' fill='url(%23gggrain-gradient)'%3E%3C/rect%3E%3Crect width='100%25' height='100%25' fill='transparent' filter='url(%23gggrain-filter)' opacity='0.42' style='mix-blend-mode: soft-light'%3E%3C/rect%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* Intro Section */}
      <motion.div ref={introRef} initial={{ opacity: 1 }} animate={{ opacity: 1 - progress }} transition={{ duration: 0 }}>
        <Intro />
      </motion.div>

      {/* Spacer with flickering grid transition (Intro to Projects) */}
      <div className="relative h-[50%] w-full" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,${1 - progress}) 100%)`,
            WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,${1 - progress}) 100%)`,
          }}
        >
          <FlickeringGrid />
        </div>
      </div>

      {/* Projects Section */}
      <motion.div ref={projectsRef} initial={{ opacity: 0 }} animate={{ opacity: progress }} transition={{ duration: 0 }}>
        <Projects />
      </motion.div>

      {/* AboutMe Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: Math.max(transitionProgress - 0.1, 0) }} transition={{ duration: 0 }}>
        <AboutMe />
      </motion.div>
    </>
  );
}
