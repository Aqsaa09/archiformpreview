# ARCHIFORM Design Studio – website

Production website for ARCHIFORM, a Dubai interior design studio focused on healthy living.
Built with **Next.js 16 (App Router)**, **GSAP ScrollTrigger** and **Lenis** smooth scrolling.
Contact-form enquiries are emailed with **Resend**.

## Requirements
- Node.js **20.9 or newer** (`node -v`)
- A free [Resend](https://resend.com) account for the contact form

## Run locally
```bash
npm install
cp .env.example .env.local     # then fill in your Resend key and emails
npm run dev                    # http://localhost:3000
```

Production build, run locally:
```bash
npm run build
npm start                      # http://localhost:3000
```

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com: **Add New → Project**, import the repo. Framework is detected as Next.js.
3. In **Settings → Environment Variables** add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   `CONTACT_FROM_EMAIL` and `NEXT_PUBLIC_SITE_URL` (see `.env.example`), then redeploy.
4. Add your domain under **Settings → Domains**.

## Contact form (Resend)
1. Create an API key at resend.com → API Keys.
2. Verify your domain at resend.com → Domains (adds a few DNS records).
3. Set `CONTACT_FROM_EMAIL` to an address on that domain, e.g. `ARCHIFORM Website <website@archiform.com>`.
   Before verifying, `ARCHIFORM <onboarding@resend.dev>` works but only delivers to your Resend sign-up email.
Replies to an enquiry email go straight to the visitor (reply-to is set to their address).

## Where to edit things
| What | File |
|---|---|
| Email, phone, WhatsApp, Instagram, address, domain | `content/site.js` |
| Portfolio projects (text + photos) | `content/projects.js` |
| Photo sizes (needed for responsive images) | `content/images.js` |
| Home page films: sources, descriptions, origin and rights | `content/media.js` |
| Services | `content/services.js` |
| Founder page | `app/founder/FounderContent.jsx` |
| FAQ | `app/services/Faq.jsx` |
| Home page text | `components/HomeMarkup.jsx` |
| Home scroll animation | `lib/home-story.js` |
| Colours, type, layout | `app/globals.css` (tokens at the top of `:root`) |
| Images / videos | `public/m/` and `public/v/` – replace a file with one of the same name |

To add a project: copy one entry in `content/projects.js`, give it a new `slug`, put its photos in `public/m/` and add
each photo's pixel size to `content/images.js`. The page `/portfolio/<slug>` and the sitemap entry are created automatically.

### Real work, visualisations and AI
- A portfolio image that is a render, AI image or design drawing gets `kind: 'visualisation'` in `content/projects.js`;
  the site then labels it "Design visualisation". Leave `kind` out only for photographs of completed work.
- Every home page film is listed in `content/media.js` with its `origin` (`google-flow`, `pinterest`, `mixed`,
  `unconfirmed`) and `rights`. The label shown over the films follows `origin`, e.g. "AI-generated visualisation".
- Do not publish Pinterest downloads without the creator's licence.

### Images, video and caching
- Photos are served through Next.js image optimisation (`next/image`): AVIF or WebP at the size each screen needs.
- Films are already web-ready H.264 with no audio track and the index at the front (fast start). The scroll-scrubbed
  films (`h-walk-*`, `feature-blended*`) have a keyframe every 4 frames so scrubbing stays smooth; keep that if you
  re-encode them. Each film has a landscape cut and a portrait `-m` cut for phones.
- Files in `public/m` and `public/v` are cached by browsers for a week, then refreshed in the background, so a file
  replaced under the same name reaches returning visitors within days. For an instant change, use a new file name.

## Project structure
```
app/                 routes: / founder portfolio portfolio/[slug] services contact
  api/contact/       server endpoint that emails enquiries via Resend
  layout.js          fonts, header, footer, SEO metadata, structured data
  sitemap.js robots.js not-found.js
components/          Header, Footer, HomeStory (+ HomeMarkup), ContactForm, SvgSprites, Arrow
content/             site details, projects, services, image sizes, film registry
lib/home-story.js    the home page scroll story (starts on mount, fully cleaned up on leave)
lib/seo.js           page metadata helper (canonical URL + Open Graph tags)
public/              images (m/), videos (v/), og.jpg share image
```

## Before launch checklist
- [ ] Replace placeholders in `content/site.js` (email, phone, WhatsApp, Instagram, address, domain)
- [ ] Set the four environment variables in Vercel and send a test enquiry
- [ ] Replace stock / AI imagery and the ocean clips with licensed or ARCHIFORM-owned media
- [ ] Replace the AI-generated portfolio images with real project photos, removing `kind: 'visualisation'` from each one replaced
- [ ] Confirm `rights` for the room films in `content/media.js` (the featured film is confirmed as the studio's own)
- [ ] Add your domain in Vercel and set `NEXT_PUBLIC_SITE_URL` to it
- [ ] Submit `https://yourdomain/sitemap.xml` in Google Search Console
