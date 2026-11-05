const items = [
  "Websites",
  "Web Apps",
  "UI / UX",
  "E-commerce",
  "AI Solutions",
  "Custom Software",
];

export default function Marquee() {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/[0.07] bg-coal py-5 md:py-7"
    >
      <div className="flex w-max animate-marquee items-center">
        {row.map((t, i) => (
          <span
            key={i}
            className="display flex items-center gap-8 pr-8 text-3xl md:gap-14 md:pr-14 md:text-6xl"
          >
            <span className={i % 2 ? "outline-text" : "text-bone"}>{t}</span>
            <span className="h-2 w-2 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
