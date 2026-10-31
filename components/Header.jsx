'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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
// The logo is drawn at 84px on phones and up to 128px on desktop
const LOGO_SIZES = '(max-width: 820px) 84px, 128px';

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
  const menuRef = useRef(null);
  const openBtn = useRef(null);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the phone menu is open: lock page scroll, move focus into it and keep Tab inside it; Escape closes it.
  // On close, focus returns to the menu button.
  useEffect(() => {
    if (!open) return undefined;
    const menu = menuRef.current;
    const btn = openBtn.current;
    document.body.style.overflow = 'hidden';
    menu.querySelector('button')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const items = [...menu.querySelectorAll('a[href], button')];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      btn?.focus({ preventScroll: true });
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
            <Image className="dk" src="/m/logo-dark.webp" alt={site.name} width={520} height={352} sizes={LOGO_SIZES} loading="eager" />
            <Image className="lt" src="/m/logo-light.webp" alt="" width={520} height={352} sizes={LOGO_SIZES} />
          </Link>
          <nav className="r" aria-label="Secondary">
            {RIGHT.map((l) => (
              <NavLink key={l.href} {...l} pathname={pathname} />
            ))}
          </nav>
          <button
            ref={openBtn}
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

      <div ref={menuRef} className="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
        <button className="x" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
          <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
            <path d="M2 2l18 18M20 2 2 20" stroke="currentColor" />
          </svg>
        </button>
        <Link href="/" aria-current={isHome ? 'page' : undefined}>Home</Link>
        {[...LEFT, ...RIGHT].map((l) => (
          <NavLink key={l.href} {...l} pathname={pathname} />
        ))}
        <a className="lbl" href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </>
  );
}
