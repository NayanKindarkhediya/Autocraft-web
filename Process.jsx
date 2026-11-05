import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";
import { process } from "../../data/site";
import { Reveal, SplitWords } from "../Reveal";

function Orbit({ step }) {
  return (
    <div className="relative h-56 w-56 lg:h-80 lg:w-80" aria-hidden="true">
      {Array.from({ length: step + 1 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{
            duration: 20 + i * 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full border border-accent/40"
          style={{
            inset: `${i * 14}%`,
            borderStyle: i % 2 ? "dashed" : "solid",
          }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_#1a7bff]" />
        </motion.div>
      ))}
      <div className="absolute inset-[40%] rounded-full bg-accent/60 blur-2xl" />
    </div>
  );
}

function Panel({ step, i, progress }) {
  const opacity = useTransform(
    progress,
    [(i - 1) / 3, i / 3, (i + 1) / 3],
    [0.15, 1, 0.15],
  );
  const scale = useTransform(
    progress,
    [(i - 1) / 3, i / 3, (i + 1) / 3],
    [0.92, 1, 0.92],
  );
  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative flex h-full w-screen shrink-0 items-center px-10 lg:px-24"
    >
      <span className="display outline-text pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-[34vw] leading-none opacity-30 lg:left-16">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="relative grid w-full max-w-[1400px] items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h3 className="display text-[clamp(3.5rem,12vw,12rem)]">
            {step.title}
          </h3>
          <p className="mt-6 max-w-lg text-lg text-white/60 lg:text-xl">
            {step.text}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {step.items.map((t) => (
              <li
                key={t}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm"
              >
                <Check size={14} className="text-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden justify-center lg:flex">
          <Orbit step={i} />
        </div>
      </div>
    </motion.div>
  );
}

function Desktop() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(Math.round(v * 3)),
  );
  return (
    <div ref={ref} className="relative hidden h-[420vh] md:block">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(circle_at_30%_50%,#000,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="absolute left-10 top-24 z-10 flex items-center gap-4">
          <h2
            id="process-title"
            className="mono text-sm uppercase tracking-[0.25em] text-white/50"
          >
            Our process
          </h2>
        </div>
        <motion.div style={{ x }} className="flex h-full w-[400vw]">
          {process.map((s, i) => (
            <Panel key={s.title} step={s} i={i} progress={scrollYProgress} />
          ))}
        </motion.div>
        <div className="absolute inset-x-10 bottom-10 z-10 lg:inset-x-24">
          <div className="relative h-px bg-white/15">
            <motion.div
              style={{ width: fill }}
              className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_12px_#1a7bff]"
            />
          </div>
          <div className="mt-4 flex justify-between">
            {process.map((s, i) => (
              <span
                key={s.title}
                className={`mono text-xs transition-colors duration-500 ${i <= active ? "text-bone" : "text-white/30"}`}
              >
                {String(i + 1).padStart(2, "0")} {s.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Mobile() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="px-5 py-24 md:hidden">
      <h2 id="process-title" className="display mb-14 text-[15vw]">
        <SplitWords text="Our|process" />
      </h2>
      <div ref={ref} className="relative pl-10">
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-white/15">
          <motion.div style={{ height: h }} className="w-full bg-accent" />
        </div>
        {process.map((s, i) => (
          <Reveal key={s.title} className="relative pb-16 last:pb-0">
            <span className="absolute -left-10 top-3 h-[15px] w-[15px] rounded-full border-2 border-accent bg-ink" />
            <span className="mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="display mt-1 text-6xl">{s.title}</h3>
            <p className="mt-4 text-white/60">{s.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.items.map((t) => (
                <li key={t} className="glass rounded-full px-3 py-1.5 text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section aria-labelledby="process-title" className="relative bg-ink">
      <Desktop />
      <Mobile />
    </section>
  );
}
