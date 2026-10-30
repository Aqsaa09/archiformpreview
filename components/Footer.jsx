import { site } from '@/content/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="siteFoot" className="foot" style={{ color: 'var(--fg)' }}>
      <span>
        © {year} {site.name} · {site.address.city}
        <br />{site.tagline}
      </span>
      <span className="c">
        <img src="/m/mark.png" alt="" width="460" height="380" />
      </span>
      <span>
        {site.instagram ? (
          <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" style={{ marginRight: 20, textDecoration: 'none' }}>
            Instagram
          </a>
        ) : null}
        <a className="sel" href={`mailto:${site.email}`} style={{ textDecoration: 'none' }}>
          {site.email}
        </a>
      </span>
    </footer>
  );
}
