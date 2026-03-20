# Abhijith B Portfolio

Personal portfolio built with Next.js App Router, TypeScript, and Tailwind CSS.

## Overview

This project is a content-driven portfolio with:
- Home profile and social presence
- About narrative and principles
- Projects (including a featured project)
- Events and engagements
- Dedicated hackathons showcase
- Writing and releases
- Profile detail pages (skills, certifications, experience, education)

All core content is centralized in `src/lib/data.ts`.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Vercel Analytics

## Local Development

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Project Structure

```text
src/
  app/
    layout.tsx
    globals.css
    page.tsx
    about/page.tsx
    projects/page.tsx
    blog/page.tsx
    releases/page.tsx
    events/
      layout.tsx
      page.tsx
    hackathons/
      layout.tsx
      page.tsx
    profile/
      layout.tsx
      page.tsx
      skills/page.tsx
      certifications/page.tsx
      experience/page.tsx
      education/page.tsx
    sitemap.ts
    robots.ts

  components/
    Navbar.tsx
    sections/
      HomeSection.tsx
      AboutSection.tsx
      ProjectsSection.tsx
      EventsSection.tsx
      BlogSection.tsx
      ReleasesSection.tsx
      ContactSection.tsx
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
    ui/
      BlogRow.tsx
      ProjectRow.tsx
      ReleaseRow.tsx
      SocialLink.tsx

  lib/
    data.ts
```

## Data Model

`src/lib/data.ts` contains typed content for:
- Site identity, hero line, social links, stats, nav items
- Summary, principles, and insights
- Projects, writing posts, and releases
- Events and hackathons
- Profile items (skills, certifications, experience, education)
- Profile page metadata cards

## UX and Design Notes

- Responsive fixed navbar with desktop and mobile navigation
- Active section highlighting on home scroll
- Mobile-first section centering on small screens
- Desktop layout keeps left alignment for readability
- Handwritten accent font (`Caveat`) loaded in `src/app/layout.tsx`
- Interactive CTA links (`.ink-link`) in `src/app/globals.css`
  - Used for project, writing, and release actions
  - Styled to feel tactile and clearly clickable

## SEO and Performance

- Route-level metadata and Open Graph metadata
- Canonical alternates for major routes
- Generated sitemap via `src/app/sitemap.ts`
- Generated robots rules via `src/app/robots.ts`
- Optimized profile image at `public/assets/images/profile.webp`
- Resume hosted at `public/resume.pdf`
- Vercel Analytics integrated globally

## Notes

- `components/ui/*` currently contains optional reusable rows and social UI.
- If needed later, content from `src/lib/data.ts` can be moved to CMS/API while keeping section components unchanged.
