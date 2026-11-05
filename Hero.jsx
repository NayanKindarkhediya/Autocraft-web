import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Button from "../Button";
import { SplitWords } from "../Reveal";
import Particles from "../Particles";
import { useProjects } from "../../hooks/useProjects";
import { site } from "../../data/site";

const labels = [
  { t: "React", cls: "right-[33%] top-[22%]", d: 14 },
  { t: "Node.js", cls: "right-[20%] top-[11%]", d: -18 },
  { t: "MongoDB", cls: "right-[30%] top-[46%]", d: 22 },
  { t: "AI", cls: "right-[31%] top-[64%]", d: -12 },
];

function Parallax({ mx, my, depth, className = "", style, children }) {
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth]);
  return (
    <motion.div style={{ x, y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Hero({ loaded }) {
  const sec = useRef(null);
  const { projects } = useProjects();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotY = useTransform(smx, [-0.5, 0.5], [-22, 22]);
  const rotX = useTransform(smy, [-0.5, 0.5], [68, 52]);
  const gx = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const gy = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });

  const onMove = (e) => {
    const r = sec.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    mx.set(px / r.width - 0.5);
    my.set(py / r.height - 0.5);
    gx.set(px - 300);
    gy.set(py - 300);
    sec.current.style.setProperty("--mx", `${px}px`);
    sec.current.style.setProperty("--my", `${py}px`);
  };
  const cards = projects.slice(0, 3);

  return (
    <section
      ref={sec}
      onMouseMove={onMove}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-8 pt-32 md:px-10 md:pb-10"
    >
      {/* backdrop layers */}
      <div
        className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_60%_40%,#000,transparent_75%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg-lit" aria-hidden="true" />
      <Particles className="opacity-70" />
      <motion.div
        aria-hidden="true"
        style={{ x: gx, y: gy }}
        className="pointer-events-none absolute left-0 top-0 hidden h-[600px] w-[600px] rounded-full bg-accent/20 blur-[120px] md:block"
      />
      <div
        className="pointer-events-none absolute -right-32 -top-20 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[110px] md:hidden"
        aria-hidden="true"
      />

      {/* abstract CSS 3D rings */}
      <div
        className="pointer-events-none absolute right-[-18%] top-[10%] opacity-60 [perspective:1100px] md:right-[4%] md:top-[12%] md:opacity-90"
        aria-hidden="true"
      >
        <motion.div
          style={{ rotateX: rotX, rotateY: rotY }}
          className="relative h-[300px] w-[300px] [transform-style:preserve-3d] md:h-[520px] md:w-[520px]"
        >
          {[1, 0.78, 0.56, 0.34].map((s, i) => (
            <motion.div
              key={s}
              animate={{ rotateZ: i % 2 ? -360 : 360 }}
              transition={{
                duration: 26 + i * 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border border-accent/40"
              style={{
                transform: `scale(${s}) translateZ(${i * 18}px)`,
                borderStyle: i === 2 ? "dashed" : "solid",
                borderColor: i === 3 ? "rgba(90,162,255,.7)" : undefined,
              }}
            />
          ))}
          <div className="absolute inset-[38%] rounded-full bg-accent/70 blur-3xl" />
          <div className="absolute inset-[44%] rounded-full bg-gradient-to-br from-white to-accent shadow-[0_0_80px_20px_rgba(26,123,255,.55)]" />
        </motion.div>
      </div>

      {/* floating project cards (large screens) */}
      {cards.map((p, i) => (
        <Parallax
          key={p.slug}
          mx={smx}
          my={smy}
          depth={[22, -28, 34][i]}
          className={`absolute hidden lg:block ${["right-[3%] top-[16%]", "right-[15%] top-[38%]", "right-[4%] top-[56%]"][i]}`}
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="glass w-48 rounded-2xl p-2 shadow-2xl"
          >
            <img
              src={p.image}
              alt=""
              loading="lazy"
              className="aspect-[16/10] w-full rounded-xl object-cover"
            />
            <div className="px-2 py-2">
              <span className="block truncate text-[11px] font-medium">
                {p.title}
              </span>
            </div>
          </motion.div>
        </Parallax>
      ))}
      {/* floating tech labels */}
      {labels.map((l) => (
        <Parallax
          key={l.t}
          mx={smx}
          my={smy}
          depth={l.d}
          className={`absolute hidden md:block ${l.cls}`}
        >
          <span className="mono animate-float rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/70 backdrop-blur">
            {l.t}
          </span>
        </Parallax>
      ))}

      {/* headline */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <h1
          id="hero-title"
          className="display text-[clamp(2.3rem,6.7vw,7.6rem)]"
        >
          <SplitWords
            text="We don't just|build websites."
            play={loaded}
            delay={0.1}
            className="block text-bone"
          />
          <SplitWords
            text="We build digital|experiences."
            play={loaded}
            delay={0.45}
            className="block text-accent [filter:drop-shadow(0_0_34px_rgba(26,123,255,.4))]"
          />
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="max-w-md text-base leading-relaxed text-white/60 md:text-lg"
          >
            {site.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button to="/#contact">Start a Project</Button>
            <Button to="/#work" variant="ghost" arrow="down">
              Explore Our Work
            </Button>
          </motion.div>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/40 md:mt-14">
          <span className="mono flex items-center gap-3">
            <span className="relative block h-8 w-px overflow-hidden bg-white/15">
              <motion.span
                animate={{ y: ["-100%", "100%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-accent"
              />
            </span>
            Scroll
          </span>
          <span className="flex items-center gap-2">
            <span
              className="h-2 w-2 animate-pulseDot rounded-full bg-emerald-400"
              aria-hidden="true"
            />
            {site.availability}
          </span>
        </div>
      </div>
    </section>
  );
}
