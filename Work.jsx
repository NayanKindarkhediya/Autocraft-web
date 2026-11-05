import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useProjects } from "../../hooks/useProjects";
import { SplitWords, Reveal } from "../Reveal";

// Editorial layout: each project gets its own size, position and image mask.
const layouts = [
  {
    wrap: "lg:col-span-10 lg:col-start-1",
    aspect: "aspect-[16/10]",
    mask: "rounded-3xl",
    meta: "lg:flex-row lg:items-end lg:justify-between",
  },
  {
    wrap: "lg:col-span-8 lg:col-start-5 lg:mt-24",
    aspect: "aspect-[16/10]",
    mask: "rounded-3xl",
    meta: "",
  },
  {
    wrap: "lg:col-span-8 lg:col-start-1 lg:mt-10",
    aspect: "aspect-[16/10]",
    mask: "rounded-3xl",
    meta: "",
  },
];

function ProjectCard({ p, i }) {
  const L = layouts[i % layouts.length];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const num = String(i + 1).padStart(2, "0");
  return (
    <motion.article
      ref={ref}
      className={`${L.wrap} max-lg:w-[90%] max-lg:even:ml-auto`}
    >
      <Link
        to={`/work/${p.slug}`}
        data-cursor="project"
        aria-label={`View project: ${p.title}`}
        className="group block"
      >
        <div
          className={`relative overflow-hidden bg-panel ${L.aspect} ${L.mask}`}
        >
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            <motion.div style={{ y, scale: 1.2 }} className="absolute inset-0">
              <img
                src={p.image}
                alt={`${p.title} — ${p.category} project preview`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-30" />
          </motion.div>
          <span className="mono absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-[11px] backdrop-blur">
            {p.year}
          </span>
        </div>
        <div className={`mt-5 flex flex-col gap-4 ${L.meta}`}>
          <div>
            <div className="mono mb-2 flex items-center gap-3 text-xs text-white/50">
              <span className="text-accent">{num}</span>
              <span>{p.category}</span>
            </div>
            <h3 className="display text-[clamp(1.7rem,3.6vw,3.6rem)] transition-colors group-hover:text-accent">
              {p.title}
            </h3>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-white/55">
              {p.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {(p.technologies || []).slice(0, 4).map((t) => (
                <span key={t} className="mono text-[11px] text-white/40">
                  {t}
                </span>
              ))}
            </div>
            <span className="u-link mt-4 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium">
              View Project <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Work() {
  const { projects } = useProjects();
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative scroll-mt-16 px-5 py-28 md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 flex items-end justify-between gap-6 md:mb-28">
          <h2 id="work-title" className="display text-[clamp(2.6rem,9vw,9rem)]">
            <SplitWords text="Selected|work" />
          </h2>
          <Reveal className="mono pb-3 text-sm text-white/40">
            ({String(projects.length).padStart(2, "0")})
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-20 lg:grid-cols-12 lg:gap-y-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
