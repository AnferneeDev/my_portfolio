import Image from "next/image";
import { Github, Twitter } from "lucide-react";
import { FlickeringGrid } from "./ui/flickering-grid";

export default function Intro() {
  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      {/* Full-screen FlickeringGrid background with radial mask */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: "radial-gradient(circle at center, transparent 35%, black 60%)",
          WebkitMaskImage: "radial-gradient(circle at center, transparent 35%, black 60%)",
        }}
      >
        <FlickeringGrid />
      </div>

      {/* Main content centered */}
      {/* CHANGE: Increased upward shift from -translate-y-2 to -translate-y-5 */}
      <div className="relative z-10 flex flex-col items-center gap-6 -translate-y-5">
        <div className="flex items-center gap-4 w-full justify-center max-w-sm ml-8 md:ml-0 md:max-w-xl">
          <div className="relative size-20 transform -rotate-3 rounded-md border-2 border-white/20 p-1 shadow-lg flex-shrink-0">
            <Image src="/annfernee.jpg" alt="Photo of Annfernee" layout="fill" objectFit="cover" className="rounded-sm" />
          </div>
          <div className="flex flex-col items-start text-left">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Anfernee Pichardo</h2>
            <p className="text-base text-gray-700">Full stack developer</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950">Want to test a new product?</h1>
          <p className="mt-2 text-lg text-gray-800">I turn ideas into production-grade web apps in Next.js. Modular, scalable, and optimized.</p>
        </div>
      </div>

      {/* Footer section (Socials & Email) with z-10 to be on top */}
      <div className="absolute bottom-4 z-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <a href="https://github.com/AnferneeDev" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 hover:border-gray-600 transition-colors">
            <Github className="size-6" />
          </a>
          <a href="https://x.com/AnferneeDev" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 hover:border-gray-600 transition-colors">
            <Twitter className="size-6" />
          </a>
        </div>
        <a href="mailto:anfernee.developer@gmail.com" className="text-base font-bold text-pink-500 hover:underline">
          anfernee.developer@gmail.com
        </a>
      </div>
    </div>
  );
}
