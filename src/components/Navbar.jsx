import React from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button

export default function Navbar() {
  // Define button data as an array of objects
  const navButtons = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Hire me", href: "#hireme" },
    // Add more buttons here easily
  ];

  return (
    // fixed top bar that centers the moveable button group
    <header className="fixed top-0 left-0 w-full h-[7vh] z-50 flex items-center justify-center">
      {/* Outer container centers the button group */}
      <div className="w-full flex items-center justify-center">
        {/* Buttons flex container */}
        <div className="flex items-center gap-0.5 p-1">
          {navButtons.map((btn, index) => (
            <div className="inline-block" key={index}>
              <a href={btn.href}>
                <Button className={"h-7 px-3 text-sm rounded-sm bg-pink-500 text-white hover:bg-pink-500 active:bg-pink-500 focus:ring-0 shadow-none border-none"}>{btn.label}</Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
