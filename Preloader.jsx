import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Preloader({ onDone }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const total = 1700;
    let raf; let timer;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / total);
      setP(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else timer = setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [onDone]);

  return (
    <motion.div role="status" aria-label="Loading" className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink"
      initial={{ clipPath: 'inset(0 0 0 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}>
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(circle_at_center,#000,transparent_65%)]" />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative flex flex-col items-center px-6 text-center">
        <Logo variant="badge" className="mb-8 h-20 w-20 rounded-full" />
        <h1 className="display text-3xl sm:text-5xl">AutoCraft <span className="text-accent">Web</span></h1>
        <p className="mono mt-4 text-[11px] uppercase tracking-[0.3em] text-white/50">Building digital experiences...</p>
        <div className="mt-10 h-px w-56 overflow-hidden bg-white/10 sm:w-72"><div className="h-full bg-accent shadow-[0_0_12px_#1a7bff]" style={{ width: `${p}%` }} /></div>
        <span className="mono mt-3 text-xs tabular-nums text-white/40">{String(p).padStart(3, '0')}</span>
      </motion.div>
    </motion.div>
  );
}
