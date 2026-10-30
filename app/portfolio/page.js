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
        <p className="lbl rule">OUR PROJECTS</p>
        <h1 className="disp">Beautifully considered. Personally lived.</h1>
        <p className="body">Every home has its own rhythm, character and story.</p>
        <p className="body">At ARCHIFORM, we believe beautiful interiors should be as individual as the people who live within them.</p>
        <p className="body">Our projects bring together refined materials, layered textures, thoughtful functionality and carefully considered details. Each space is designed to feel personal, balanced and welcoming.</p>
        <p className="body">Explore a collection of homes shaped by our belief in timeless design and better everyday living.</p>
      </div>
      <div className="grid-p" id="projects">
        <Link className="lead" href={`/portfolio/${lead.slug}`}>
          <span className="ph"><img src={lead.cover} alt={lead.name} /></span>
          <span className="tx">
            <span className="lbl rule">Featured project</span>
            <h3>{lead.name}</h3>
            <p>{lead.sub} | {lead.location}</p>
            <p>{lead.intro}</p>
            <p>For this private villa, our vision was to create interiors that feel effortlessly connected, combining soft neutral tones, natural textures and timeless details.</p>
            <p>From bespoke joinery to carefully considered furnishing and styling, the design brings together sophistication and everyday comfort, creating a home that feels calm, personal and beautifully lived in.</p>
            <span className="go">VIEW PROJECT <Arrow /></span>
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
      <div className="page-cta"><p className="h2">Every project begins with a conversation. Every beautiful home begins with understanding.</p></div>
    </main>
  );
}
