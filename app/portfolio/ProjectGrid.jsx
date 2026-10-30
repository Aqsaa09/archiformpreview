'use client';

import Link from 'next/link';
import { useState } from 'react';

const ORDER = ['Bedrooms', 'Dining & Kitchen', 'Bathrooms', 'Details', 'Outdoor'];

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
          <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="pf-grid" id="projects">
        {shown.map((p) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`}>
            <span className="ph"><img src={p.cover} alt={p.name} loading="lazy" /></span>
            <h3>{p.name}</h3>
            <p>{p.sub}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
