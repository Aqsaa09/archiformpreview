import PageCta from '@/components/PageCta';
import { projects } from '@/content/projects';
import ProjectGrid from './ProjectGrid';

export const metadata = {
  title: 'Portfolio',
  description: 'Residential interiors and renovations across Dubai, each planned around light, air and the people who live there.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return (
    <>
    <main className="page pf-page" id="portfolio">
      <div className="pg-ttl pf-ttl">
        <p className="lbl rule">OUR PROJECTS</p>
        <h1 className="disp">Beautifully considered. Personally lived.</h1>
        <p className="body">Homes shaped by refined materials, layered textures and thoughtful details, each as individual as the people who live there.</p>
      </div>
      <ProjectGrid projects={projects} />
    </main>
    <PageCta />
    </>
  );
}
