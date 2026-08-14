"use client";

import { Github, Linkedin, Mail, Languages } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

const Header = () => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif font-semibold text-lg tracking-tight hover:text-primary transition-colors">
          AP.
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#projects" className="hover:text-foreground transition-colors">
            {t("projects")}
          </Link>
          <div className="w-px h-4 bg-border" />
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2 px-2 hover:bg-primary/5" asChild>
              <Link href={pathname} locale={locale === 'en' ? 'es' : 'en'}>
                <Languages className="size-4" />
                <span className="uppercase text-[10px] font-semibold">{locale === 'en' ? 'ES' : 'EN'}</span>
              </Link>
            </Button>

            <div className="w-px h-4 bg-border" />

            <a href="https://github.com/AnferneeDev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <Github className="size-4" />
            </a>
            <a href="https://www.linkedin.com/in/anfernee-pichardo-0787a637a/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <Linkedin className="size-4" />
            </a>
            <a href="mailto:anfernee.developer@gmail.com" className="hover:text-foreground transition-colors">
              <Mail className="size-4" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
