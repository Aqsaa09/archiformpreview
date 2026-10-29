import Link from 'next/link';
import { notFound } from 'next/navigation';
import Arrow from '@/components/Arrow';
import { projects, getProject } from '@/content/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.intro,
    alternates: { canonical: `/portfolio/${p.slug}` },
    openGraph: { images: [{ url: p.cover, alt: p.images[0]?.alt || p.name }] },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <main className="page" id="project">
      <div className="pj-head">
        <div className="l">
          <p className="lbl rule">{p.type} · {p.location}</p>
          <h1 className="disp">{p.name}</h1>
          <p className="lbl">{p.sub}</p>
        </div>
        <div className="r">
          <p className="intro">{p.intro}</p>
          <p className="body">{p.text}</p>
        </div>
      </div>
      <div className="pj-imgs">
        {p.images.map((img, i) => (
          <img key={img.src + i} className={img.wide ? 'w' : undefined} src={img.src} alt={img.alt} loading={i > 1 ? 'lazy' : undefined} />
        ))}
      </div>
      <div className="pj-meta">
        <div><span className="lbl">Location</span><span>{p.location}</span></div>
        <div><span className="lbl">Type</span><span>{p.type}</span></div>
        <div style={{ gridColumn: 'span 2' }}><span className="lbl">What we did</span><span>{p.did}</span></div>
      </div>
      <div className="pj-next">
        <Link className="go" href="/portfolio">All projects <Arrow /></Link>
        <Link className="n" href={`/portfolio/${next.slug}`}>{next.name} <Arrow /></Link>
      </div>
    </main>
  );
}
