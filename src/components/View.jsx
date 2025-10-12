export default function View({ children, id }) {
  return (
    <section id={id} className="h-screen w-full snap-start px-[6vw] py-[9vh] flex flex-col items-center justify-center relative">
      {/* AIMING LINES - Now part of each View */}
      {/* TOP HORIZONTAL AIM LINE */}
      <div className="absolute top-[7vh] left-0 w-full h-px edge-line pointer-events-none"></div>
      {/* BOTTOM HORIZONTAL AIM LINE */}
      <div className="absolute bottom-[7vh] left-0 w-full h-px edge-line pointer-events-none"></div>

      {/* VERTICAL AIM LINES CONTAINER */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* LEFT VERTICAL AIM LINE */}
        <div className="absolute top-0 left-[4vw] h-full w-px edge-line"></div>
        {/* RIGHT VERTICAL AIM LINE */}
        <div className="absolute top-0 right-[4vw] h-full w-px edge-line"></div>
      </div>

      {/* Your content goes here and will appear on top of the lines */}
      {children}
    </section>
  );
}
