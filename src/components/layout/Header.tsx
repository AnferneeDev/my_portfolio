import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif font-bold text-lg tracking-tight hover:text-primary transition-colors">
          AP.
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-4">
            <a href="https://github.com/AnferneeDev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/anfernee-pichardo-0787a637a/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:anfernee.developer@gmail.com" className="hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
