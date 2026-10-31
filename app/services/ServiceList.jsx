'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { imageSize } from '@/content/images';

/* The services list with its name set letter by letter down both margins. The rails follow the service crossing mid-screen. */
export default function ServiceList({ services }) {
  const [active, setActive] = useState(0);
  const list = useRef(null);

  useEffect(() => {
    const rows = [...list.current.children];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(rows.indexOf(e.target)); });
    }, { rootMargin: '-50% 0px -50% 0px' });
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const rail = services[active].rail;
  return (
    <>
      <div className="vrail l" aria-hidden="true"><span key={rail}>{rail}</span></div>
      <div className="vrail r" aria-hidden="true"><span key={rail}>{rail}</span></div>
      <div ref={list}>
        {services.map((s) => (
          <div className="svc" key={s.name}>
            <h2>{s.name}<span className="it">{s.tagline}</span></h2>
            <p>{s.text}</p>
            <div className="ph"><Image src={s.image} alt={s.alt} width={imageSize(s.image)[0]} height={imageSize(s.image)[1]} sizes="(max-width: 820px) 92vw, 30vw" /></div>
          </div>
        ))}
      </div>
    </>
  );
}
