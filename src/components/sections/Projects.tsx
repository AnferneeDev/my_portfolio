"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Database, Globe, Github, ExternalLink, Download, Bot, Workflow } from "lucide-react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

import { LucideIcon } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  isDemoLive?: boolean;
  demoType?: "demo" | "play" | "download";
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const t = useTranslations("Projects");
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { 
    amount: 0.35, 
    margin: "-10% 0px -10% 0px" 
  });
  const shouldReduceMotion = useReducedMotion();
  
  const isEven = index % 2 === 0;

  return (
    <m.div 
      ref={cardRef}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ 
        duration: 0.7, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center py-12 border-b border-border/50 last:border-0`}
    >
      <div className="w-full md:w-1/2 relative group rounded-xl overflow-hidden bg-muted/30 aspect-video border border-border/40">
        <m.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full"
        >
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isInView 
                ? 'grayscale-0 contrast-100 opacity-100' 
                : 'grayscale contrast-95 opacity-80 group-hover:grayscale-0 group-hover:opacity-100'
            }`} 
          />
        </m.div>
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <project.icon className="size-5 text-muted-foreground" />
            <h3 className="text-3xl font-serif font-semibold tracking-tight">{project.title}</h3>
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

        {(project.githubUrl || project.demoUrl) && (
          <div className="flex gap-4 pt-4">
            {project.githubUrl && (
              <Button variant="outline" size="default" className="gap-2 border-border/50 hover:bg-primary/5" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                  {t("source")}
                </a>
              </Button>
            )}

            {project.demoUrl && (
              <Button variant="default" size="default" className="gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all shadow-none" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  {project.demoType === "download" ? (
                    <>
                      <Download className="size-4" />
                      {t("download")}
                    </>
                  ) : project.demoType === "play" ? (
                    <>
                      <ExternalLink className="size-4" />
                      {t("play")}
                    </>
                  ) : project.isDemoLive ? (
                    <>
                      <ExternalLink className="size-4" />
                      {t("demo")}
                    </>
                  ) : (
                    <>
                      <Download className="size-4" />
                      {t("download")}
                    </>
                  )}
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </m.div>
  );
};

const Projects = () => {
  const t = useTranslations("Projects");

  const projects: Project[] = [
    {
      id: "ai-or-not",
      title: t("items.ai-or-not.title"),
      description: t("items.ai-or-not.description"),
      imageUrl: "/projects/ai-or-not.jpg",
      icon: Bot,
      technologies: ["Next.js", "React Native", "Expo", "Tailwind CSS", "Amazon S3"],
      demoUrl: "https://www.realitycheck.pics/",
      demoType: "play",
      isDemoLive: true,
    },
    {
      id: "n8n-automation",
      title: t("items.n8n-automation.title"),
      description: t("items.n8n-automation.description"),
      imageUrl: "/projects/n8n-automation.svg",
      icon: Workflow,
      technologies: ["Docker", "AWS CloudFormation", "Cloudflare Tunnel", "n8n", "EC2"],
    },
    {
      id: "clarity",
      title: t("items.clarity.title"),
      description: t("items.clarity.description"),
      imageUrl: "/projects/clarity.gif",
      icon: Code2,
      technologies: ["Electron", "React", "TypeScript", "Vite", "shadcn/ui"],
      githubUrl: "https://github.com/AnferneeDev/Clarity",
      demoUrl: "https://github.com/AnferneeDev/Clarity/releases",
      isDemoLive: false,
    },
    {
      id: "clear-feed",
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
      id: "local-link",
      title: t("items.local-link.title"),
      description: t("items.local-link.description"),
      imageUrl: "/projects/locallink.gif",
      icon: Database,
      technologies: ["Electron", "React", "Express.js", "Socket.io", "Tailwind CSS"],
      githubUrl: "https://github.com/AnferneeDev/Local-Link",
      demoUrl: "https://github.com/AnferneeDev/Local-Link/releases",
      isDemoLive: false,
    },
  ];

  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="min-h-screen px-6 py-32 bg-background relative">
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="space-y-4">
          <m.h2 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl md:text-6xl font-serif font-semibold tracking-tighter"
          >
            {t("title")}
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-muted-foreground text-xl max-w-xl font-light"
          >
            {t("subtitle")}
          </m.p>
        </div>

        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
