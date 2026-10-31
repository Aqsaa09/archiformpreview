'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { imageSize } from '@/content/images';
import { coverImage } from '@/content/projects';

const ORDER = ['Bedrooms', 'Dining & Kitchen', 'Bathrooms', 'Details', 'Outdoor'];
// Three columns on desktop, two on tablets, one on phones
const SIZES = '(max-width: 600px) 92vw, (max-width: 1000px) 45vw, 30vw';

/* Filter tabs over a three-column grid of every project. A tab shows only when a project uses its category. */
export default function ProjectGrid({ projects }) {
  const used = new Set(projects.map((p) => p.category));
  const tabs = ['All', ...ORDER.filter((c) => used.has(c)), ...[...used].filter((c) => !ORDER.includes(c))];
  const [tab, setTab] = useState('All');
  const shown = tab === 'All' ? projects : projects.filter((p) => p.category === tab);

  return (
    <>
      <div className="pf-tabs" role="group" aria-label="Filter projects">
        {tabs.map((t) => (
          <button key={t} type="button" aria-pressed={tab === t} aria-controls="projects" onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <p className="sr" role="status">{tab === 'All' ? `Showing all ${shown.length} projects` : `Showing ${shown.length} ${tab} ${shown.length === 1 ? 'project' : 'projects'}`}</p>
      <div className="pf-grid" id="projects">
        {shown.map((p, i) => {
          const [w, h] = imageSize(p.cover);
          const cover = coverImage(p);
          return (
          <Link key={p.slug} href={`/portfolio/${p.slug}`}>
            <span className="ph">
              {/* The first cover is the largest thing on screen on arrival (LCP), so it loads first; the rest load as they near the screen */}
              <Image src={p.cover} alt={cover.alt} width={w} height={h} sizes={SIZES}
                loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : undefined} />
              {cover.kind === 'visualisation' ? <span className="vis-tag">Design visualisation</span> : null}
            </span>
            <h2>{p.name}</h2>
            <p>{p.sub}</p>
          </Link>
          );
        })}
      </div>
    </>
  );
}
