import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/magicui/shine-border"; // <-- Add curly braces here

export default function Intro() {
  return (
    // Main container to center the content vertically and horizontally
    <div className="flex flex-col items-center justify-center h-full w-full text-center gap-8">
      {/* Container for the overlapping avatar images and names */}
      <div className="relative h-48 w-64">
        {/* Annfernee's Avatar + Name */}
        <div className="absolute top-0 right-0 flex items-center gap-4">
          <p className="font-semibold text-zinc-800">Annfernee</p>
          <div className="relative size-24 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <Image
              src="/annfernee.jpg" // Replace with your photo
              alt="Photo of Annfernee"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* Kitty's Avatar + Name */}
        <div className="absolute bottom-0 left-0 flex items-center gap-4">
          <div className="relative size-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <Image
              src="/kitty.jpg" // Replace with your cat's photo
              alt="Photo of Kitty the cat"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="font-semibold text-zinc-800">Kitty</p>
        </div>
      </div>

      {/* Text content section */}
      <div className="max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-800">
          Need to build and test your new product <span className="text-pink-500">as fast as possible?</span>
        </h2>
        <p className="mt-4 text-lg text-zinc-600">I design and develop modular, scalable, and high-performance web applications with Next.js, turning your vision into a reality.</p>
      </div>

      {/* Call to Action Button with Magic UI ShineBorder */}
      <ShineBorder className="text-center text-xl font-bold capitalize" color={["#FF0080", "#FF4D4D", "#FF8C00"]}>
        <a href="/annfernee-cv.pdf" download>
          <Button size="lg" className="px-8 py-6">
            Download CV
          </Button>
        </a>
      </ShineBorder>
    </div>
  );
}
