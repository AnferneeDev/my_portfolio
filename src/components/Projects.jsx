import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Database, Globe, Smartphone, Github, ExternalLink, Download } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Local Link",
      description: "Desktop utility that creates a private local network for sharing files and text between devices via QR code. No internet required.",
      imageUrl: "/projects/locallink.gif",
      icon: Database,
      technologies: ["Electron", "React", "Express.js", "Socket.io", "Tailwind CSS", "TypeScript"],
      githubUrl: "https://github.com/AnferneeDev/Local-Link",
      demoUrl: "https://github.com/AnferneeDev/Local-Link/releases",
      isDemoLive: false, // Shows "Download" button
    },
    {
      title: "OfflineRates",
      description: "Offline-first mobile app for browsing hospital service prices. Syncs with Supabase and stores data locally via SQLite for 100% offline access.",
      imageUrl: "/projects/offlinerates.gif",
      icon: Smartphone,
      technologies: ["React Native", "Expo", "Supabase", "SQLite", "NativeWind", "TypeScript"],
      githubUrl: "https://github.com/AnferneeDev/OfflineRates",
      demoUrl: "https://github.com/AnferneeDev/OfflineRates",
      isDemoLive: false,
    },
    {
      title: "Clear Feed",
      description: "Productivity-focused YouTube client that removes recommendations and distractions. Features chronological feeds, channel management, and high-performance caching.",
      imageUrl: "/projects/clearfeed.gif",
      icon: Globe,
      technologies: ["Next.js", "Clerk", "Redis", "Tailwind CSS", "Sentry", "shadcn/ui"],
      githubUrl: "https://github.com/AnferneeDev/Clear_Feed",
      demoUrl: "https://clear-feed.vercel.app",
      isDemoLive: true,
    },
    {
      title: "Clarity",
      description: "A modern Pomodoro and time-tracking app for Windows that lives in your system tray. Features detailed stats, offline capability, and task management.",
      imageUrl: "/projects/clarity.gif",
      icon: Code2,
      technologies: ["Electron", "React", "TypeScript", "Vite", "shadcn/ui"],
      githubUrl: "https://github.com/AnferneeDev/Clarity",
      demoUrl: "https://github.com/AnferneeDev/Clarity/releases",
      isDemoLive: false,
    },
  ];

  return (
    <section className="min-h-screen px-6 py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 dark:text-gray-100">Featured Projects</h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto font-light">A selection of recent work showcasing technical expertise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <Card key={project.title} className="group overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500 hover-lift animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative overflow-hidden h-52">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

                <div className="absolute top-4 right-4 p-3 bg-background/90 backdrop-blur-sm rounded-full border border-border/50 group-hover:border-primary transition-colors">
                  <project.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm font-light">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-0.5 bg-secondary hover:bg-primary/10 hover:text-primary transition-all border-0 text-xs font-normal">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2 border border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-all text-sm font-normal" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </Button>

                  <Button size="sm" className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-normal" asChild>
                    <a href={project.isDemoLive ? project.demoUrl : project.demoUrl} target="_blank" rel="noopener noreferrer">
                      {project.isDemoLive ? (
                        <>
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </>
                      )}
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
