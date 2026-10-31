import PageCta from '@/components/PageCta';
import { projects } from '@/content/projects';
import ProjectGrid from './ProjectGrid';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Interior Design Portfolio',
  description: 'Villa and apartment interiors, renovations and bespoke joinery by ARCHIFORM in Dubai: bedrooms, bathrooms, kitchens, dining rooms and terraces.',
  path: '/portfolio',
});

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
