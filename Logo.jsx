import { useState } from 'react';
import { site } from '../data/site';

// Swap /public/images/logo-text.png or logo.png to change the logo. Falls back to text if the file is missing.
export default function Logo({ variant = 'text', className = 'h-6' }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="font-display text-lg font-extrabold tracking-tight">
        AutoCraft <span className="text-accent">Web</span>
      </span>
    );
  }
  return <img src={variant === 'badge' ? site.logo : site.logoText} alt="AutoCraft Web" className={className} onError={() => setFailed(true)} draggable="false" />;
}
