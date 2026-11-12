# ARCHIFORM website: performance, reliability and mobile optimisation

You are working on the ARCHIFORM Design Studio website, a Dubai interior design studio site. The home page is one long scroll-driven animation: a sticky full-screen stage whose elements (hero videos and images, the logo arch, the chair scene, Featured projects, Process, Founder, Services arches) are positioned from scroll progress. The other pages are About, Services, Portfolio and Contact.

Your job is to make the site fast, smooth and reliable on desktop and mobile **without changing how it looks or what it does**. Every layout, colour, font, image, piece of copy and animation sequence must look the same when you finish. You are changing *how* things are built and loaded, not *what* the visitor sees.

Work in four phases: audit, report, fix, verify. Do not skip the audit.

---

## 0. Ground rules

- Do not redesign, restyle, reorder sections, rename copy or remove animations. If a fix would visibly change something, stop and list it under "Needs approval" in your report instead of doing it.
- Keep the existing palette, fonts, timings and scroll choreography. Timings can be retuned only to remove stutter, never to change the story.
- Make small, reviewable changes. After each group of fixes, re-run the checks in section 6.
- If something is unclear (for example, which video belongs to which hero slot), read the code and the assets before asking.
- Keep a running changelog: what you changed, why, and the before/after measurement.

---

## 1. Audit first

Before changing anything:

1. Run the site locally and in a production build. Note the stack (static HTML, framework, bundler) and where it's hosted (currently Netlify).
2. Open the browser console on every page. Record every error, warning, 404 and failed request.
3. Record a Chrome DevTools Performance trace while scrolling the whole home page at normal speed, once with no throttling and once with 4x CPU throttling. Note dropped frames, long tasks over 50 ms, forced reflows ("Layout" inside scroll or rAF handlers), large paints and decode times.
4. Run Lighthouse (mobile and desktop) on every page. Record LCP, CLS, INP/TBT, total transfer size and the largest requests.
5. List every media file the site loads: path, format, resolution, file size, duration (videos) and where it's used.
6. Test on a real iPhone (Safari) and a mid-range Android phone (Chrome) if available. Otherwise use device emulation plus throttling ("Fast 4G", 4x CPU).

---

## 2. Hero videos: load every time, play smoothly

The hero videos sometimes lag and sometimes work. Treat that as several separate problems and check each one.

### 2.1 Fix the files themselves (most common cause)

Re-encode every hero video. Keep the originals; write optimised copies.

**Quality comes first. The re-encoded videos must look the same as the originals.** File size is the second priority. If a size target below can only be met by visible softening, banding, blockiness or smearing in motion, ignore the size target and keep the quality. Specifically:

- Never upscale, and never drop below the source resolution for the desktop version unless the source is larger than 2560 px wide. If the source is wider than 1920 px, also make a 2560 px version for large and retina screens.
- Start the desktop encode at CRF 20. Only raise it (up to 23) if a side-by-side comparison shows no visible difference.
- Keep the source frame rate if it's 30 fps or lower. Don't reduce it.
- Before replacing any video, compare original and new copy full-screen on a large display, paused on detailed frames (fabric, plants, wood grain, gradients on walls) and while playing. Also check the VMAF score if `ffmpeg` has libvmaf (`ffmpeg -i new.mp4 -i original.mp4 -lavfi libvmaf -f null -`): aim for 95 or higher. If the new version looks worse anywhere, lower the CRF and encode again.
- The mobile version is intentionally smaller in resolution, because a phone screen doesn't need more. It must still look sharp on a phone at full width; check it on a real phone.

- **Fast start:** the `moov` atom must be at the front, or the browser has to download most of the file before it can play. Without this you get exactly the "sometimes fine, sometimes stuck" behaviour.
- **No audio track** (the videos are muted anyway): saves bytes and lets autoplay work.
- **Sensible size:** 1920 px wide for desktop (plus 2560 px if the source allows), and a separate 960–1080 px version for mobile. Short loops often land around 3–6 MB on desktop and 1–2 MB on mobile, but these are rough guides, not limits: quality wins over size.
- **Regular keyframes** (every 1–2 s) so seeking and looping don't stall.

Reference commands:

```bash
# Desktop H.264 (plays everywhere). Keeps the source frame rate; scales down only if wider than 1920.
ffmpeg -i in.mov -vf "scale='min(1920,iw)':-2:flags=lanczos" -c:v libx264 -profile:v high -preset slow \
  -crf 20 -tune film -pix_fmt yuv420p -g 48 -keyint_min 48 -sc_threshold 0 -movflags +faststart -an hero-1.mp4

# Large-screen version, only if the source is wider than 1920
ffmpeg -i in.mov -vf "scale='min(2560,iw)':-2:flags=lanczos" -c:v libx264 -profile:v high -preset slow \
  -crf 20 -tune film -pix_fmt yuv420p -g 48 -keyint_min 48 -sc_threshold 0 -movflags +faststart -an hero-1-2560.mp4

# Mobile H.264
ffmpeg -i in.mov -vf "scale='min(1080,iw)':-2:flags=lanczos" -c:v libx264 -profile:v high -preset slow \
  -crf 22 -tune film -pix_fmt yuv420p -g 48 -keyint_min 48 -sc_threshold 0 -movflags +faststart -an hero-1-mobile.mp4

# Optional VP9/WebM for Chrome/Firefox/Android, listed before the MP4. Same quality, usually smaller.
ffmpeg -i in.mov -vf "scale='min(1920,iw)':-2:flags=lanczos" -c:v libvpx-vp9 -b:v 0 -crf 28 -row-mt 1 -an hero-1.webm

# Poster frame for each clip (first frame, WebP)
ffmpeg -i hero-1.mp4 -frames:v 1 -vf "scale='min(1920,iw)':-2" hero-1-poster.webp
```

Check with `ffprobe` that each output has no audio stream and that `moov` comes before `mdat` (`ffprobe -v trace hero-1.mp4 2>&1 | grep -m2 -E "type:'(moov|mdat)'"`).

If any video is **scrubbed by scroll** (its `currentTime` is set from scroll position), normal encoding will always stutter, because the browser has to decode from the previous keyframe on every seek. Either encode that clip all-intra (`-g 1`, larger file) or replace scrubbing with an image sequence drawn to a `<canvas>`. Don't scrub a normally encoded video.

### 2.2 Fix the markup

Every hero video should look like this (adapt names):

```html
<video class="hero-video" muted playsinline loop preload="metadata"
       poster="/media/hero-1-poster.webp" disablepictureinpicture
       data-src-desktop="/media/hero-1.mp4" data-src-mobile="/media/hero-1-mobile.mp4"
       aria-hidden="true"></video>
```

- `muted` and `playsinline` are mandatory for autoplay on iOS. Also set `video.muted = true` in JS, because some browsers ignore the attribute when it's added dynamically.
- Always have a `poster` that looks the same as the first frame. The visitor should never see a black or empty box.
- Pick the mobile or desktop source in JS, based on viewport width and `navigator.connection.saveData`. Don't rely on `<source media>` alone. Set `src` once; never swap it on resize mid-play.
- Only the first video in the sequence gets `preload="auto"` and `fetchpriority="high"` on its poster. The others start as `preload="none"`.

### 2.3 Fix the loading and playback logic

Write one small video controller and use it for every hero video:

- **Load ahead, one at a time.** Load the first video immediately. When video N is on screen, start loading video N+1 (`video.preload = 'auto'; video.load()`). Never let all videos download at once on mobile.
- **Reveal only when ready.** Don't show a video (or start its slide-in transition) until it has fired `canplay`/`canplaythrough` or `readyState >= 3`. Until then show the poster. This removes the frozen-first-frame glitch.
- **Handle the play promise.** `video.play()` returns a promise. Catch rejections (autoplay blocked, iOS Low Power Mode, Data Saver) and keep the poster visible instead of a broken player. Never leave an uncaught rejection in the console.
- **Play only what is visible.** Use an `IntersectionObserver` (or the scroll timeline's own state) to `play()` the video in view and `pause()` the rest. Playing several videos at once is a major cause of jank, especially on phones.
- **Pause when the tab is hidden** (`visibilitychange`) and resume when it comes back.
- **Recover from stalls.** Listen for `stalled`, `waiting` and `error`. On `error`, retry once with a fresh `load()` (optionally with a cache-busting query). If it fails again, fall back to the poster permanently for that session. Log it in development only.
- **Respect `prefers-reduced-motion` and Save-Data:** show posters instead of autoplaying video.
- **Don't recreate video elements** on route changes or re-renders. Create them once and reuse them.

### 2.4 Keep the compositor happy

- Animate video containers with `transform` and `opacity` only. Don't animate `left/top/width/height`, `border-radius` or `filter` on an element that contains a playing video.
- Don't put `filter`, `backdrop-filter`, `mix-blend-mode` or animated `clip-path` on top of or around a playing video. If a darkening effect is needed, use a separate overlay `<div>` with an animated `opacity`.
- Put `will-change: transform` only on the one or two layers currently animating, and remove it when they are idle. Lots of permanent `will-change` layers use up GPU memory and cause the stutter you're trying to fix.

### 2.5 Hosting

- Serve videos with long cache headers (see section 4) and make sure Netlify returns `Accept-Ranges: bytes` and `206 Partial Content` for them (check the Network tab).
- If videos are still slow for visitors far from the CDN edge, propose (don't implement without approval) moving them to a video CDN with adaptive streaming (for example Mux, Cloudflare Stream or Bunny Stream, using HLS with `hls.js` and native HLS on Safari).

---

## 3. Lag and glitches across the site

Search the code for these patterns and fix any you find. Each one is a known cause of scroll jank.

### 3.1 Scroll loop

- **One scroll listener**, marked `{ passive: true }`, that only stores `scrollY` and schedules a single `requestAnimationFrame`. All visual updates happen in that one rAF. Stop the rAF loop when nothing is moving.
- **No layout reads inside the loop.** `getBoundingClientRect()`, `offsetWidth/Height`, `offsetTop`, `scrollWidth`, `clientHeight` and `getComputedStyle()` inside the scroll/rAF handler cause forced reflow every frame. Measure once on load and on real resizes, cache the numbers, and compute positions from scroll progress plus the cache.
- **Batch writes.** Read everything first, then write. Never interleave reads and writes on different elements.
- **No layout-triggering writes per frame.** Elements that grow or move every frame (the logo arch opening into the hero, rooms closing into the arch, the Featured project opening to full screen) must use `transform: translate/scale` plus `clip-path: inset(... round ...)`, not changing `left/top/width/height/border-radius` each frame. Pre-size each element to its largest size and scale it down.
- **Don't change `background-position` on large elements every frame** (for example the marble texture). Use a transformed inner layer instead.
- **Skip work for off-screen pieces.** If an element's opacity is 0 or it's outside its time window, set `visibility: hidden` (or `content-visibility`) and don't update its styles at all that frame.
- **Smoothing (lerp) on scroll:** if the code eases toward the target scroll position, make sure it stops when it's close, snaps on jumps (anchor links, route changes), and is **turned off or much lighter on touch devices**, where it fights the phone's own momentum scrolling and feels laggy.
- Use `toFixed()` sparingly. Avoid creating strings and objects in the hot loop where a cached value works.

### 3.2 Rendering cost

- Find fixed full-screen overlays with `mix-blend-mode`, `filter: blur()` or big semi-transparent images (for example a leaf-shadow layer or blurred plant cut-outs on the hero). These repaint over everything while scrolling. Keep them only while visible: set `display: none` when their opacity reaches 0, not just `opacity: 0`.
- Remove or limit `backdrop-filter`. It's very expensive on mobile.
- Large `box-shadow` on many moving cards is costly. Prefer a pre-blurred shadow image or a single shadow layer.
- Check for layers being promoted unnecessarily (DevTools > Rendering > Layer borders) and GPU memory warnings.
- SVG with filters (feTurbulence etc.) used as textures should be rasterised to a small image once, not recomputed.

### 3.3 Visual glitches to look for

- Flashes of unstyled text or layout shift when web fonts load.
- Sections that are briefly blank or show the wrong frame when scrolling fast or jumping with the scroll bar.
- Elements visible at the edges when they should be off-screen (thin slivers of a panel).
- Header showing or hiding at the wrong moment, or flickering between states.
- Z-index fights: decorative elements (branches, plants) covering text or links.
- Content jumping when the mobile address bar shows or hides.
- Back/forward and hash routing: the page should open at the top of the new route, with scroll animations in the correct state, and no leftover animation from the previous page.
- Horizontal scroll on any page at 320, 375, 390, 414, 768, 1024, 1280, 1440 and 1920 px widths.
- Anything that breaks when you resize the window during the animation.
- Every link and button works. The contact and newsletter forms validate and give clear messages.

---

## 4. Speed

### 4.1 Images

- Convert every raster image to AVIF with WebP fallback (or at least WebP) at quality around 80–88. Compare each converted image with the original at full size; if you can see any difference, raise the quality.
- Generate responsive sizes (for example 480, 768, 1080, 1600, 2000 w) and use `srcset` + `sizes`. Phones must not download desktop-size images.
- Always set `width` and `height` (or `aspect-ratio`) so nothing shifts while loading.
- `loading="lazy"` and `decoding="async"` for everything not visible on first paint. **Never** lazy-load the first hero image or poster. Give that one `fetchpriority="high"` and a `<link rel="preload" as="image">`.
- For images used deep in the scroll animation, start loading them a screen or two ahead of when they appear, so they don't pop in late.
- Some client photos are small (about 460–660 px wide). Don't upscale them in code. Flag them in your report so the client can supply larger originals.
- Optimise PNGs with transparency (logo, branch, letters) or convert them to WebP with alpha. Use SVG for anything that is really line art.

### 4.2 Fonts

- `preconnect` to the font host, or self-host the fonts (preferred).
- Load only the weights and styles actually used, subset to Latin, use `font-display: swap`, and preload the one or two files used above the fold.
- Add metric-compatible fallbacks (`size-adjust`, `ascent-override`) to remove layout shift when fonts swap.

### 4.3 CSS and JavaScript

- Inline the critical CSS for the first screen. Load the rest without blocking render.
- Minify CSS, JS and HTML in the production build. Remove dead CSS and JS left from removed sections (for example an old materials section, timber louvres, unused plant and curtain code, unused images).
- `defer` all scripts. No third-party script should block rendering. Load analytics after the page is interactive.
- Split code per page if there's a bundler, so About, Services, Portfolio and Contact don't run the home page's animation engine.

### 4.4 Caching and hosting (Netlify)

Add a `_headers` file (or `netlify.toml` headers):

```
/media/*
  Cache-Control: public, max-age=31536000, immutable
/img/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
/*.js
  Cache-Control: public, max-age=31536000, immutable
/
  Cache-Control: public, max-age=0, must-revalidate
```

Only use `immutable` for files with a content hash or versioned name. If file names aren't hashed, add hashing in the build or use a version query string, so updates still reach visitors. Confirm Brotli/gzip compression is applied to HTML, CSS, JS and SVG.

---

## 5. Mobile optimisation

- **Viewport units:** use `svh`/`lvh`/`dvh` deliberately. Pinned stages should use `100svh` (or `100lvh`) so they don't jump when the address bar moves. Don't re-measure or rebuild the timeline on resize events where only the height changed by about the address-bar amount.
- **Shorter scroll on phones:** the home timeline is very long. Shorten the pinned scroll distance on small screens so it doesn't feel endless, while keeping every scene.
- **Lighter effects on phones:** fewer simultaneous layers, no blur filters, no blend modes, smaller shadows, fewer decorative elements, mobile-sized videos and images. Use `(hover: none) and (pointer: coarse)` and screen width together to decide.
- **Touch:** no scroll-jacking. Native momentum scrolling must stay intact. Turn off scroll smoothing on touch, or keep it very light.
- **Tap targets** at least 44 × 44 px with enough spacing. The header links must stay readable and tappable at 320 px wide. Nothing important may depend on hover.
- **Safe areas:** respect `env(safe-area-inset-*)` for notched phones, especially the header and any fixed elements.
- **iOS specifics:** `playsinline` on all videos. Expect autoplay to fail in Low Power Mode and show the poster. Avoid `background-attachment: fixed`. Check that `position: sticky` works inside the containers used.
- **Text:** body text at least 16 px. No text clipped or overlapping in any scene at 320–430 px widths.
- **Forms:** correct `type`, `inputmode` and `autocomplete` attributes. Inputs at least 16 px so iOS doesn't zoom.
- **Memory:** low-end phones crash or reload with too many big decoded images and videos. Release (unload) videos and very large images that are far behind the current scroll position.
- Test portrait and landscape.

---

## 6. Verify

After the fixes, repeat the audit and show before/after numbers.

Targets (mobile Lighthouse, throttled):

| Metric | Target |
|---|---|
| LCP | under 2.5 s |
| CLS | under 0.1 |
| INP / TBT | INP under 200 ms, TBT under 200 ms |
| Home page transfer before first scroll | under about 1.5 MB on mobile |
| Scrolling the home page | steady 60 fps on desktop; no long tasks over 50 ms during scroll on a mid-range phone |

Also confirm:

- Hard-reload the home page 10 times on desktop and 10 times on a phone (including with "Disable cache" on and "Fast 4G" throttling). Every hero video must show its poster immediately and start playing without freezing, every time.
- Scroll the home page fast, slow, with the scroll bar, with keyboard (Space, Page Down, Home, End) and by touch. There must be no blank frames, no stuck elements and no flicker.
- Navigate between all pages and back with browser back/forward. Each page opens at the top with the correct state.
- `prefers-reduced-motion: reduce` shows the static version with posters, and nothing is broken.
- No console errors or warnings on any page.
- No horizontal scrolling at any width listed above.
- Visually compare screenshots of each scene before and after at 1440 px and 390 px. They must match.

---

## 7. Report back

Finish with a short report:

1. Problems found, grouped by severity (breaks / visible jank / slow loading / minor).
2. What you fixed, file by file, in plain language.
3. Before/after measurements.
4. Anything you did not fix and why.
5. "Needs approval": changes that would alter how the site looks or behaves, or that need new services or assets (for example a video CDN or larger client photos).
