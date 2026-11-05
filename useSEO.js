import { useEffect } from 'react';

const setMeta = (selector, attr, value, create) => {
  let el = document.head.querySelector(selector);
  if (!el && create) { el = document.createElement('meta'); el.setAttribute(create[0], create[1]); document.head.appendChild(el); }
  if (el) el.setAttribute(attr, value);
};

export function useSEO({ title, description, image }) {
  useEffect(() => {
    const full = title ? `${title} — AutoCraft Web` : 'AutoCraft Web — Websites, Web Apps & Digital Experiences';
    document.title = full;
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description, ['property', 'og:description']);
    }
    setMeta('meta[property="og:title"]', 'content', full, ['property', 'og:title']);
    if (image) setMeta('meta[property="og:image"]', 'content', image, ['property', 'og:image']);
  }, [title, description, image]);
}
