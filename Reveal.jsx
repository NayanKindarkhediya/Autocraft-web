import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.2, 0.7, 0.1, 1];

// Soft blur-to-sharp reveal for blocks.
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} initial={{ opacity: 0, y, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.9, delay, ease: EASE }}>
      {children}
    </Tag>
  );
}

// Masked word-by-word headline reveal. Use `|` for explicit line breaks. Pass `play` to control manually (hero).
export function SplitWords({ text, className = '', delay = 0, stagger = 0.07, play, as: Tag = 'span' }) {
  const lines = text.split('|');
  let idx = 0;
  const trigger = play === undefined
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
    : { initial: 'hidden', animate: play ? 'show' : 'hidden' };
  return (
    <Tag className={className} aria-label={text.replace(/\|/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.trim().split(' ').map((w) => {
            const i = idx++;
            return (
              <span key={`${li}-${i}`} className="mr-[0.22em] inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                <motion.span className="inline-block" {...trigger}
                  variants={{ hidden: { y: '115%' }, show: { y: 0, transition: { duration: 1, delay: delay + i * stagger, ease: EASE } } }}>
                  {w}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{word}</motion.span>;
}

// Words light up as the section scrolls through.
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
    </p>
  );
}
