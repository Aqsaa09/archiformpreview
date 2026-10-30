import Link from 'next/link';
import Arrow from '@/components/Arrow';
import PageCta from '@/components/PageCta';
import { projects } from '@/content/projects';
import ProjectGrid from './ProjectGrid';

export const metadata = {
  title: 'Portfolio',
  description: 'Residential interiors and renovations across Dubai, each planned around light, air and the people who live there.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const [lead] = projects;
  return (
    <>
    <main className="page pf-page" id="portfolio">
      <div className="pg-ttl pf-ttl">
        <p className="lbl rule">OUR PROJECTS</p>
        <h1 className="disp">Beautifully considered. Personally lived.</h1>
        <p className="body">Every home has its own rhythm, character and story.</p>
        <p className="body">At ARCHIFORM, we believe beautiful interiors should be as individual as the people who live within them.</p>
        <p className="body">Our projects bring together refined materials, layered textures, thoughtful functionality and carefully considered details. Each space is designed to feel personal, balanced and welcoming.</p>
        <p className="body">Explore a collection of homes shaped by our belief in timeless design and better everyday living.</p>
      </div>
      <ProjectGrid projects={projects} />
      <div className="grid-p pf-feature">
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
      </div>
    </main>
    <PageCta />
    </>
  );
}
