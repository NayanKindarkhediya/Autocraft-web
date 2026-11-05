import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { api } from "../../services/api";
import { demoTestimonials } from "../../data/site";
import { SplitWords } from "../Reveal";

const slide = {
  enter: (dir) => ({
    opacity: 0,
    x: dir * 160,
    rotateY: dir * -35,
    scale: 0.85,
    filter: "blur(10px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir * -160,
    rotateY: dir * 35,
    scale: 0.85,
    filter: "blur(10px)",
    transition: { duration: 0.5, ease: [0.64, 0, 0.78, 0] },
  }),
};

const rise = {
  enter: { opacity: 0, y: 28 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function Testimonials() {
  const [items, setItems] = useState(demoTestimonials);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const ctl = new AbortController();
    api.testimonials
      .listPublic(ctl.signal)
      .then((d) => {
        if (Array.isArray(d) && d.length) setItems(d);
      })
      .catch(() => {});
    return () => ctl.abort();
  }, []);

  const go = useCallback(
    (n) => {
      setDir(n);
      setI((c) => (c + n + items.length) % items.length);
    },
    [items.length],
  );
  useEffect(() => {
    if (paused || items.length < 2) return undefined;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused, go, items.length]);

  const t = items[i % items.length];
  return (
    <section
      aria-labelledby="testi-title"
      className="relative px-5 py-28 md:px-10 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          id="testi-title"
          className="mono mb-10 text-sm uppercase tracking-[0.25em] text-white/50"
        >
          <SplitWords text="Kind words" />
        </h2>
        <div
          className="relative min-h-[320px] md:min-h-[300px]"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={t._id || i}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: "preserve-3d" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <motion.div
                variants={rise}
                className="mb-6 flex gap-1"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating || 5 }).map((_, k) => (
                  <Star key={k} size={16} className="fill-accent text-accent" />
                ))}
              </motion.div>
              <motion.blockquote
                variants={rise}
                className="display text-[clamp(1.6rem,3.8vw,3.6rem)] normal-case leading-[1.08] tracking-tight"
              >
                “{t.message}”
              </motion.blockquote>
              <motion.figcaption
                variants={rise}
                className="mt-8 flex items-center gap-4"
              >
                {t.image ? (
                  <img
                    src={t.image}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 font-display font-bold text-accent">
                    {t.name?.[0]}
                  </span>
                )}
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-white/50">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </p>
                </div>
                {t.demo && (
                  <span className="mono ml-auto rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/40">
                    SAMPLE — EDIT IN ADMIN
                  </span>
                )}
              </motion.figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        {items.length > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <div
              className="flex gap-2"
              role="tablist"
              aria-label="Testimonials"
            >
              {items.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={k === i}
                  aria-label={`Show testimonial ${k + 1}`}
                  onClick={() => {
                    setDir(k > i ? 1 : -1);
                    setI(k);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-accent" : "w-3 bg-white/20"}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-ink"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-ink"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
