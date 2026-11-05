import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import Button from '../components/Button';

export default function NotFound() {
  useSEO({ title: '404 — Page not found' });
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(circle_at_center,#000,transparent_65%)]" aria-hidden="true" />
      <motion.h1 initial={{ opacity: 0, scale: 0.8, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.1, 1] }}
        className="display outline-accent relative text-[34vw] leading-none md:text-[26vw]">404</motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative -mt-2 max-w-md text-xl text-white/70 md:text-2xl">Looks like this page took a wrong turn.</motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="relative mt-10"><Button to="/">Back Home</Button></motion.div>
    </section>
  );
}
