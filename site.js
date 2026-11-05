// ─────────────────────────────────────────────────────────────
// Central, editable site content. Change text/links/images here.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: 'AutoCraft Web',
  // Logo files live in /public/images. Replace the files (same names) and nothing else changes.
  logo: '/images/logo.png', // round badge (favicon, preloader, footer)
  logoText: '/images/logo-text.png', // wordmark used in the navbar (falls back to text if missing)
  founderImage: '/images/founder.png',
  tagline: 'Websites, web apps and digital experiences crafted to make brands impossible to ignore.',
  availability: 'Open for new projects',
  contact: {
    email: '', // e.g. 'hello@yourdomain.com' — hidden while empty
    phone: '',
  },
  // Add your profile URLs. Empty entries are hidden automatically.
  socials: [
    { label: 'Instagram', url: '' },
    { label: 'LinkedIn', url: '' },
    { label: 'GitHub', url: '' },
    { label: 'X', url: '' },
  ],
};

export const founder = {
  name: 'Nayan Kindarkhediya',
  role: 'Founder & Web Developer',
  quote: 'I believe a website should do more than exist online. It should make people stop, explore and remember the brand.',
};

export const navLinks = [
  { label: 'Work', hash: 'work' },
  { label: 'Services', hash: 'services' },
  { label: 'About', hash: 'about' },
  { label: 'Contact', hash: 'contact' },
];

export const services = [
  { id: 'web', title: 'Website Development', blurb: 'Fast, responsive sites with motion and personality, built on clean code.', tags: ['React', 'Next.js', 'Tailwind'] },
  { id: 'app', title: 'Web Applications', blurb: 'Dashboards, portals and platforms with real authentication and real data.', tags: ['Node.js', 'MongoDB', 'REST APIs'] },
  { id: 'ux', title: 'UI / UX Design', blurb: 'Interfaces that look premium and feel obvious to use.', tags: ['Figma', 'Prototyping', 'Design systems'] },
  { id: 'shop', title: 'E-commerce', blurb: 'Storefronts and checkouts designed to turn browsing into buying.', tags: ['Storefronts', 'Payments', 'Inventory'] },
  { id: 'ai', title: 'AI Solutions', blurb: 'Practical AI features woven into your product, not bolted on.', tags: ['Chat', 'Automation', 'Search'] },
  { id: 'soft', title: 'Custom Software', blurb: 'Tools shaped around how your business actually works.', tags: ['Workflows', 'Integrations', 'Admin tools'] },
];

export const principles = [
  { title: 'Strategy', text: 'We understand the business before writing the code.' },
  { title: 'Design', text: 'Interfaces that look premium and feel natural.' },
  { title: 'Technology', text: 'Modern, scalable and reliable development.' },
  { title: 'Experience', text: 'Every interaction has a purpose.' },
];

export const process = [
  { title: 'Discover', text: 'We learn your brand, audience and goals, then agree what success looks like.', items: ['Goals & audience', 'Content & scope', 'Technical plan'] },
  { title: 'Design', text: 'Layouts, motion and interface details take shape in a clickable prototype.', items: ['Visual direction', 'Prototype', 'Your feedback'] },
  { title: 'Build', text: 'Clean, tested code with a backend that does real work from day one.', items: ['Frontend & backend', 'CMS & admin', 'Performance'] },
  { title: 'Launch', text: 'We deploy, check every detail and stay close while you go live.', items: ['Deployment', 'QA on devices', 'Handover'] },
];

export const technologies = ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'Tailwind', 'Figma', 'AI'];

export const aboutStats = [
  // `value: null` is replaced with the live project count. Edit the others freely.
  { label: 'Projects', value: null },
  { label: 'Technologies', value: technologies.length },
  { label: 'Services', value: services.length },
];

// Shown until you add real testimonials in the admin dashboard.
export const demoTestimonials = [
  { _id: 'demo-1', demo: true, name: 'Sample Client', role: 'Founder', company: 'Sample Brand', rating: 5, message: 'Replace this sample testimonial from the admin dashboard with feedback from a real client.' },
  { _id: 'demo-2', demo: true, name: 'Sample Client', role: 'Marketing Lead', company: 'Sample Studio', rating: 5, message: 'Add real quotes under Admin → Testimonials. Once one exists, these samples disappear.' },
  { _id: 'demo-3', demo: true, name: 'Sample Client', role: 'Owner', company: 'Sample Store', rating: 5, message: 'Names, roles, companies, ratings and photos are all editable.' },
];

export const budgets = ['Not sure yet', 'Under ₹50,000', '₹50,000 – ₹1,50,000', '₹1,50,000 – ₹5,00,000', '₹5,00,000+'];
