"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/projects"; // Import the same project data

export default function ProjectPage({ params }) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  // If no project is found for the slug, display a message.
  if (!project) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Project not found.
        <Link href="http://localhost:3000/#projects" className="ml-2 text-blue-500 underline">
          Go back home
        </Link>
      </div>
    );
  }

  // The Icon component from the project data
  const Icon = project.Icon;

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-neutral-950 sm:p-8">
      {/* This motion.div has the same layoutId as the card, creating the animation. */}
      <motion.div layoutId={`card-${slug}`} className="relative z-10 w-full rounded-2xl bg-white p-6 shadow-lg dark:bg-black sm:p-8">
        <Link href="http://localhost:3000/#projects" className="absolute left-4 top-4 text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex flex-col items-center text-center">
          <Icon className="mb-4 h-16 w-16 text-neutral-700 dark:text-neutral-300" />
          <h1 className="text-2xl font-bold sm:text-4xl">{project.name}</h1>
          <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">{project.description}</p>
        </div>
      </motion.div>

      {/* This is for the rest of your page content, which fades in after the card animation. */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-8">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md dark:bg-black">
          <h2 className="text-2xl font-semibold">About This Project</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Here you can explain your project in great detail. Add images, technical specs, user stories, and more! This section is ready for you to fill out.</p>
        </div>
      </motion.div>
    </div>
  );
}
