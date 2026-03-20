# Abhijith B Portfolio

A minimalist, SEO-friendly portfolio built with Next.js App Router, TypeScript, and Tailwind CSS.

## What This Project Is

This project is a personal portfolio focused on:
- identity and introduction
- projects and proof of work
- writing and public insights
- release/activity updates
- profile depth through dedicated pages (skills, certifications, experience, education)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Vercel Analytics

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
			BlogSection.tsx                 # Writing list
			ReleasesSection.tsx             # Release/activity list
			ContactSection.tsx              # Email + LinkedIn CTA
		profile/
			ProfileHeader.tsx               # Shared header block for profile pages
			TagGrid.tsx                     # Reusable tag/chip grid UI
			TimelineList.tsx                # Reusable timeline card UI
		ui/
			BlogRow.tsx                     # Optional reusable row component (currently not used)
			ProjectRow.tsx                  # Optional reusable row component (currently not used)
			ReleaseRow.tsx                  # Optional reusable row component (currently not used)
			SocialLink.tsx                  # Optional reusable social component (currently not used)

	lib/
		data.ts                           # Central source of content and profile data
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
- top skills
- certifications
- experience timeline
- education timeline
- profile page cards/navigation metadata

This makes future edits easier and avoids hardcoded content spread across components.

## SEO and Performance

Implemented:
- route-level metadata for major pages
- OpenGraph metadata for social previews
- canonical alternates in route metadata
- generated `sitemap.xml` via `src/app/sitemap.ts`
- generated `robots.txt` via `src/app/robots.ts`
- compressed profile image (`public/images/profile.webp`)
- `next/image` size hints and quality tuning
- modern image formats enabled in `next.config.ts`
- Vercel Analytics integrated globally

## Key UX Improvements Done

- responsive navbar with mobile menu
- active section highlighting on scroll
- smooth scrolling and cleaner spacing system
- dedicated profile pages for long-form professional details
- improved consistency in section typography and layout rhythm

## Recent Implementation Timeline

Recent commits show the evolution from basic portfolio to structured profile platform:
- `6f93bb1` profile domain split into dedicated SEO pages
- `598340b` LinkedIn-based profile enrichment
- `9c0bb5c` GitHub/Substack data synchronization
- `f275841` compressed image asset optimization
- `8616f42` analytics + image delivery tuning
- `716ba48` route metadata + OpenGraph setup
- `e70001c` active section highlighting in navbar
- `3c99678` centralized data + contact CTA
- `5d9c277` responsive navbar + clean minimalist layout

## Notes For Future Development

- Move currently unused `components/ui/*` into active section rendering or remove if unnecessary.
- Consider a dynamic profile route pattern (`/profile/[slug]`) to reduce page boilerplate.
- Add JSON-LD structured data for person/profile schema.
- Replace placeholder links/data with live production values as profile evolves.