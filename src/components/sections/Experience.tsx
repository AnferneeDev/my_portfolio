"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    company: "Widening.io",
    role: "Full-Stack Developer",
    period: "Nov 2025 – Present",
    type: "Remote",
    description: [
      "Architected and implemented automated CI/CD deployment pipelines for decoupled infrastructure (Next.js + Laravel) on cPanel.",
      "Integrated AZUL Payment Gateway for secure transaction signing and status callbacks.",
      "Built Stripe Connect platform features, including merchant OAuth onboarding and automated token storage.",
      "Developed a 'Shadow Admin' API to separate sensitive administrative logic, enhancing security.",
      "Created data synchronization scripts for HubSpot, Pipedrive, and Salesforce.",
      "Developed App Marketplace frontend with interactive sidebars for external financial data."
    ],
    skills: ["Next.js", "Laravel", "AWS", "CI/CD", "Stripe", "CRM Integration"]
  },
  {
    company: "Dhaka Medical Center",
    role: "Contractor",
    period: "Oct 2025 – Nov 2025",
    type: "Remote",
    description: [
      "Engineered an offline-first mobile hospital tracking application using React Native and SQLite.",
      "Executed a complete infrastructure migration from Render to Supabase.",
      "Developed new database schemas and established real-time sync with admin dashboards.",
      "Reduced client hosting costs by 100% through optimized infrastructure migration."
    ],
    skills: ["React Native", "SQLite", "Supabase", "Infrastructure Migration"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold tracking-tighter"
          >
            Professional Experience.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-xl font-light"
          >
            Building production-grade features and solving complex business problems.
          </motion.p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
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
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-4 text-muted-foreground leading-relaxed font-light">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
