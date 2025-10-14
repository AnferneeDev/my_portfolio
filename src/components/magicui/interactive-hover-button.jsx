import { Github } from "lucide-react"; // Changed icon to match "github" text
import { cn } from "@/lib/utils";

// MODIFICATION: Explicitly accept `hoverText` in the props
export function InteractiveHoverButton({
  children,
  className,
  hoverText, // The component now knows about this prop
  ...props
}) {
  return (
    <button
      className={cn(
        // NOTE: The `bg-background` class will make the button white in your light theme.
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold",
        className
      )}
      // `hoverText` is no longer in `...props`, so the error is gone.
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">{children}</span>
      </div>
      <div className="text-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        {/* MODIFICATION: Using the `hoverText` prop here */}
        <span>{hoverText}</span>
        <Github className="h-4 w-4" />
      </div>
    </button>
  );
}
