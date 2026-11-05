# AutoCraft Web

> Websites, web apps and digital experiences crafted to make brands impossible to ignore.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/status-private-lightgrey)

## Overview

**AutoCraft Web** is the official site for a web development & AI automation studio — a dark-themed, motion-rich React application with a public marketing site and a protected admin dashboard for managing portfolio projects, testimonials, and client inquiries.

This repository is the **frontend only**. It talks to a REST API for authentication, projects, testimonials, and inquiries — see [Backend](#backend).

## Features

**Public site**
- Animated hero, scroll-based reveals and transitions (Framer Motion)
- Scrolling brand/tech marquee
- Services showcase — Website Development, Web Applications, UI/UX Design, E-commerce, AI Solutions, Custom Software
- Portfolio ("Work") grid with individual case-study pages at `/work/:slug`
- "Why Us" and a 4-step process (Discover → Design → Build → Launch)
- Founder section, About section with live stats, scrolling technology wall
- Client testimonials (sample testimonials show automatically until real ones are added)
- Contact form with service + budget selection, validation, and a honeypot field for spam protection
- SEO-ready meta tags, Open Graph data, responsive layout, custom cursor, preloader

**Admin dashboard** (`/admin`, JWT-protected)
- **Overview** — stats snapshot
- **Projects** — create, edit, delete portfolio entries
- **Inquiries** — view and manage contact-form submissions
- **Testimonials** — create, edit, delete client testimonials

## Tech Stack

| Category | Tech |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Routing | React Router DOM 6 |
| Icons | Lucide React |
| Fonts | Bricolage Grotesque, Manrope, JetBrains Mono |
| Deployment | Netlify |

## Project Structure

```
Autocraft Web/
├── public/
│   └── images/             # Logo, founder photo, project screenshots
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard UI (Overview, Projects, Inquiries, Testimonials)
│   │   └── sections/       # Public homepage sections (Hero, Services, Work, Contact, ...)
│   ├── context/            # AuthContext — JWT auth state
│   ├── data/                # site.js (editable site content) + demo project data
│   ├── hooks/                # useSEO, useProjects, useCountUp, useMedia
│   ├── layouts/              # SiteLayout — navbar + footer wrapper
│   ├── pages/                # Route-level pages (Home, ProjectDetail, NotFound, admin/*)
│   ├── services/             # api.js — all backend API calls
│   ├── App.jsx                # Route definitions
│   └── main.jsx                # App entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── netlify.toml
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- The AutoCraft Web backend API running (or any API matching the endpoints used in `src/services/api.js`)

### Installation

```bash
git clone <your-repo-url>
cd "Autocraft Web"
npm install
```

### Environment variables

Create a `.env` file in the project root:

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |

### Run the dev server

```bash
npm run dev
```

Opens at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output goes to `dist/`.

### Preview the production build

```bash
npm run preview
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |

## Backend

This repo is frontend-only and expects a REST API exposing `/auth`, `/projects`, `/testimonials`, `/inquiries`, and `/stats`. Point `VITE_API_URL` at your backend (Node.js/Express/MongoDB or any compatible API) for the admin dashboard, contact form, and dynamic project data to work.

## Customization

Most site copy — tagline, services, process steps, technologies, budget options, social links — lives in **`src/data/site.js`**, so content can be updated without touching components. Logo and founder images live in `public/images/`; replace the files directly (same filenames) to update them everywhere.

## Deployment

Pre-configured for **Netlify**:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Connect the repo in Netlify and set `VITE_API_URL` as an environment variable on the site.

## Author

**Nayan Kindarkhediya**
Founder & Web Developer — AutoCraft Web
