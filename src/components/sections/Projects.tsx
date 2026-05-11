"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Database, Globe, Smartphone, Github, ExternalLink, Download } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

import { LucideIcon } from "lucide-react";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  isDemoLive: boolean;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const t = useTranslations("Projects");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.3 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center py-12 border-b border-border/50 last:border-0`}
    >
      <div className="w-full md:w-1/2 relative group rounded-xl overflow-hidden bg-muted/30 aspect-video">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full"
        >
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal" 
          />
        </motion.div>
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <project.icon className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-3xl font-serif font-bold tracking-tight">{project.title}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed font-light text-lg">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="px-3 py-1 bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors border-0 text-xs font-mono">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="outline" size="default" className="gap-2 border-border/50 hover:bg-primary/5" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              {t("source")}
            </a>
          </Button>

          <Button variant="default" size="default" className="gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all shadow-none" asChild>
            <a href={project.isDemoLive ? project.demoUrl : project.demoUrl} target="_blank" rel="noopener noreferrer">
              {project.isDemoLive ? (
                <>
                  <ExternalLink className="w-4 h-4" />
                  {t("demo")}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {t("download")}
                </>
              )}
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const t = useTranslations("Projects");

  const projects: Project[] = [
    {
      title: t("items.local-link.title"),
      description: t("items.local-link.description"),
      imageUrl: "/projects/locallink.gif",
      icon: Database,
      technologies: ["Electron", "React", "Express.js", "Socket.io", "Tailwind CSS"],
      githubUrl: "https://github.com/AnferneeDev/Local-Link",
      demoUrl: "https://github.com/AnferneeDev/Local-Link/releases",
      isDemoLive: false,
    },
    {
      title: t("items.offline-rates.title"),
      description: t("items.offline-rates.description"),
      imageUrl: "/projects/offlinerates.gif",
      icon: Smartphone,
      technologies: ["React Native", "Expo", "Supabase", "SQLite", "NativeWind"],
      githubUrl: "https://github.com/AnferneeDev/OfflineRates",
      demoUrl: "https://github.com/AnferneeDev/OfflineRates",
      isDemoLive: false,
    },
    {
      title: t("items.clear-feed.title"),
      description: t("items.clear-feed.description"),
      imageUrl: "/projects/clearfeed.gif",
      icon: Globe,
      technologies: ["Next.js", "Clerk", "Redis", "Tailwind CSS", "shadcn/ui"],
      githubUrl: "https://github.com/AnferneeDev/Clear_Feed",
      demoUrl: "https://clear-feed.vercel.app",
      isDemoLive: true,
    },
    {
      title: t("items.clarity.title"),
      description: t("items.clarity.description"),
      imageUrl: "/projects/clarity.gif",
      icon: Code2,
      technologies: ["Electron", "React", "TypeScript", "Vite", "shadcn/ui"],
      githubUrl: "https://github.com/AnferneeDev/Clarity",
      demoUrl: "https://github.com/AnferneeDev/Clarity/releases",
      isDemoLive: false,
    },
  ];

  return (
    <section id="projects" className="min-h-screen px-6 py-32 bg-background relative">
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif font-bold tracking-tighter"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-muted-foreground text-xl max-w-xl font-light"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
