import { aboutStats } from '../../data/site';
import { useProjects } from '../../hooks/useProjects';
import { useCountUp } from '../../hooks/useCountUp';
import { Reveal, SplitWords } from '../Reveal';

function Stat({ label, value }) {
  const [ref, n] = useCountUp(value);
  return (
    <div ref={ref} className="border-t border-white/15 pt-5">
      <p className="display text-6xl tabular-nums md:text-8xl">{String(n).padStart(2, '0')}</p>
      <p className="mono mt-3 text-xs uppercase tracking-[0.2em] text-white/50">{label}</p>
    </div>
  );
}

export default function About() {
  const { projects } = useProjects();
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-16 px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1500px]">
        <h2 id="about-title" className="display text-[clamp(2.8rem,10.5vw,11rem)]">
          <SplitWords text="We turn ideas|into digital|experiences." />
        </h2>
        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:col-start-7">
            <p className="text-lg leading-relaxed text-white/65 md:text-xl">
              AutoCraft Web is a creative web studio. We design and build websites, web applications and digital products with a real backend, a clean admin and an interface people remember.
            </p>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 md:col-span-12 md:gap-10">
            {aboutStats.map((s) => <Stat key={s.label} label={s.label} value={s.value ?? projects.length} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
