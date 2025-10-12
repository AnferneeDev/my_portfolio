export default function ProjectCard({ title }) {
  return (
    // Define the width of each slide/card
    <div className="flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_30%] mr-4">
      <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <h3 className="font-bold">{title}</h3>
      </div>
    </div>
  );
}
