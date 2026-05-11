"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { LucideIcon } from "lucide-react";

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com/AnferneeDev", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/anfernee-pichardo-0787a637a/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:anfernee.developer@gmail.com", label: "Email" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } as const },
} as const;

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="max-w-4xl w-full grid md:grid-cols-[1fr_auto] gap-12 items-center"
      >
        <div className="space-y-8 order-2 md:order-1">
          <motion.div variants={item} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-[1.1] text-foreground">
              Anfernee<br />
              <span className="text-muted-foreground">Pichardo.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-tight text-foreground">
              Full-Stack Developer
            </p>
          </motion.div>

          <motion.div variants={item}>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-light">
              Full-Stack Developer with experience building production features for payment platforms, AWS Lambda functions, and CI/CD pipelines. Specialized in Laravel, Next.js, and TypeScript, with a focus on writing clean, maintainable code and solving real business problems.
            </p>
          </motion.div>

          <motion.div variants={item} className="flex gap-4 items-center pt-4">
            {socialLinks.map((social) => (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} key={social.label}>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-12 h-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300" 
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={item} className="order-1 md:order-2 flex justify-start md:justify-end">
          <div className="relative group">
            <motion.div 
              whileHover={{ rotate: 2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10"
            >
              <img 
                src="/anfernee.jpg" 
                alt="Anfernee Pichardo" 
                className="w-40 h-40 md:w-56 md:h-56 rounded-2xl object-cover border border-border shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
            </motion.div>
            {/* Offset decorative block */}
            <div className="absolute inset-0 bg-primary/10 rounded-2xl translate-x-4 translate-y-4 -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sm text-muted-foreground"
      >
        <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
