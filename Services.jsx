import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "../../data/site";
import { SplitWords, Reveal } from "../Reveal";
import ServiceVisual from "./ServiceVisual";
import Button from "../Button";

const glows = [
  "#1a7bff",
  "#22d3ee",
  "#7c5cff",
  "#2b8cff",
  "#5b6dff",
  "#14b8d4",
];

export default function Services() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative scroll-mt-16 overflow-hidden px-5 py-28 md:px-10 md:py-44"
    >
      <motion.div
        aria-hidden="true"
        animate={{
          backgroundColor: glows[active],
          x: active % 2 ? "25%" : "-5%",
          y: `${active * 8}%`,
        }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute right-0 top-10 h-[520px] w-[520px] rounded-full opacity-[0.13] blur-[130px]"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <h2
            id="services-title"
            className="display text-[clamp(2.6rem,8vw,8rem)]"
          >
            <SplitWords text="What|we do" />
          </h2>
          <Reveal className="max-w-xs text-white/50">
            <p>Six disciplines, one team. Hover a line to see how we work.</p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-7" onMouseLeave={() => {}}>
            {services.map((sv, i) => {
              const on = i === active;
              return (
                <li
                  key={sv.id}
                  className="border-t border-white/10 last:border-b"
                >
                  <button
                    type="button"
                    onMouseEnter={() =>
                      window.matchMedia("(hover:hover)").matches && setActive(i)
                    }
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="group flex w-full items-baseline gap-4 py-5 text-left md:gap-8 md:py-7"
                  >
                    <span className="mono relative h-5 w-8 shrink-0 overflow-hidden text-xs md:text-sm">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={on ? "on" : "off"}
                          initial={{ y: 18, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -18, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className={`absolute inset-0 ${on ? "text-accent" : "text-white/30"}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span
                      className={`display text-[clamp(1.6rem,4.4vw,4.2rem)] transition-all duration-500 ${on ? "translate-x-3 text-bone md:translate-x-6" : "text-white/25 group-hover:text-white/50"}`}
                    >
                      {sv.title}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-12 md:pl-[4.5rem]">
                          <p className="max-w-md text-white/60">{sv.blurb}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {sv.tags.map((t) => (
                              <span
                                key={t}
                                className="mono rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="mt-5 aspect-[5/4] max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-panel p-3 lg:hidden">
                            <ServiceVisual key={sv.id} id={sv.id} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <aside
            className="relative hidden lg:col-span-5 lg:block"
            aria-live="polite"
          >
            <div className="sticky top-28">
              <div className="glass relative aspect-[5/6] overflow-hidden rounded-3xl p-6">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
                    transition={{ duration: 0.45 }}
                    className="relative h-full"
                  >
                    <ServiceVisual id={s.id} />
                  </motion.div>
                </AnimatePresence>
                <span className="display pointer-events-none absolute bottom-3 right-5 text-[7rem] text-white/[0.06]">
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6">
                <Button to="/#contact" variant="ghost">
                  Discuss {s.title}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
