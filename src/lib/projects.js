import { Youtube, Clock, Star } from "lucide-react";

export const projects = [
  {
    Icon: Youtube,
    name: "Clear Feed",
    slug: "clear-feed",
    github: "https://github.com/AnferneeDev/Clear_Feed", // NEW: Added github link
    shortDescription: "YouTube without the noise.",
    description: "Enhance your YouTube experience by focusing purely on content, free from distractions, clickbaits, and the algorithm.",
    href: "/",
    imageUrl: ["/CF1.png", "/CF2.png", "/CF3.png"],
    tech: ["JavaScript", "Next.js", "Git", "Vercel", "Upstash", "Vitest", "Sentry"],
    deploymentUrl: "https://clear-feed.vercel.app/",
  },
  {
    Icon: Clock,
    name: "Clarity",
    slug: "clarity",
    github: "https://github.com/AnferneeDev/Pomodoro", // NEW: Added github link
    shortDescription: "Track habits & boost focus.",
    description: "A productivity app to track work sessions and habits with detailed statistics, notes, to-dos, and reminders.",
    href: "/",
    imageUrl: ["/C1.png", "/C2.png", "/C3.png", "/C4.png", "/C5.png"],
    tech: ["Electron", "TypeScript", "React", "SQLite", "Node.js", "Git"],
    deploymentUrl: "https://github.com/AnferneeDev/Pomodoro/releases",
  },
  {
    Icon: Star,
    name: "Portfolio",
    slug: "portfolio",
    github: "https://github.com/AnferneeDev/my_portfolio", // NEW: Added github link
    shortDescription: "My best work on display.",
    description: "My personal portfolio, showcasing a collection of my best work from across the internet.",
    href: "/",
    imageUrl: ["/PF1.png", "/PF2.png", "/PF3.png"],
    tech: ["Git", "JavaScript", "Next.js"],
    deploymentUrl: "https://anfernee.vercel.app/",
  },
];
