import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { technologies } from '../../data/site';
import { SplitWords } from '../Reveal';

const spots = [[6, 14], [30, 6], [58, 12], [80, 20], [14, 46], [42, 38], [70, 50], [24, 76], [54, 70], [82, 80]];
const sizes = ['text-3xl md:text-5xl', 'text-2xl md:text-4xl', 'text-4xl md:text-6xl'];

function Chip({ label, i, mx, my }) {
  const depth = 18 + (i % 4) * 14;
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth]);
  const [l, t] = spots[i % spots.length];
  return (
    <motion.div style={{ x, y, left: `${l}%`, top: `${t}%` }} className="absolute hidden md:block">
      <motion.span animate={{ y: [0, i % 2 ? -16 : 16, 0] }} transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: 'easeInOut' }} whileHover={{ scale: 1.12 }}
        className={`display group inline-block cursor-default rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 normal-case text-white/70 backdrop-blur transition-colors hover:border-accent hover:bg-accent/15 hover:text-white hover:shadow-[0_0_50px_-10px_#1a7bff] ${sizes[i % 3]}`}>{label}</motion.span>
    </motion.div>
  );
}

export default function TechWall() {
  const ref = useRef(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const move = (e) => { const r = ref.current.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); };
  return (
    <section ref={ref} onMouseMove={move} aria-labelledby="tech-title" className="relative overflow-hidden bg-coal px-5 py-28 md:px-10 md:py-40">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(circle_at_center,#000,transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1500px]">
        <h2 id="tech-title" className="display text-[clamp(2.4rem,7vw,7rem)]"><SplitWords text="Tools we|build with" /></h2>
        <div className="relative mt-12 md:h-[560px]">
          <ul className="flex flex-wrap gap-3 md:hidden">
            {technologies.map((t, i) => (
              <motion.li key={t} animate={{ y: [0, i % 2 ? -6 : 6, 0] }} transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut' }}
                className="display rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xl normal-case">{t}</motion.li>
            ))}
          </ul>
          <ul className="hidden md:block" aria-label="Technologies">
            {technologies.map((t, i) => <li key={t}><Chip label={t} i={i} mx={mx} my={my} /></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
