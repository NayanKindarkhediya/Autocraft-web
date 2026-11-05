// Showcase projects (3). Images live in /public/images/projects as <name>-1.jpg (desktop home), -2.jpg (inner page), -3.jpg (mobile).
// To use real client screenshots, replace those files (same names) or edit the paths below.
// Admin → Projects overrides this list once the database has projects (run `npm run seed:projects` to import these).
const img = (n) => [1, 2, 3].map((i) => `/images/projects/${n}-${i}.jpg`);

export const projects = [
  {
    title: "Premium Fashion Store",
    slug: "premium-fashion-store",
    category: "E-commerce",
    year: "2026",
    featured: true,
    description:
      "An editorial storefront where product photography leads and checkout stays out of the way.",
    image: img("fashion")[0],
    gallery: img("fashion").slice(1),
    technologies: ["React", "Node.js", "MongoDB", "Framer Motion"],
    liveUrl: "",
    overview:
      "A concept storefront for a premium fashion label, designed like a magazine and engineered like a store.",
    challenge:
      "Fashion shoppers expect a gallery, but slow image-heavy pages lose sales.",
    solution:
      "Oversized typography, lazy-loaded imagery and a compact checkout flow keep the page expressive and fast.",
    features: [
      "Editorial collection pages",
      "Quick-view product drawer",
      "Wishlist and cart",
      "Admin-managed catalogue",
    ],
    results: [
      "Image-first layout that stays light on mobile",
      "Checkout shortened to the essential steps",
      "Catalogue editable without a developer",
    ],
  },
  {
    title: "Corporate Website",
    slug: "corporate-website",
    category: "Business Website",
    year: "2026",
    featured: true,
    description:
      "A confident company site that explains the business in seconds and earns trust.",
    image: img("corporate")[0],
    gallery: img("corporate").slice(1),
    technologies: ["React", "Tailwind", "Express"],
    liveUrl: "",
    overview:
      "A concept site for a professional-services firm that needed clarity over decoration.",
    challenge:
      "Complex services were buried in jargon, so visitors left before reaching the contact page.",
    solution:
      "A clear structure, plain language and a persistent enquiry path guide visitors from first view to first message.",
    features: [
      "Service breakdown pages",
      "Enquiry form saved to a database",
      "Case-study templates",
      "SEO-ready structure",
    ],
    results: [
      "Services understood within the first screen",
      "Enquiries land in one dashboard",
      "Content updates handled in minutes",
    ],
  },
  {
    title: "AI Web Application",
    slug: "ai-web-application",
    category: "AI Solutions",
    year: "2026",
    featured: true,
    description:
      "A conversational workspace that turns scattered knowledge into answers.",
    image: img("ai")[0],
    gallery: img("ai").slice(1),
    technologies: ["React", "Node.js", "MongoDB", "AI"],
    liveUrl: "",
    overview:
      "A concept chat-and-search product that connects an AI assistant to a team’s own content.",
    challenge:
      "Generic chatbots feel disconnected from the work people actually do.",
    solution:
      "A focused interface, saved conversations and a clear view of where each answer came from.",
    features: [
      "Streaming responses",
      "Saved conversation history",
      "Knowledge-source view",
      "Secure sign-in",
    ],
    results: [
      "Conversations that stay on topic",
      "Answers traceable to their source",
      "A calm interface for heavy use",
    ],
  },
];
