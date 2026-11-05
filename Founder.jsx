import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { founder, site } from "../../data/site";
import { Reveal, SplitWords } from "../Reveal";

export default function Founder() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const ring = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  return (
    <section
      ref={ref}
      aria-labelledby="founder-title"
      className="relative overflow-hidden px-5 py-28 md:px-10 md:py-44"
    >
      <div
        className="pointer-events-none absolute left-[-10%] top-1/4 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[130px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <motion.div
            style={{ rotate: ring }}
            className="absolute -inset-6 rounded-full border border-dashed border-accent/30"
            aria-hidden="true"
          />
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-coal"
          >
            <motion.img
              style={{ y, scale: 1.12 }}
              src={site.founderImage}
              alt={`Portrait of ${founder.name}, ${founder.role}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
              <div>
                <p className="display text-2xl">{founder.name}</p>
                <p className="mono mt-1 text-xs text-white/60">
                  {founder.role}
                </p>
              </div>
              <span className="glass rounded-full px-3 py-1 text-[11px]">
                Founder
              </span>
            </div>
          </motion.div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2
            id="founder-title"
            className="mono mb-8 text-sm uppercase tracking-[0.25em] text-white/50"
          >
            Meet the founder
          </h2>
          <blockquote>
            <SplitWords
              as="p"
              stagger={0.045}
              text="“I believe a website should do more than exist online. It should make people stop, explore and remember the brand.”"
              className="display text-[clamp(1.9rem,4.2vw,4.2rem)] normal-case leading-[1.02] tracking-tight"
            />
          </blockquote>
          <Reveal delay={0.2} className="mt-10 flex items-center gap-4">
            <span className="h-px w-14 bg-accent" />
            <p className="text-white/60">
              <span className="font-semibold text-bone">{founder.name}</span> —{" "}
              {founder.role}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
