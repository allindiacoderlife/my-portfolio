import CardCorners from "./CardCorners";

function AboutCard({ detailsCard, children, className }) {
  let transformClass = !detailsCard
    ? "md:translate-y-[-120px] z-[1]"
    : "sm:translate-x-[100px] translate-y-[-150px] md:translate-x-[-100px] md:translate-y-[150px] backdrop-blur-xl";

  return (
    <div
      className={`absolute w-[85%] h-[480px] md:w-[350px] md:h-[500px] md:-skew-x-12 flex flex-col items-start justify-start p-4 bg-black/[60%] border border-white/[25%] ${transformClass} ${className}`}
    >
      <CardCorners />

      {children}
    </div>
  );
}

export default AboutCard;
