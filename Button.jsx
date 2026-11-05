import { ArrowRight, ArrowDownRight } from 'lucide-react';
import HashLink from './HashLink';
import Magnetic from './Magnetic';

const base = 'group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-transform duration-300 active:scale-95 disabled:opacity-60 disabled:pointer-events-none';
const variants = {
  primary: 'bg-accent text-white shadow-[0_0_40px_-8px_rgba(26,123,255,.8)] hover:scale-[1.03]',
  ghost: 'border border-white/20 text-bone hover:scale-[1.03] hover:border-white/40',
  light: 'bg-bone text-ink hover:scale-[1.03]',
};
const fills = { primary: 'bg-bone', ghost: 'bg-accent', light: 'bg-accent' };
const hoverText = { primary: 'group-hover:text-ink', ghost: 'group-hover:text-white', light: 'group-hover:text-white' };

export default function Button({ to, href, onClick, type = 'button', variant = 'primary', arrow = 'right', magnetic = true, disabled, className = '', children, ...rest }) {
  const Icon = arrow === 'down' ? ArrowDownRight : ArrowRight;
  const inner = (
    <>
      <span className={`absolute inset-0 translate-y-full rounded-[inherit] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-y-0 ${fills[variant]}`} aria-hidden="true" />
      <span className={`relative z-10 flex items-center gap-3 transition-colors duration-300 ${hoverText[variant]}`}>
        {children}
        <Icon size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </>
  );
  const cls = `${base} ${variants[variant]} ${className}`;
  let el;
  if (to) el = <HashLink to={to} className={cls} onClick={onClick} {...rest}>{inner}</HashLink>;
  else if (href) el = <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{inner}</a>;
  else el = <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>{inner}</button>;
  return magnetic ? <Magnetic strength={0.25}>{el}</Magnetic> : el;
}
