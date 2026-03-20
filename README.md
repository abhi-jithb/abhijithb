# Abhijith B Portfolio

A minimalist, SEO-friendly portfolio built with Next.js App Router, TypeScript, and Tailwind CSS.

## What This Project Is

This project is a personal portfolio focused on:
- identity and introduction
- projects and proof of work
- events and engagements timeline
- dedicated hackathons showcase
- writing and public insights
- release/activity updates
- profile depth through dedicated pages (skills, certifications, experience, education)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Vercel Analytics
- Framer Motion (subtle motion for event timeline/cards)

## Run Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Current Structure

```text
src/
  app/
    page.tsx                          # One-page home with section anchors
    layout.tsx                        # Global layout, metadata, navbar, analytics
    globals.css                       # Tailwind import + global styles
    about/page.tsx                    # Standalone about route
    projects/page.tsx                 # Standalone projects route
    blog/page.tsx                     # Standalone writing route
    releases/page.tsx                 # Standalone releases route
    events/
      layout.tsx                      # Events page shell
      page.tsx                        # Dedicated events and engagements page
    hackathons/
      layout.tsx                      # Hackathons page shell
      page.tsx                        # Dedicated hackathons showcase page
    profile/
      layout.tsx                      # Shared profile-page shell + local nav
      page.tsx                        # Profile overview page
      skills/page.tsx                 # Dedicated skills page
      certifications/page.tsx         # Dedicated certifications page
      experience/page.tsx             # Dedicated experience page
      education/page.tsx              # Dedicated education page
    sitemap.ts                        # Dynamic sitemap for SEO
    robots.ts                         # Robots rules + sitemap reference

  components/
    Navbar.tsx                        # Responsive top nav + active section highlight
    sections/
      HomeSection.tsx                 # Hero, profile, social links, stats
      AboutSection.tsx                # Summary, principles, insights, profile links
      ProjectsSection.tsx             # Featured + full project list
      EventsSection.tsx               # Home teaser for latest events + hackathons link
      BlogSection.tsx                 # Writing list
      ReleasesSection.tsx             # Release/activity list
      ContactSection.tsx              # Email + LinkedIn CTA
    features/
      events/
        CategoryFilter.tsx            # Filter chip/button UI
        CategoryTabs.tsx              # Organized/Experience/Mentorship tabs
        EventCard.tsx                 # Event card with badges/highlights/outcome
        EventTimeline.tsx             # Lazy-loaded timeline list
      hackathons/
        HackathonCard.tsx             # Single hackathon showcase card
        HackathonShowcase.tsx         # Responsive hackathon card grid
      profile/
        ProfileHeader.tsx             # Shared header block for profile pages
        TagGrid.tsx                   # Reusable tag/chip grid UI
        TimelineList.tsx              # Reusable timeline card UI
    ui/
      BlogRow.tsx                     # Optional reusable row component (currently not used)
      ProjectRow.tsx                  # Optional reusable row component (currently not used)
      ReleaseRow.tsx                  # Optional reusable row component (currently not used)
      SocialLink.tsx                  # Optional reusable social component (currently not used)

  lib/
    data.ts                           # Central source of content and profile/event/hackathon data
```

## Centralized Content Model

All portfolio content now lives in `src/lib/data.ts`, including:
- site identity (name, role, location, hero line)
- contact and social links
- stats
- principles and insights
- projects
- writing posts
- releases
- events (organized, experience, mentorship)
- hackathons (dedicated list + summary + key projects)
- top skills
- certifications
- experience timeline
- education timeline
- profile page cards/navigation metadata

This avoids hardcoded content spread across components and keeps updates scalable.

## SEO and Performance

Implemented:
- route-level metadata for major pages
- OpenGraph metadata for social previews
- canonical alternates in route metadata
- generated `sitemap.xml` via `src/app/sitemap.ts`
- generated `robots.txt` via `src/app/robots.ts`
- dedicated metadata for `/events`, `/hackathons`, and `/profile/*`
- `/events` and `/hackathons` included in sitemap generation
- compressed profile image (`public/images/profile.webp`)
- `next/image` size hints and quality tuning
- modern image formats enabled in `next.config.ts`
- Vercel Analytics integrated globally

## Key UX Improvements Done

- responsive navbar with mobile menu
- active section highlighting on scroll
- dedicated events page with category filtering
- dedicated hackathons page as builder-under-pressure showcase
- lazy-loaded events timeline for scalability to 100+ entries
- subtle animation in event cards/timeline
- smooth scrolling and cleaner spacing system
- dedicated profile pages for long-form professional details

## Recent Implementation Timeline

- `efe158f` dedicated hackathons showcase page + events/hackathons split
- `c7447ba` README update for events architecture
- `2efbd30` categorized events page + timeline components + homepage teaser
- `6f93bb1` profile domain split into dedicated SEO pages
- `598340b` LinkedIn-based profile enrichment
- `9c0bb5c` GitHub/Substack data synchronization
- `f275841` compressed image asset optimization
- `8616f42` analytics + image delivery tuning

## Notes For Future Development

- Move currently unused `components/ui/*` into active section rendering or remove if unnecessary.
- Consider a dynamic profile route pattern (`/profile/[slug]`) to reduce page boilerplate.
- Add JSON-LD structured data for person/profile schema.
- Replace placeholder links/data with live production values as profile evolves.
