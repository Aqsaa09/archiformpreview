import Link from 'next/link';
import Arrow from '@/components/Arrow';
import { projects } from '@/content/projects';

export const metadata = {
  title: 'Portfolio',
  description: 'Residential interiors and renovations across Dubai, each planned around light, air and the people who live there.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const [lead, ...rest] = projects;
  return (
    <main className="page" id="portfolio">
      <div className="pg-ttl">
        <p className="lbl rule">Selected projects</p>
        <h1 className="disp">Portfolio</h1>
        <p className="body">Residential interiors and renovations across Dubai, each planned around light, air and the people who live there.</p>
      </div>
      <div className="grid-p">
        <Link className="lead" href={`/portfolio/${lead.slug}`}>
          <span className="ph"><img src={lead.cover} alt={lead.name} /></span>
          <span className="tx">
            <span className="lbl rule">Featured project</span>
            <h3>{lead.name}</h3>
            <p>{lead.intro}</p>
            <span className="go">View project <Arrow /></span>
          </span>
        </Link>
        {rest.map((p) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`}>
            <span className="ph"><img src={p.cover} alt={p.name} loading="lazy" /></span>
            <h3>{p.name}</h3>
            <p>{p.sub}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
