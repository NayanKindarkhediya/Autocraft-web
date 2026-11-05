import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { useSEO } from "../hooks/useSEO";
import { Reveal, ScrollWords, SplitWords } from "../components/Reveal";
import Button from "../components/Button";
import NotFound from "./NotFound";

function Block({ label, children }) {
  return (
    <Reveal className="border-t border-white/15 pt-6">
      <h2 className="mono mb-5 text-xs uppercase tracking-[0.25em] text-accent">
        {label}
      </h2>
      {children}
    </Reveal>
  );
}

function GalleryImage({ src, alt, className }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className={`overflow-hidden rounded-2xl bg-panel ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
      />
    </motion.div>
  );
}

function Detail({ p, next }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  useSEO({ title: p.title, description: p.description, image: p.image });
  const gallery = (p.gallery || []).filter(Boolean);
  const spans = [
    "md:col-span-7",
    "md:col-span-5 md:mt-24",
    "md:col-span-6 md:col-start-4",
  ];

  return (
    <article>
      <header className="relative overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pt-48">
        <div
          className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1500px]">
          <Link
            to="/#work"
            className="u-link mb-10 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            <ArrowLeft size={16} /> All work
          </Link>
          <p className="mono mb-5 text-sm text-accent">
            {p.category} · {p.year}
          </p>
          <h1 className="display text-[clamp(2.8rem,11vw,12rem)]">
            <SplitWords text={p.title.replace(/ /g, " ")} play stagger={0.1} />
          </h1>
          <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-white/15 pt-8 md:grid-cols-4">
            <div>
              <dt className="mono text-xs text-white/40">Category</dt>
              <dd className="mt-2">{p.category}</dd>
            </div>
            <div>
              <dt className="mono text-xs text-white/40">Year</dt>
              <dd className="mt-2">{p.year}</dd>
            </div>
            <div className="col-span-2">
              <dt className="mono text-xs text-white/40">Technologies</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {(p.technologies || []).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 px-3 py-1 text-sm"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div
        ref={heroRef}
        className="relative mx-5 h-[55vh] overflow-hidden rounded-3xl bg-panel md:mx-10 md:h-[88vh]"
      >
        <motion.img
          style={{ y, scale: 1.25 }}
          src={p.image}
          alt={`${p.title} — main project visual`}
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
        />
      </div>

      <div className="mx-auto max-w-[1500px] space-y-28 px-5 py-28 md:space-y-44 md:px-10 md:py-44">
        {p.overview && (
          <ScrollWords
            text={p.overview}
            className="display max-w-6xl text-[clamp(1.8rem,4.6vw,4.8rem)] normal-case leading-[1.02] tracking-tight"
          />
        )}

        {(p.challenge || p.solution) && (
          <div className="grid gap-14 md:grid-cols-2 md:gap-24">
            {p.challenge && (
              <Block label="The challenge">
                <p className="text-xl leading-relaxed text-white/70 md:text-2xl">
                  {p.challenge}
                </p>
              </Block>
            )}
            {p.solution && (
              <div className="md:mt-24">
                <Block label="The solution">
                  <p className="text-xl leading-relaxed text-white/70 md:text-2xl">
                    {p.solution}
                  </p>
                </Block>
              </div>
            )}
          </div>
        )}

        {p.features?.length > 0 && (
          <section aria-labelledby="features-title">
            <h2
              id="features-title"
              className="display mb-10 text-[clamp(2.4rem,6vw,6rem)]"
            >
              Features
            </h2>
            <ul>
              {p.features.map((f, i) => (
                <Reveal
                  as="li"
                  key={f}
                  className="group flex items-baseline gap-6 border-t border-white/10 py-6 last:border-b md:py-8"
                >
                  <span className="mono text-sm text-white/30 transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-[clamp(1.4rem,3.2vw,3.2rem)] normal-case tracking-tight transition-transform duration-500 group-hover:translate-x-4">
                    {f}
                  </span>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {gallery.length > 0 && (
          <section aria-label="Gallery" className="grid gap-5 md:grid-cols-12">
            {gallery.map((g, i) => (
              <GalleryImage
                key={g + i}
                src={g}
                alt={`${p.title} gallery image ${i + 1}`}
                className={`aspect-[16/10] ${spans[i % spans.length]}`}
              />
            ))}
          </section>
        )}

        {p.results?.length > 0 && (
          <section aria-labelledby="results-title">
            <h2
              id="results-title"
              className="display outline-text mb-10 text-[clamp(2.4rem,6vw,6rem)]"
            >
              Results
            </h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {p.results.map((r, i) => (
                <Reveal
                  as="li"
                  key={r}
                  delay={i * 0.08}
                  className="glass rounded-2xl p-7"
                >
                  <span className="mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-lg leading-snug">{r}</p>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {p.liveUrl && (
          <div className="flex justify-center">
            <Button href={p.liveUrl} variant="light">
              Visit Live Website
            </Button>
          </div>
        )}
      </div>

      {next && (
        <Link
          to={`/work/${next.slug}`}
          data-cursor="project"
          className="group relative block overflow-hidden border-t border-white/10 px-5 py-28 md:px-10 md:py-44"
          aria-label={`Next project: ${next.title}`}
        >
          <img
            src={next.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-20 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/80" />
          <div className="relative mx-auto max-w-[1500px]">
            <p className="mono mb-5 text-sm text-white/50">Next project</p>
            <p className="display flex items-center justify-between gap-6 text-[clamp(2.4rem,9vw,9rem)] transition-transform duration-700 group-hover:translate-x-4">
              {next.title}
              <ArrowUpRight
                className="hidden shrink-0 text-accent md:block"
                size={96}
                strokeWidth={1.2}
              />
            </p>
          </div>
        </Link>
      )}
    </article>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects, loading } = useProjects();
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    if (loading)
      return (
        <div className="flex min-h-screen items-center justify-center">
          <span className="mono text-sm text-white/40">Loading project…</span>
        </div>
      );
    return <NotFound />;
  }
  const next =
    projects.length > 1 ? projects[(idx + 1) % projects.length] : null;
  return <Detail key={slug} p={projects[idx]} next={next} />;
}
