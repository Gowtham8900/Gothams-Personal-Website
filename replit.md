# Sai Gowtham Padarthi's Portfolio Website

## Overview
A futuristic, visually stunning personal portfolio website for Sai Gowtham Padarthi, a .NET Full Stack Developer with 4+ years of experience specializing in C#, ASP.NET Core, React, Angular, and Azure.

## Tech Stack
- Frontend: React 18 + Vite + TypeScript
- Styling: Tailwind CSS with custom dark theme + glassmorphism
- Animations: Framer Motion
- Routing: Wouter
- Backend: Express.js (minimal - just serves the app + resume route)
- Icons: Lucide React + React Icons

## Architecture
- Single Page Application with client-side routing
- No database needed - all content is static/hardcoded in `client/src/lib/data.ts`
- Express backend serves the Vite app + provides `/resume` download route
- Resume file: `attached_assets/Gowtham_NET_Resume_1771800589677.docx`

## Key Files
- `client/src/App.tsx` - Main app with routing
- `client/src/lib/data.ts` - All project/timeline/skills data
- `client/src/pages/Home.tsx` - Home page with hero, typing animation, stats, featured projects
- `client/src/pages/Projects.tsx` - Filterable project grid
- `client/src/pages/ProjectDetail.tsx` - Individual project case study
- `client/src/pages/About.tsx` - About page with skills grid, timeline
- `client/src/pages/Contact.tsx` - Contact form (mailto-based)
- `client/src/components/ParticleBackground.tsx` - Multi-color particle animation with glowing orbs
- `client/src/components/Navbar.tsx` - Sticky glass navbar
- `client/src/components/TiltCard.tsx` - 3D tilt hover card
- `client/src/components/SectionWrapper.tsx` - Scroll reveal wrapper
- `client/src/components/CountUp.tsx` - Animated counter
- `client/src/components/TechOrbit.tsx` - Floating tech badges with glow effects
- `client/src/components/Footer.tsx` - Site footer

## Pages
1. `/` - Home (hero with typing animation, stats, featured projects, timeline preview, CTA)
2. `/projects` - Filterable project grid (All/Work/Side/OSS) with animated filter tabs
3. `/projects/:slug` - Project case study detail page
4. `/about` - About, skills, timeline, "Now" section
5. `/contact` - Contact form with validation (email: saigowtham9954@gmail.com)
6. `/resume` - Downloads resume file

## Design
- Dark mode by default with neon cyan/purple/teal accents
- Multi-color particle background with glowing orbs (Canvas 2D)
- Glassmorphism cards with animated gradient borders
- Mouse-following glow effect on home page
- Framer Motion scroll reveals, page transitions, and micro-interactions
- Respects prefers-reduced-motion
- Typing animation cycling through roles on hero section

## Contact Info (from resume)
- Email: saigowtham9954@gmail.com
- Phone: (309) 989-9954
- LinkedIn: https://www.linkedin.com/in/gowtham8900/

## Running
- `npm run dev` starts the app on port 5000
