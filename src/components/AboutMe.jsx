import { FlickeringGrid } from "./ui/flickering-grid";

export default function AboutMe() {
  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      {/* Full-screen FlickeringGrid background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: "radial-gradient(circle at center, transparent 35%, black 60%)",
          WebkitMaskImage: "radial-gradient(circle at center, transparent 35%, black 60%)",
          filter: "invert(1) brightness(1.2)",
        }}
      >
        <FlickeringGrid />
      </div>

      {/* Main content centered */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
        <div className="flex flex-col items-center gap-2">
          {/* CHANGE: Added text shadow for a subtle glow */}
          <h2 className="text-sm font-semibold tracking-widest text-white uppercase [text-shadow:0_0_8px_rgba(255,255,255,0.4)]">About Me</h2>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white [text-shadow:0_0_10px_rgba(255,255,255,0.4)]">Who am I</h1>
        </div>

        <div className="flex flex-col gap-5 text-left">
          {/* CHANGE: Added text shadow for a subtle glow */}
          <p className="text-base md:text-lg text-white leading-relaxed [text-shadow:0_0_6px_rgba(255,255,255,0.3)]">
            I started learning to code three months ago. I found the best way to learn was by building, so I made three tools to solve problems I had. I just enjoy making things that are genuinely useful.
          </p>

          <p className="text-base md:text-lg text-white leading-relaxed [text-shadow:0_0_6px_rgba(255,255,255,0.3)]">
            I focus on writing clean, simple code that lasts. For me, taking the time to build something right is always the fastest approach in the end.
          </p>

          <div className="pt-4 border-t border-gray-700">
            {/* CHANGE: Added text shadow for a subtle glow */}
            <p className="text-sm text-white [text-shadow:0_0_6px_rgba(255,255,255,0.3)]">
              <span className="font-semibold text-white">Stack:</span> Next.js, React, Node.js, Tailwind CSS, Clerk, Redis, Sentry, Vitest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
