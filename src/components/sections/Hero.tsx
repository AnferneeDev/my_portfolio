"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

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

const item = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } as const },
});

const Hero = () => {
  const t = useTranslations("Hero");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-1/4 left-1/4 size-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <m.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="max-w-4xl w-full grid md:grid-cols-[1fr_auto] gap-12 items-center"
      >
        <div className="space-y-8 order-2 md:order-1">
          <m.div variants={item(shouldReduceMotion)} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif font-semibold tracking-tighter leading-[1.1] text-foreground">
              {t("title1")}<br />
              <span className="text-muted-foreground">{t("title2")}</span>
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-tight text-foreground">
              {t("role")}
            </p>
          </m.div>

          <m.div variants={item(shouldReduceMotion)}>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-light">
              {t("description")}
            </p>
          </m.div>

          <m.div variants={item(shouldReduceMotion)} className="flex gap-4 items-center pt-4">
            {socialLinks.map((social) => (
              <m.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} key={social.label}>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="size-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300" 
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="size-5" />
                  </a>
                </Button>
              </m.div>
            ))}
          </m.div>
        </div>

        <m.div variants={item(shouldReduceMotion)} className="order-1 md:order-2 flex justify-start md:justify-end">
          <div className="relative group">
            <m.div 
              whileHover={{ rotate: 2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10"
            >
              <img 
                src="/anfernee.jpg" 
                alt="Anfernee Pichardo" 
                className="size-40 md:size-56 rounded-2xl object-cover border border-border shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
            </m.div>
            {/* Offset decorative block */}
            <div className="absolute inset-0 bg-primary/10 rounded-2xl translate-x-4 translate-y-4 -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
          </div>
        </m.div>
      </m.div>

      <m.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sm text-muted-foreground"
      >
        <span className="font-mono text-xs uppercase tracking-widest">{t("scroll")}</span>
        <m.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent"
        />
      </m.div>
    </section>
  );
};

export default Hero;
