# Codex Master Prompt — Optimize My Existing Dubai Interior Design Website

You are a senior full-stack engineer, technical SEO specialist, UX designer, web performance engineer, and accessibility consultant.

## Mission

Audit and improve my **existing Dubai interior design website**. It contains Pinterest-sourced videos, Google Flow AI-generated interior videos, and interior photographs. Follow the attached **UAE Digital Web Content Guidelines (TDRA, June 2021)** for content principles, while applying modern, appropriate engineering and accessibility best practices.

**Do not rebuild the website.** Preserve the current brand identity, routes, working features, and visual appeal. Work directly in the existing repository. Do not deploy or publish without my approval.

## 1. Inspect before editing

- Identify the framework, routing, components, styles, build scripts, dependencies, media storage and existing integrations.
- Inventory all pages, images, videos, third-party embeds, forms, and metadata.
- Find broken functionality, technical debt, slow-loading assets, mobile problems, accessibility defects, and SEO gaps.
- Establish a performance baseline when testing tools are available; do not invent measurements.
- Read the attached TDRA PDF and map applicable recommendations to the site. This guide addresses UAE government websites; adapt its helpful content principles to my private business without claiming certification or mandatory legal compliance.
- Produce a prioritized implementation checklist, then **implement** the safe, high-impact changes rather than stopping at an audit.

## 2. Apply the TDRA content principles

- Write for my actual audience, using clear, concise, professional English appropriate for a premium Dubai interior design brand.
- Put the most useful information first; use informative headings, short sentences and paragraphs, active voice, consistent terms and scannable sections.
- Avoid jargon, filler, repetitions and unsupported claims.
- Keep mobile copy focused. Make errors neutral, specific and actionable.
- Use imagery only when it supports the page's purpose; retain the visual storytelling essential to interior design.
- Maintain logical information architecture and test content usability.
- Do **not** fabricate completed projects, reviews, credentials, service areas, prices, phone numbers or company history.

## 3. Preserve and refine the design

- Keep the existing logo, color palette, typography and overall personality unless a clear usability issue requires adjustment.
- Improve visual hierarchy, whitespace, responsive typography, image presentation, galleries, navigation, call-to-action placement and consistent components.
- Aim for an elegant, modern, minimal, luxury architecture/interiors look—not a generic template.
- Use subtle motion only when it improves the experience; honor reduced-motion preferences.
- Ensure important information and contact actions are easy to find.

## 4. Video audit and optimization — high priority

For every video, identify its origin, purpose, placement, file type, loading behavior and rights status.

### Pinterest-sourced videos
- Distinguish official embeds/links from downloaded or locally hosted copies.
- **Do not assume Pinterest content is licensed for reuse.** Flag unclear rights for my review; do not bypass platform restrictions or fetch unauthorized copies.
- Prefer compliant embeds where available and appropriate; provide graceful fallbacks when embeds fail.
- Reduce third-party script impact using click-to-load, delayed initialization, or other supported techniques.

### Google Flow videos
- Optimize my existing AI-generated clips for delivery without unnecessarily compromising their cinematic quality.
- Where supported, use efficient formats/codecs, reasonable resolution and bitrate, poster images, responsive sizing and appropriate caching.
- Clearly distinguish AI-generated design concepts from genuine completed projects. Do not describe AI visuals as real client work.

### Playback and loading
- Do not download or initialize every video on the first page load.
- Prioritize only essential above-the-fold media; defer offscreen video loading.
- Choose sensible `preload` behavior; pause offscreen playback when feasible.
- Keep decorative autoplay videos muted and inline, with poster/static fallbacks and reduced-motion behavior.
- Provide accessible playback controls for informative media and captions/transcripts or meaningful alternatives where needed.
- Prevent layout shifts with stable media dimensions; handle media errors gracefully.
- Preserve valuable videos; do not remove visual content solely to game performance scores.

## 5. Interior image optimization

- Audit image dimensions, compression, formats, filenames, alt text and layout dimensions.
- Use appropriately sized AVIF/WebP variants where supported, with fallback behavior.
- Implement responsive image delivery (`srcset`/`sizes` or the framework's equivalent).
- Lazy-load below-the-fold images, but prioritize the actual hero/LCP image.
- Preserve composition and image quality; avoid stretching or harmful crops.
- Use descriptive alt text for meaningful images; treat purely decorative images appropriately.
- Do not falsely label inspiration or AI imagery as built portfolio projects.

## 6. Mobile responsiveness

Test layouts at approximately **320, 375, 390, 430, 768, 1024 px** and desktop widths.

- Eliminate horizontal overflow, overlapping elements and clipped content.
- Make navigation, galleries, videos, headings, buttons and forms responsive.
- Keep tap targets comfortable, contrasts readable and layouts stable.
- Prioritize essential content and clear actions on small screens.
- Avoid showing too many heavy videos or large images immediately on mobile.

## 7. Dubai-focused technical SEO

Implement or refine, where relevant:
- Unique page titles and meta descriptions; clear primary H1 and sensible heading hierarchy.
- Clean canonical URLs, sitemap.xml, robots.txt and internal links.
- Open Graph/social metadata and suitable preview images.
- Crawlable content, meaningful image descriptions, and applicable structured data.
- Local search intent for **services actually offered**, potentially including Dubai interior design, luxury interiors, villa interiors and apartment interiors.

Do not keyword-stuff, create doorway pages, or invent addresses, ratings, completed projects or business credentials. Avoid changing existing URLs; if necessary, add appropriate permanent redirects.

## 8. Speed and Core Web Vitals

Aim for good user-centered performance, especially on mobile:
- LCP <= 2.5 s
- INP <= 200 ms
- CLS <= 0.1

These are targets, not guaranteed results. Aim for strong Lighthouse results where realistically achievable.

Examine oversized video/image transfers, third-party Pinterest embeds, JavaScript bundles, unused code, render-blocking assets, fonts, caching, hydration, unnecessary re-renders and layout shifts. Apply framework-native optimization, code splitting and lazy loading where useful. Do not add heavyweight dependencies without compelling reason. Report real before/after measurements only when actually measured.

## 9. Accessibility

Use the PDF's WCAG 2.1-related checklist as a reference and **target WCAG 2.2 AA** as an additional modern best-practice goal.

Improve semantic HTML, focus visibility, keyboard interactions, link purpose, color contrast, labels, form feedback, heading order, text resizing, responsive reflow, screen-reader support, reduced-motion handling and accessible media controls. Fix real issues rather than merely adding ARIA attributes.

## 10. Content, galleries and conversion

Refine the existing sections instead of replacing the site architecture without reason. When relevant and supported by actual business information, make the homepage clearly present:
- A compelling hero and concise value proposition.
- Real services and design specialties.
- A curated visual gallery.
- Genuine projects, separately distinguished from inspiration and AI concepts.
- An understandable process and contact route.
- Clear calls to action such as **Explore Our Designs**, **View Portfolio** or **Discuss Your Project**.

Preserve working forms and WhatsApp/contact integrations. Improve validation, loading states, spam safeguards, duplicate-submit protection and helpful error messages. Never invent contact information.

## 11. Maintainability and safe edits

- Reuse existing components and architectural conventions.
- Remove only genuinely dead code, unnecessary duplication and redundant dependencies.
- Preserve API contracts, routes, environment variables, secrets, media ownership notes and working integrations.
- Do not perform unrelated framework migrations or sweeping rewrites.
- Organize gallery metadata and AI/inspiration/real-project labels in a maintainable structure when helpful.
- Do not add a CMS, paid service, or new tracking tool without approval.

## 12. Validate actual changes

Run the repository's available build, lint, typecheck and test commands. Inspect key pages at desktop and mobile sizes if browser tooling is available. Test navigation, media fallback/playback, contact routes, accessibility basics, metadata, structured data and console errors. Fix regressions introduced by your edits. Explicitly state which checks could not be executed.

## Deliverables

When complete, provide:

1. **Audit summary:** prioritized problems found.
2. **Changes made:** files/components changed and why.
3. **Media audit:** Pinterest licensing uncertainties, Google Flow delivery changes, image optimizations, broken assets.
4. **Performance:** measured baseline/after metrics when available, otherwise state that they were not measured.
5. **TDRA mapping:** relevant guideline sections applied; separate PDF recommendations from newer industry best practices. Do not claim TDRA certification.
6. **Validation:** commands/tests actually run and their outcomes.
7. **Remaining decisions:** only matters requiring my information, rights clearance or approval.

## Execution order

1. Inspect the codebase and read the PDF.
2. Create a brief prioritized plan.
3. Make incremental, safe improvements directly in the repo.
4. Run checks and correct introduced regressions.
5. Present the concrete results and remaining issues.

**Start now. Do not merely explain what should be done: audit, implement, test and report. Do not deploy without explicit permission.**
