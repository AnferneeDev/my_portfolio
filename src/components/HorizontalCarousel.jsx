"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";

// This component will hold our draggable cards
export default function HorizontalCarousel({ children }) {
  const [emblaRef] = useEmblaCarousel({
    // Optional: add options here, like `align: 'start'` or `loop: true`
  });

  return (
    <div className="overflow-hidden w-full bg-yellow-400" ref={emblaRef}>
      <div className="flex">{children}</div>
    </div>
  );
}
