"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projects";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Badge } from "@/components/ui/badge";

const badgeColors = {
  JavaScript: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/80 dark:text-yellow-200",
  TypeScript: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/80 dark:text-blue-200",
  "Next.js": "border-transparent bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100",
  React: "border-transparent bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-900/80 dark:text-sky-200",
  Electron: "border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/80 dark:text-indigo-200",
  "Node.js": "border-transparent bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/80 dark:text-green-200",
  SQLite: "border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/80 dark:text-teal-200",
  Upstash: "border-transparent bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/80 dark:text-red-200",
  Git: "border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200",
  Vercel: "border-transparent bg-black text-white hover:bg-neutral-800 dark:hover:bg-neutral-900",
  Vitest: "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/80 dark:text-purple-200",
  Sentry: "border-transparent bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900/80 dark:text-rose-200",
  default: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200",
};

const getBadgeColor = (tech) => badgeColors[tech] || badgeColors.default;

const ProjectCard = ({ project, setHoveredProject }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Array.isArray(project.imageUrl) ? project.imageUrl : [project.imageUrl];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex w-full flex-col rounded-xl border border-neutral-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-grow items-start space-x-8">
        <div className="flex flex-shrink-0 flex-col">
          <div className="flex items-center space-x-2">
            <Link href={project.github} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredProject(project)} onMouseLeave={() => setHoveredProject(null)}>
              <InteractiveHoverButton hoverText="github" className="text-xl font-bold bg-white text-neutral-900">
                {project.name}
              </InteractiveHoverButton>
            </Link>
            <ArrowLeft className="h-4 w-4 text-neutral-400" />
          </div>
        </div>
        <div className="flex-grow pt-1">
          <p className="text-sm font-semibold text-neutral-700">{project.shortDescription}</p>
          <p className="mt-2 text-base text-neutral-600">{project.description}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-neutral-300 pt-4">
        <div className="flex flex-wrap gap-2">
          {project.tech.sort().map((tech) => (
            <Badge key={tech} className={getBadgeColor(tech)}>
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentImages, setCurrentImages] = useState({});

  useEffect(() => {
    const intervals = projects.map((project, idx) => {
      const images = Array.isArray(project.imageUrl) ? project.imageUrl : [project.imageUrl];
      if (images.length <= 1) return null;

      return setInterval(() => {
        setCurrentImages((prev) => ({
          ...prev,
          [idx]: ((prev[idx] || 0) + 1) % images.length,
        }));
      }, 3000);
    });

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return (
    <div className="w-full h-full py-24 px-4" style={{ backgroundColor: "#c4c4c4", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className="pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl p-2 bg-white/50 backdrop-blur-md"
            style={{
              width: "80vw",
              height: "80vh",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {Array.isArray(hoveredProject.imageUrl) ? (
              <img src={hoveredProject.imageUrl[currentImages[projects.indexOf(hoveredProject)] || 0]} alt={hoveredProject.name} className="h-full w-full rounded-lg object-contain" />
            ) : (
              <img src={hoveredProject.imageUrl} alt={hoveredProject.name} className="h-full w-full rounded-lg object-contain" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Projects</h2>
          <p className="mt-2 text-lg text-neutral-600">These are the things you'll find me working on.</p>
        </div>

        <div className="mt-2 space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} setHoveredProject={setHoveredProject} />
          ))}
        </div>
      </div>
    </div>
  );
}
