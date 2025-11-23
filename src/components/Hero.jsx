import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Update these links to your real information
const socialLinks = [
  { icon: Github, href: "https://github.com/AnferneeDev", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/anfernee-pichardo-0787a637a/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:anfernee.developer@gmail.com", label: "Email" },
];

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-10 animate-fade-in">
        <div className="inline-block relative">
          <img src="/anfernee.jpg" alt="Anfernee Pichardo" className="w-28 h-28 rounded-full object-cover border-2 border-primary mx-auto" />
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight leading-tight text-gray-900 dark:text-gray-100">Full-Stack Developer</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-light">
            Experienced in full-stack projects with React, Next.js, React Native, Node.js, and PostgreSQL. I focus on mastering the tools I use while continuing to learn and improve through real-world projects.
          </p>
        </div>

        <div className="flex gap-3 justify-center items-center">
          {socialLinks.map((social) => (
            <Button key={social.label} variant="outline" size="icon" className="w-11 h-11 rounded-full border border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300" asChild>
              <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <social.icon className="w-4 h-4" />
              </a>
            </Button>
          ))}
        </div>

        <div className="pt-12">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>Scroll to view projects</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
