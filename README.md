# Abhijith B Portfolio

Personal portfolio built with Next.js App Router, TypeScript, and Tailwind CSS, with an editorial visual direction and handwritten accent typography.

## Project Snapshot

This repository powers a content-first portfolio with:
- One-page home experience with anchored sections
- Dedicated routes for `about`, `projects`, `blog`, `releases`
- Separate long-form sections for `events`, `hackathons`, and `profile`
- Profile deep-dive pages for skills, certifications, experience, education
- Centralized typed content model in `src/lib/data.ts`
- SEO metadata, sitemap, robots, and analytics instrumentation

## Tech Stack

- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4.1.18
- Framer Motion 12.38.0
- React Icons 5.5.0
- Vercel Analytics 2.0.1

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Core Architecture

### App Routing

`src/app/page.tsx` renders the home page as a single scrolling document with section anchors:
- `home`
- `about`
- `projects`
- `events`
- `blog`
- `releases`
- `contact`

Standalone routes are provided for deeper browsing:
- `/about`
- `/projects`
- `/blog`
- `/releases`
- `/events`
- `/hackathons`
- `/profile`
- `/profile/skills`
- `/profile/certifications`
- `/profile/experience`
- `/profile/education`

### Layout and Global Styling

- `src/app/layout.tsx`
  - Global metadata and social metadata defaults
  - Global font registration via `next/font/google`
  - Mounted `Navbar` and Vercel `Analytics`
- `src/app/globals.css`
  - Tailwind import
  - Theme tokens (`--page-bg`, `--page-text`, surfaces)
  - Editorial rhythm utilities (`section-rhythm`, `section-kicker`, `section-title`, `paper-panel`)
  - Handwritten link and label styles (`font-script`, `ink-link`, `ghost-link`)

### Navigation Model

`src/components/Navbar.tsx` uses a merged minimal nav structure:
- `Home`
- `About`
- `Work` (projects + events + hackathons)
- `Updates` (blog + releases)
- `Contact`
- `Profile`

Behavior:
- Scroll-aware active section highlighting on home route
- Route-aware highlighting on nested pages (`/events`, `/hackathons`, `/blog`, `/releases`, `/profile/*`)
- Responsive mobile menu with same grouped semantics

## Source Tree

```text
src/
  app/
    about/page.tsx
    blog/page.tsx
    events/
      layout.tsx
      page.tsx
    globals.css
    hackathons/
      layout.tsx
      page.tsx
    layout.tsx
    page.tsx
    profile/
      certifications/page.tsx
      education/page.tsx
      experience/page.tsx
      layout.tsx
      page.tsx
      skills/page.tsx
    projects/page.tsx
    releases/page.tsx
    robots.ts
    sitemap.ts
  components/
    features/
      events/
        CategoryFilter.tsx
        CategoryTabs.tsx
        EventCard.tsx
        EventTimeline.tsx
      hackathons/
        HackathonCard.tsx
        HackathonShowcase.tsx
      profile/
        ProfileHeader.tsx
        TagGrid.tsx
        TimelineList.tsx
    Navbar.tsx
    sections/
      AboutSection.tsx
      BlogSection.tsx
      ContactSection.tsx
      EventsSection.tsx
      HomeSection.tsx
      ProjectsSection.tsx
      ReleasesSection.tsx
    ui/
      BlogRow.tsx
      ProjectRow.tsx
      ReleaseRow.tsx
      SocialLink.tsx
  lib/
    data.ts
```

## Data and Content Strategy

`src/lib/data.ts` is the primary content source and contains typed exports for:
- Site identity and profile meta (name, role, location, hero line, avatar path, resume path)
- Social links and public stats
- Home nav items (used by observer and routing logic)
- About summary, principles, and insights
- Projects (with featured project flag and external links)
- Writing posts and release entries
- Events and event categories
- Hackathon records and summary cards
- Profile records:
  - top skills
  - certifications
  - experience timeline
  - education timeline
  - profile page metadata cards

This setup keeps section components mostly presentational and makes future content migration to CMS/API straightforward.

## Design System Highlights

Typography:
- `Newsreader` as primary body/editorial font
- `Caveat` as handwritten accent for labels and action links

Visual language:
- Soft paper-like background gradients
- Glassy surface cards via `paper-panel`
- Editorial spacing cadence via `section-rhythm`
- Tactile micro-CTA style for external links via `ink-link`

Mobile behavior:
- Mobile-specific home spacing and viewport-safe hero height (`100svh`)
- Centered content on small screens with desktop left alignment in content-heavy sections

## SEO, Discoverability, and Performance

Implemented:
- Global metadata defaults in `src/app/layout.tsx`
- Per-route metadata for key pages
- Open Graph/Twitter metadata support
- Canonical alternates on routes
- Dynamic sitemap generation (`src/app/sitemap.ts`)
- Robots configuration (`src/app/robots.ts`)
- Next image optimization configured for `avif` and `webp` (`next.config.ts`)
- Optimized profile image at `public/assets/images/profile.webp`
- Resume served from `public/resume.pdf`
- Vercel Analytics mounted globally

## Configuration Notes

- `next.config.ts`
  - `devIndicators: false`
  - image formats set to `avif` and `webp`

## Development Workflow

Typical cycle:
1. Update content in `src/lib/data.ts` and/or UI components.
2. Run `npm run lint`.
3. Validate in `npm run dev` on desktop + mobile widths.
4. Commit small focused changes.

## What To Do Next

### 1. Add structured data (high impact)
- Add JSON-LD (`Person`, `WebSite`, `Article`, `Event`) in relevant pages for richer search previews.

### 2. Improve accessibility baseline
- Add skip links and landmark tuning.
- Run contrast checks for all custom tokens and interactive states.
- Add keyboard focus audit for the mobile menu and section links.

### 3. Add automated quality checks
- Introduce Playwright smoke tests for navigation and key routes.
- Add a small test for sitemap/robots output integrity.

### 4. Add content operations support
- Move content from `src/lib/data.ts` to markdown/MDX or headless CMS.
- Keep current TS types as the schema contract.

### 5. Add a design token layer
- Move repeated colors/spacings into explicit CSS custom properties (light + dark token sets).
- Optional: add theme toggle and persist preference.

### 6. Reduce maintenance overhead
- Either integrate or remove unused `components/ui/*` pieces.
- Consider dynamic profile routing (`/profile/[slug]`) to reduce page boilerplate.
