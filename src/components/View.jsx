import { FlickeringGrid } from "./ui/flickering-grid";

export default function View({ children, id }) {
  return (
    <section id={id} className="h-screen w-full snap-start px-[6vw] py-[9vh] flex flex-col items-center justify-center relative">
      <FlickeringGrid />
      {/* Your content goes here */}
      {children}
    </section>
  );
}
