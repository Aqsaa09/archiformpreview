'use client';

import { useEffect, useRef } from 'react';

/* A short silent loop of the printed feature. React does not write the muted attribute into the server HTML, so the video is
   muted and started here once it mounts; visitors who prefer reduced motion see the still poster instead. */
export default function PressClip() {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src="/v/journal-press-2.mp4"
      poster="/v/journal-press-2.jpg"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Leafing through the She Means Business feature on Roula Jbour, published by Gulf News"
    />
  );
}
