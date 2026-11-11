# Baldwa website: performance, stability and speed pass

You are working on the Baldwa architecture website (Next.js 16 App Router + TypeScript, React 19, React Three Fiber 9 + drei, three.js 0.186, GSAP 3 with ScrollTrigger and @gsap/react). Read `AGENTS.md` and `README.md` first and follow their rules.

## The problem

- The **hero section has videos that sometimes lag and sometimes play fine**. Sometimes they load slowly, stutter, show a black frame, or do not start.
- The site has **general lag and visual glitches**, especially while scrolling and during animations.

## Goal

1. Hero videos load **every time**, start quickly, and play smoothly on desktop and mobile (including iPhone Safari).
2. Find and fix every cause of lag, jank and glitches across the whole site.
3. Make the site as fast as possible without changing the design.

## Ground rules

- **Do not change the visual design, layout, copy, colours or fonts.** Performance and correctness only. If a fix would visibly change something, choose the closest-looking cheaper option and note it in the report.
- Work on a new git branch `perf/optimisation`. Commit after each phase with a clear message, so each phase can be reverted on its own.
- **Never delete or overwrite the original video files.** Move originals to `/media-originals/` (create it, add it to `.gitignore` if the files are large) and write optimised versions to `public/videos/`.
- Do not upgrade three.js, R3F, drei, GSAP or Next.js major versions.
- **Measure performance on a production build** (`npm run build && npm start`), never on `npm run dev`. Dev mode is much slower and runs every effect twice in React Strict Mode.
- `npm run build` must pass with zero TypeScript errors at the end of every phase.
- Do not stop to ask me questions unless you are truly blocked. Make the sensible call, note it, and keep going.

---

## Phase 0: Audit first (no code changes yet)

1. Find every video and how it is used:
   - `grep -rn "<video\|\.mp4\|\.webm\|\.mov\|\.m3u8" src`
   - `find public -type f \( -iname "*.mp4" -o -iname "*.webm" -o -iname "*.mov" -o -iname "*.m4v" \) -exec ls -lh {} \;`
2. For each video file, record with `ffprobe` (install with `brew install ffmpeg` if missing):
   - codec, resolution, frame rate, bitrate, duration, file size, whether it has an audio track
   - **whether it is "fast start"** (the `moov` atom comes before `mdat`):
     `ffprobe -v trace -i FILE 2>&1 | grep -oE "type:'(moov|mdat)'" | head -2`
     If `mdat` comes first, the browser must download most of the file before it can play. This is a classic cause of "sometimes it loads, sometimes it lags".
3. Record what else runs while the hero is visible:
   - Is the R3F `HeroScene` canvas still mounted under or alongside the videos?
   - When does `renderStills` (in `ProjectImagesProvider`) run? It creates a second WebGL renderer and renders six scenes with 2048px shadow maps about 300 ms after load. That is exactly when the hero video is trying to start.
   - Which elements over the video use `backdrop-filter`, `filter`, large `box-shadow`, `clip-path` or `mix-blend-mode`?
4. Take a baseline on the production build:
   - Lighthouse, mobile and desktop: `npx lighthouse http://localhost:3000 --preset=desktop --output=json --output-path=./perf/before-desktop.json` and the same without `--preset` for mobile (`perf/before-mobile.json`).
   - Record LCP, CLS, TBT and Speed Index, plus total JS shipped and the page weight.
   - Chrome DevTools Performance recording: load the page, let the intro finish, scroll top to bottom. Use 4× CPU slowdown and "Fast 4G". Note long tasks, dropped frames and what causes them.
5. Write the findings to `perf/AUDIT.md`: a numbered list of every problem, its file and line, and its likely impact. Then fix them in the phases below.

---

## Phase 1: Hero videos (top priority)

### 1a. Likely root causes to check and fix

- **Missing fast start** (see Phase 0). Re-encode every video with `-movflags +faststart`.
- **Files too large or too high resolution.** Cap desktop at 1920px wide and mobile at 1280px wide (720p). Remove audio tracks.
- **Autoplay silently blocked.** Browsers only autoplay muted, inline video. React can leave the `muted` attribute out of the server-rendered HTML, so autoplay fails on some loads. **Always set `video.muted = true` (and `defaultMuted`, `playsInline`) as properties in an effect before calling `play()`.**
- **Unhandled `play()` promise.** `play()` can reject (Low Power Mode, data saver, a race with `pause()`). Catch it, keep the poster visible, and retry on `canplay`, on `visibilitychange` and on the first user tap.
- **Play/pause races.** Strict Mode double effects, GSAP callbacks or carousel logic calling `play()` and `pause()` in quick succession cause "The play() request was interrupted" errors and stutter. Keep a single owner of play state per video and clean up every listener.
- **Black or blank first frame.** Show a poster image identical to frame 1, and fade the video in only after its first frame is painted (`requestVideoFrameCallback`, falling back to the `playing` event).
- **Too many videos decoding at once.** If the hero cycles through several videos:
  - Only the **current** video plays. Only the **next** one preloads (`preload="auto"`). All others use `preload="none"` and stay paused.
  - Prefer two `<video>` elements that swap sources (A/B crossfade) over N elements that all autoplay.
  - Crossfade only after the incoming video fires `playing`, or its first frame callback runs. Never on a timer alone.
  - Use `opacity` to hide inactive videos, not `display: none` (that throws away decoded frames and causes a flash when shown again). Do not call `load()` repeatedly.
- **GPU contention.** A live R3F canvas, a second WebGL renderer (`renderStills`), GSAP intro animations and video decoding all compete during the first seconds:
  - If videos replace the 3D hero, **unmount `HeroScene` completely** (and remove its dynamic import from the hero).
  - If both must stay, render only one at a time, and pause the canvas (`frameloop="never"`) while video plays.
- **Expensive layers on top of the video.** `backdrop-filter: blur()` on the fixed header (`.top`) forces the browser to re-blur on every video frame. Replace it with a solid or semi-opaque background while over the hero (for example `rgba(255,255,255,.94)`), or apply the blur only after the hero has scrolled out of view. Do the same check for `filter`, `mix-blend-mode` and large shadows over the video.
- **Off-screen and background playback.** Pause the video when the hero is out of view (IntersectionObserver) and when the tab is hidden (`visibilitychange`). Resume when it returns.
- **Intro overlap.** The logo intro covers the hero for about 3 seconds. Start **loading** the video immediately, but start **playback** when the intro finishes (pass an `active` prop), so decoding does not compete with the intro animation.
- **Loop hitch.** Encode with a keyframe at the start and a short GOP (`-g` equal to 2 × fps) so the `loop` point does not stutter.
- **Mobile viewport jumps.** If the hero uses `100vh`, the iOS address bar resizing causes relayouts and jitter. Use `100svh` (with a `100vh` fallback first).

### 1b. Encode the videos

Create `scripts/encode-videos.sh`, a re-runnable script that reads every file in `/media-originals/` and outputs these renditions to `public/videos/`. Put a short content hash or version in the file names (e.g. `hero-1-v2-1080.mp4`) so they can be cached forever.

```bash
# Desktop 1080p H.264 MP4: plays everywhere, fast start, no audio
ffmpeg -y -i IN -an -vf "scale='min(1920,iw)':-2,fps=30" \
  -c:v libx264 -preset slow -crf 23 -profile:v high -pix_fmt yuv420p \
  -g 60 -keyint_min 60 -sc_threshold 0 -movflags +faststart OUT-1080.mp4

# Desktop 1080p VP9 WebM: smaller, for Chrome/Firefox/Edge
ffmpeg -y -i IN -an -vf "scale='min(1920,iw)':-2,fps=30" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
  -g 60 OUT-1080.webm

# Mobile 720p versions: same commands with scale='min(1280,iw)':-2 and CRF +2

# Poster: the exact first frame, as WebP (and JPG fallback)
ffmpeg -y -i OUT-1080.mp4 -frames:v 1 -q:v 2 OUT-poster.jpg
ffmpeg -y -i OUT-poster.jpg -c:v libwebp -quality 80 OUT-poster.webp
```

The `-preset slow` encode is a one-time cost and gives smaller files. Use `-preset veryfast` while testing.

**Budgets** (per video, for a 10–15 s loop): desktop ≤ 5 MB, mobile ≤ 2.5 MB, poster ≤ 150 KB. If a video cannot meet the budget, shorten it or raise the CRF slightly, and check that it still looks good. If the videos are long (over about 20 s) or there are many of them, note in the report that a streaming host with HLS (Mux, Cloudflare Stream, Bunny Stream) would be the next step. Do not implement it unless budgets cannot be met.

Verify each output: `ffprobe` shows `moov` before `mdat`, there is no audio stream, and the size is within budget.

### 1c. Build one robust video component

Create `src/components/HeroVideo.tsx` (client component) and use it for every hero video. Use this reference implementation and adapt it to how the hero currently works (single video, or a sequence). It has already been type-checked against this project.

```tsx
'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type VideoSource = { src: string; type: string };

type Props = {
  desktop: VideoSource[]; // define as module-level constants, best format first (webm, then mp4)
  mobile: VideoSource[];
  poster: string;         // exact first frame of the video, so the swap is invisible
  active?: boolean;       // false while the intro covers the hero or the hero is off screen
};

type NetInfo = { saveData?: boolean; effectiveType?: string };

export default function HeroVideo({ desktop, mobile, poster, active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [sources, setSources] = useState<VideoSource[] | null>(null);
  const [ready, setReady] = useState(false);

  // Pick one rendition on the client, once. No video at all for reduced motion / data saver.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return;
    setSources(window.matchMedia('(max-width: 768px)').matches ? mobile : desktop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play / pause. Muted must be set as a property: React may leave the attribute out of the
  // server HTML, and browsers block unmuted autoplay.
  useEffect(() => {
    const v = ref.current;
    if (!v || !sources) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    if (!active) { v.pause(); return; }

    let cancelled = false;
    const resume = () => { v.play().catch(() => {}); };
    const tryPlay = () => {
      if (cancelled || document.hidden) return;
      // Blocked (iOS Low Power Mode, data saver): keep the poster, retry on first tap.
      v.play().catch(() => window.addEventListener('pointerdown', resume, { once: true }));
    };
    const onVisibility = () => (document.hidden ? v.pause() : tryPlay());

    if (v.readyState >= 3) tryPlay(); else v.addEventListener('canplay', tryPlay, { once: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelled = true;
      v.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointerdown', resume);
      v.pause();
    };
  }, [sources, active]);

  // Fade the video in only once a real frame is on screen (no black flash).
  useEffect(() => {
    const v = ref.current;
    if (!v || !sources) return;
    const show = () => setReady(true);
    if (typeof v.requestVideoFrameCallback === 'function') {
      const id = v.requestVideoFrameCallback(show);
      return () => v.cancelVideoFrameCallback(id);
    }
    v.addEventListener('playing', show, { once: true });
    return () => v.removeEventListener('playing', show);
  }, [sources]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Image src={poster} alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      {sources && (
        <video
          ref={ref}
          muted
          playsInline
          loop
          preload="auto"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: ready ? 1 : 0, transition: 'opacity .6s ease' }}
        >
          {sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
        </video>
      )}
    </div>
  );
}
```

Wire it up in `Hero.tsx`:

- `active` = intro finished **and** hero visible (reuse the hero's IntersectionObserver). Expose "intro finished" from `Intro.tsx`, for example with a small `introDone` event on `window` or a tiny React context. Do not poll.
- For a sequence of videos, extend this into an A/B player following the rules in 1a (current plays, next preloads, crossfade on first frame, the rest `preload="none"`). Advance with the video's `ended` event (remove `loop` for sequences) rather than a fixed timer, so a slow load never cuts a clip short.
- The poster is the LCP element. It must use `next/image` with `priority` and the correct `sizes`.

### 1d. Serve and cache the videos properly

In `next.config.ts`, add long-lived cache headers for versioned media:

```ts
async headers() {
  return [
    { source: '/videos/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
  ];
},
```

Only do this because file names are versioned (1b). Confirm range requests work on the production server: `curl -sI -H "Range: bytes=0-1023" http://localhost:3000/videos/FILE.mp4` must return `206 Partial Content`. Safari will not play video without it.

---

## Phase 2: WebGL / React Three Fiber

- **Remove runtime still rendering.** `renderStills` (`src/lib/three/renderStills.ts`) builds six full scenes on the main thread during page load. Replace it with **static images generated once**:
  - Write a small script (Playwright is fine) that renders each project scene and saves `public/images/<project>.webp` at 1600px wide (quality about 80).
  - Set `image:` for each project in `src/data/projects.ts`.
  - Remove the runtime render path from `ProjectImagesProvider` (keep the provider or replace it with direct `next/image` use).
  - Real photos will drop in the same way later.
- **Project images** in `Projects.tsx` and the menu: use `next/image` with correct `sizes`. Before fading a new carousel slide in, preload and `decode()` the next image, so slide changes never flash blank. Preload the next and previous slide images when idle.
- **Villa canvas (`VillaScene.tsx`) renders forever** once mounted, even after it scrolls away. Fix:
  - Pause it when off screen (IntersectionObserver → `frameloop="never"`).
  - Ideally switch to `frameloop="demand"` and call `invalidate()` only while the camera, zoom, spin or floor animation is still easing, or a hover state changes. Stop invalidating once values have converged (difference < 0.0005).
- **Static shadows.** The lights and geometry do not move (only the camera does), so set `gl.shadowMap.autoUpdate = false` and set `gl.shadowMap.needsUpdate = true` only when something changes (floor switch, view change, during the floor-drop animation). Use a 1024 shadow map on mobile.
- **Draw calls.** `villaModel.ts` and `scenes.ts` create hundreds of separate box meshes, each with its own geometry. Reduce draw calls without changing the look:
  - Share one unit `BoxGeometry` and scale meshes, or better, merge static meshes per material with `mergeGeometries` from `three/examples/jsm/utils/BufferGeometryUtils.js`. Keep room slabs separate because they need hover and click.
  - Log `gl.info.render.calls` before and after, and put both numbers in the report.
- **Adaptive quality.** Wrap canvases with drei `<PerformanceMonitor>` to lower `dpr` (minimum 1) when FPS drops, and cap `dpr` at 1.5 on mobile.
- **Panels over the canvas.** `.panel` uses `backdrop-filter: blur(14px)` on top of a canvas that redraws every frame. That is very expensive. Replace it with a near-opaque solid background (for example `rgba(17,17,15,.94)`) that looks almost the same.
- Make sure every geometry, material and renderer is disposed on unmount (check `disposeObject` covers everything, and the hero canvas if it stays).
- Make sure no more than one WebGL context is alive at a time where possible. Report how many exist at peak (`document.querySelectorAll('canvas').length` plus any off-screen renderers).

---

## Phase 3: GSAP, scrolling and React effects

- **Remove `scroll-behavior: smooth` from CSS** (`base.css`). The site already smooth-scrolls in JS, and CSS smooth scrolling is known to make ScrollTrigger jumpy and miscalculate on refresh.
- Call `ScrollTrigger.refresh()` once after fonts load (`document.fonts.ready`), after the intro unlocks scrolling, and after any lazily mounted section changes page height. Set `ScrollTrigger.config({ ignoreMobileResize: true })`.
- **Listener leaks.**
  - `Why.tsx` adds `pointermove` and `pointerleave` listeners inside `useGSAP` without removing them. Return a cleanup function.
  - Audit every `addEventListener`, `IntersectionObserver`, `ResizeObserver`, `setTimeout` and `requestAnimationFrame` in `src/` for a matching cleanup.
  - Check under Strict Mode in dev that nothing is registered twice.
- **Carousel race conditions** (`Projects.tsx`). Make rapid clicking on arrows and floating cards safe: no stuck `busy` flag, no half-finished timelines, no state set after unmount. Kill the in-flight timeline before starting a new one.
- **Philosophy section.** The `onUpdate` toggles classes on every word on every scroll tick. Only touch words whose lit state actually changed.
- **Scroll reveal** (`ScrollReveal.tsx`). Make sure elements already in the viewport on load are not visibly pushed down and then animated up (no jump on load). Elements above the fold should start in place.
- **Intro safety.** If JavaScript loads slowly, the page must never stay locked or hidden. Check the 6-second fallback in `layout.tsx` works together with `Intro.tsx`, and that the header logo never ends up invisible.
- Animate only `transform` and `opacity`. Check that nothing animates `width`, `height`, `top`, `left`, `filter`, `clip-path` or `box-shadow` during scroll. If the hero `clip-path` intro transition is costly with a playing video, replace it with a `transform: scale()` reveal that looks the same.
- Use `will-change` only on elements that are actively animating, and remove it afterwards. Do not leave it on permanently.
- Scroll and pointer handlers must be `passive` where possible and must not cause React re-renders on every event.

---

## Phase 4: CSS paint and layout cost

- List every `backdrop-filter`, `filter`, large `box-shadow` (blur ≥ 40px), `mix-blend-mode` and `position: fixed` layer. For each one over moving content (video, canvas, animated elements), replace it with a cheaper equivalent that looks the same, or limit it to when it is static.
- Floating project cards use `filter: brightness()` with a transition and heavy shadows while moving with parallax. Replace the filter with an overlay `::after` whose `opacity` changes (same look, much cheaper).
- Check with DevTools → Rendering → **Paint flashing** and **Layer borders** while scrolling and while the hero video plays. Nothing large should repaint every frame except the video and the active canvas.
- Fix any layout shift (CLS): reserve space for images, video, canvases and fonts. Target CLS < 0.05.

---

## Phase 5: Assets, fonts, JavaScript and caching

- **Fonts.**
  - Only load the weights actually used.
  - Make sure `font-display: swap` is in effect.
  - Preload the two most important fonts: the headline serif and the body font.
  - Check there is no visible layout jump when fonts swap. Use fallback metric overrides (`size-adjust`) if needed.
- **JavaScript.**
  - Run Next's bundle analyzer for this Next version (check the Next 16 docs for the correct command) and record the largest chunks.
  - `three`, `@react-three/fiber` and `drei` must load **only** in the chunks for the 3D components (`next/dynamic` with `ssr: false`), never in the initial page bundle.
  - Delete unused code and dependencies (for example `renderStills` once Phase 2 removes it).
  - Load GSAP plugins only where used.
- **Images.** Everything goes through `next/image` with explicit `sizes`. Only the hero poster has `priority`. Everything else is lazy.
- **Lazy sections.** The villa scene already mounts near the viewport. Make sure its JS chunk also loads only then (start the dynamic import about 600px before it enters view).
- **Caching headers** for `/videos/*`, `/images/*` and fonts (immutable for versioned files).
- **Third parties.** Make sure nothing loads from external domains at runtime (fonts are self-hosted).

---

## Phase 6: Bug and glitch sweep

Go through the site carefully on the production build and fix everything you find:

- [ ] Zero errors and zero warnings in the browser console, apart from the known R3F `THREE.Clock` deprecation notice, which comes from the library.
- [ ] No React hydration warnings. Check `Footer.tsx`'s `new Date().getFullYear()` and anything else that differs between server and client.
- [ ] Menu: opens and closes cleanly, closes with Escape, nav links scroll to the right place, and rapid open/close does not break it.
- [ ] Carousel: rapid clicking works, images never flash blank, and the counter is always right.
- [ ] Villa: views, floors, rotate, zoom, hover and click selection all work. The specifications list and the 3D model stay in sync. Touch drag works on mobile without blocking page scroll.
- [ ] Process steps, Why cards, Philosophy sun and word lighting all behave correctly, including when you scroll fast or jump straight to a section from the menu.
- [ ] Contact form validation works.
- [ ] `prefers-reduced-motion`: no video autoplay (poster only), no parallax or tilt, everything still readable and usable.
- [ ] No horizontal scrolling at 390px width, and no layout jumps on iPhone Safari when the address bar shows or hides.
- [ ] Browser back/forward and reloading on a `#section` URL land in the right place without the intro breaking it.
- [ ] Leaving the tab and returning: videos resume, canvases resume, no burst of queued animations.

---

## Phase 7: Verify and report

Test on the production build in Chrome, Safari and Firefox on desktop, and on an iPhone (or Safari's responsive mode plus a real device if available) and an Android phone.

**Video test, which must pass every time:** do 10 hard reloads (Cmd+Shift+R) on desktop and 10 on mobile, with cache disabled and "Fast 4G" throttling. The hero video must start every time:
- within about 1.5 s after the intro ends on desktop
- with the poster visible instantly
- with no black frame and no stutter at the loop point
- also when coming back to the tab after 5 minutes in the background

**Targets** (Lighthouse on the production build):

| Metric | Mobile | Desktop |
|---|---|---|
| Performance score | ≥ 85 | ≥ 95 |
| LCP | < 2.5 s | < 1.5 s |
| CLS | < 0.05 | < 0.05 |
| TBT | < 200 ms | < 100 ms |
| Initial JS (gzipped) | as small as possible; 3D libraries not in the initial bundle | |

Smooth scrolling at 60 fps on a mid-range laptop with no long tasks over 50 ms during scroll (DevTools Performance, no throttling), and no sustained drops below 50 fps with 4× CPU slowdown.

**Write `perf/REPORT.md`** with:

1. A before/after table for every metric above, plus page weight, video sizes, draw calls and the number of WebGL contexts.
2. Every problem found (from `perf/AUDIT.md`), the fix applied and the file(s) changed.
3. Anything you could not fix or meet, why, and the recommended next step.
4. Anything that changed visually, however small.

Then run `npm run build` one final time, make sure it passes, and commit.
