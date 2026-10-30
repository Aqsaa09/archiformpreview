'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/content/site';

const LEFT = [
  { href: '/founder', label: 'About Us' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
];
const RIGHT = [
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

function NavLink({ href, label, pathname }) {
  const current = pathname === href || pathname.startsWith(href + '/');
  return (
    <Link href={href} aria-current={current ? 'page' : undefined}>
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname() || '/';
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll while the phone menu is open; Escape closes it.
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Off the home page the header always uses the dark logo on the linen background.
  useEffect(() => {
    if (isHome) return;
    const root = document.documentElement;
    ['--hfg', '--ll', '--bg', '--fg', '--rule'].forEach((p) => root.style.removeProperty(p));
    document.getElementById('hdr')?.classList.remove('tuck');
  }, [isHome]);

  return (
    <>
      <header className={'hdr' + (isHome ? ' is-home' : '')} id="hdr">
        <div className="hdr-in">
          <nav aria-label="Primary">
            {LEFT.map((l) => (
              <NavLink key={l.href} {...l} pathname={pathname} />
            ))}
          </nav>
          <Link className="brand" href="/" aria-label={`${site.name}, home`}>
            <img className="dk" src="/m/logo-dark.webp" alt={site.name} width="520" height="352" />
            <img className="lt" src="/m/logo-light.webp" alt="" width="520" height="352" />
          </Link>
          <nav className="r" aria-label="Secondary">
            {RIGHT.map((l) => (
              <NavLink key={l.href} {...l} pathname={pathname} />
            ))}
          </nav>
          <button
            className="menu-btn"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(true)}
          >
            <svg width="26" height="10" viewBox="0 0 26 10" aria-hidden="true">
              <path d="M0 1h26M6 9h20" stroke="currentColor" />
            </svg>
          </button>
        </div>
      </header>

      <div className="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
        <button className="x" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
          <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
            <path d="M2 2l18 18M20 2 2 20" stroke="currentColor" />
          </svg>
        </button>
        <Link href="/">Home</Link>
        {[...LEFT, ...RIGHT].map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <p className="lbl">{site.email}</p>
      </div>
    </>
  );
}
