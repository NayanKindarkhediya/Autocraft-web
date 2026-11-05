import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { navLinks, site } from '../data/site';
import HashLink from './HashLink';
import Magnetic from './Magnetic';
import Button from './Button';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [open]);

  const socials = site.socials.filter((s) => s.url);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? 'border-b border-white/[0.06] bg-ink/70 py-3 backdrop-blur-xl' : 'py-5 md:py-7'}`}>
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-10" aria-label="Main">
          <HashLink to="/" aria-label="AutoCraft Web — home" className="relative z-[60]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo className="h-5 w-auto md:h-6" />
          </HashLink>

          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((l) => (
              <li key={l.hash}>
                <Magnetic strength={0.4}><HashLink to={`/#${l.hash}`} className="u-link px-1 py-2 text-sm text-bone/80 transition-colors hover:text-white">{l.label}</HashLink></Magnetic>
              </li>
            ))}
            <li><Button to="/#contact" variant="ghost" className="!px-5 !py-2.5">Let&apos;s Build</Button></li>
          </ul>

          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 md:hidden">
            <span className="relative block h-3 w-5">
              <motion.span animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }} className="absolute left-0 top-0 h-px w-5 bg-bone" />
              <motion.span animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} className="absolute bottom-0 left-0 h-px w-5 bg-bone" />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile: full-screen takeover, designed separately from desktop */}
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-8 pt-28 md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }} animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <div className="absolute inset-0 grid-bg opacity-30 [mask-image:linear-gradient(#000,transparent_70%)]" />
            <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-accent/25 blur-[90px]" />
            <ul className="relative flex flex-1 flex-col justify-center gap-2">
              {navLinks.map((l, i) => (
                <motion.li key={l.hash} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.6 }}>
                  <HashLink to={`/#${l.hash}`} className="display flex items-baseline justify-between border-b border-white/10 py-4 text-[13vw] sm:text-7xl">
                    {l.label}<ArrowUpRight className="text-accent" size={32} />
                  </HashLink>
                </motion.li>
              ))}
            </ul>
            <motion.div className="relative space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <Button to="/#contact" className="w-full justify-center" magnetic={false}>Start a Project</Button>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
                {site.contact.email && <a className="u-link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>}
                {socials.map((s) => <a key={s.label} className="u-link" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
