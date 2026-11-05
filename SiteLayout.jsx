import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import Preloader from '../components/Preloader';

const seen = () => { try { return sessionStorage.getItem('acw_loaded') === '1'; } catch { return false; } };

export default function SiteLayout() {
  const { pathname, hash } = useLocation();
  const [loaded, setLoaded] = useState(seen);
  const [navs, setNavs] = useState(0);
  const prev = useRef(pathname);
  const outlet = useOutlet({ loaded });

  const done = useCallback(() => {
    try { sessionStorage.setItem('acw_loaded', '1'); } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return undefined;
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 500);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash, loaded]);
  useEffect(() => {
    if (prev.current !== pathname) { prev.current = pathname; setNavs((n) => n + 1); }
  }, [pathname]);

  return (
    <div className="grain relative min-h-screen">
      <Cursor />
      <AnimatePresence>{!loaded && <Preloader onDone={done} />}</AnimatePresence>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main key={pathname} id="top" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.25 } }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }}>
          {outlet}
        </motion.main>
      </AnimatePresence>
      {navs > 0 && (
        <motion.div key={`curtain-${navs}`} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] origin-top bg-accent"
          initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }} style={{ transformOrigin: 'top' }} />
      )}
      <Footer />
    </div>
  );
}
