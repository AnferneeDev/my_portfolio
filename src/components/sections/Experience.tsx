"use client";

import { m, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const Experience = () => {
  const t = useTranslations("Experience");
  const shouldReduceMotion = useReducedMotion();

  const experiences = [
    {
      id: "widening",
      company: t("items.widening.company"),
      role: t("items.widening.role"),
      period: t("items.widening.period"),
      type: t("types.remote"),
      description: t.raw("items.widening.description") as string[],
      skills: ["Next.js", "Laravel", "AWS", "CI/CD", "Stripe", "CRM Integration"]
    },
    {
      id: "dmc",
      company: t("items.dmc.company"),
      role: t("items.dmc.role"),
      period: t("items.dmc.period"),
      type: t("types.remote"),
      description: t.raw("items.dmc.description") as string[],
      skills: ["React Native", "SQLite", "Supabase", "Infrastructure Migration"]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-4">
          <m.h2 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-semibold tracking-tighter"
          >
            {t("title")}
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-xl font-light"
          >
            {t("subtitle")}
          </m.p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <m.div 
              key={exp.id}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-[1fr_2fr] gap-8 pb-12 border-b border-border/50 last:border-0"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-semibold">{exp.company}</h3>
                <p className="text-primary font-medium">{exp.role}</p>
                <p className="text-sm text-muted-foreground font-mono">{exp.period} • {exp.type}</p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {exp.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <ul className="space-y-4">
                {exp.description.map((item) => (
                  <li key={item.substring(0, 20)} className="flex gap-4 text-muted-foreground leading-relaxed font-light">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
