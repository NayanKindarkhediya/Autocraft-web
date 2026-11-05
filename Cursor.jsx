import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsFinePointer } from '../hooks/useMedia';

// Subtle custom cursor: dot → circle on links → "VIEW PROJECT" on [data-cursor="project"]. Fine pointers only.
export default function Cursor() {
  const fine = useIsFinePointer();
  const [mode, setMode] = useState('idle');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (!fine) return undefined;
    document.documentElement.classList.add('has-cursor');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
      const t = e.target instanceof Element ? e.target : null;
      if (t?.closest('[data-cursor="project"]')) setMode('project');
      else if (t?.closest('a,button,[role="button"],input,textarea,select,label')) setMode('link');
      else setMode('idle');
    };
    const leave = () => setMode('hidden');
    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;
  const size = mode === 'project' ? 108 : mode === 'link' ? 52 : 8;
  return (
    <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block">
      <motion.div animate={{ width: size, height: size, opacity: mode === 'hidden' ? 0 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full ${mode === 'project' ? 'bg-accent text-white' : mode === 'link' ? 'border border-white/70 bg-white/5 backdrop-blur-[1px]' : 'bg-white'}`}>
        {mode === 'project' && <span className="mono text-[10px] font-medium leading-tight tracking-wider">VIEW<br />PROJECT →</span>}
      </motion.div>
    </motion.div>
  );
}
