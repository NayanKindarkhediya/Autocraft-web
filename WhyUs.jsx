import { motion } from "framer-motion";
import { principles } from "../../data/site";
import { ScrollWords } from "../Reveal";

export default function WhyUs() {
  return (
    <section
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-coal px-5 py-28 md:px-10 md:py-44"
    >
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <h2 id="why-title" className="sr-only">
          Why AutoCraft
        </h2>
        <ScrollWords
          text="GOOD DESIGN GETS ATTENTION. GREAT DIGITAL EXPERIENCES GET REMEMBERED."
          className="display max-w-6xl text-[clamp(2.2rem,6.6vw,7rem)] leading-[0.95]"
        />
        <ol className="mt-20 grid gap-x-16 gap-y-14 md:mt-32 md:grid-cols-2">
          {principles.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
              className={i % 2 ? "md:mt-24" : ""}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="mb-6 h-px origin-left bg-gradient-to-r from-accent to-transparent"
              />
              <div className="flex items-baseline gap-5">
                <span className="mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display text-[clamp(2rem,4vw,3.8rem)]">
                  {p.title}
                </h3>
              </div>
              <p className="mt-4 max-w-sm pl-0 text-lg text-white/55 md:pl-[3.2rem]">
                {p.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
