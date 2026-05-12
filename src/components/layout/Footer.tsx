"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Footer = () => {
  const t = useTranslations("Footer");
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-light">
          © {year || "..."} Anfernee Pichardo. {t("builtWith")}.
        </p>
        <div className="text-sm text-muted-foreground font-light">
          {t("intent")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
