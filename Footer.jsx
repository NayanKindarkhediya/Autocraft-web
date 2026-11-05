import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navLinks, site } from '../data/site';
import HashLink from './HashLink';
import Magnetic from './Magnetic';
import Logo from './Logo';

export default function Footer() {
  const socials = site.socials.filter((s) => s.url);
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink px-5 pb-8 pt-16 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="badge" className="mb-5 h-14 w-14 rounded-full" />
            <p className="text-sm leading-relaxed text-white/55">{site.tagline}</p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {navLinks.map((l) => <li key={l.hash}><HashLink to={`/#${l.hash}`} className="u-link text-white/75 hover:text-white">{l.label}</HashLink></li>)}
            {socials.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="u-link text-white/75 hover:text-white">{s.label}</a></li>)}
          </ul>
          <Magnetic><button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-accent hover:bg-accent"><ArrowUp size={20} /></button></Magnetic>
        </div>
        <p aria-hidden="true" className="display outline-text mt-14 select-none whitespace-nowrap text-center text-[15.5vw] leading-[0.85] opacity-60">AutoCraft Web</p>
        <div className="mt-8 flex flex-col gap-3 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} AutoCraft Web. All rights reserved.</span>
          <Link to="/admin/login" className="u-link w-fit hover:text-white/70">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
