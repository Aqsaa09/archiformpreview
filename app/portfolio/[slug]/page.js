import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Arrow from '@/components/Arrow';
import { projects, getProject, coverImage } from '@/content/projects';
import { imageSize } from '@/content/images';
import { site } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const [width, height] = imageSize(p.cover);
  return pageMeta({
    title: `${p.name}, ${p.location}`,
    description: `${p.intro} ${p.type} by ARCHIFORM: ${p.did.toLowerCase()}.`,
    path: `/portfolio/${p.slug}`,
    image: { url: p.cover, width, height, alt: coverImage(p).alt || p.name },
  });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${site.url}/portfolio` },
      { '@type': 'ListItem', position: 3, name: p.name, item: `${site.url}/portfolio/${p.slug}` },
    ],
  };
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
        {p.images.map((img, i) => {
          const [w, h] = imageSize(img.src);
          return (
            <figure key={img.src + i} className={img.wide ? 'w' : undefined}>
              <Image src={img.src} alt={img.alt} width={w} height={h}
                sizes={img.wide ? '(max-width: 820px) 92vw, 88vw' : '(max-width: 820px) 46vw, 44vw'}
                loading={i < 2 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : undefined} />
              {img.kind === 'visualisation' ? <figcaption className="vis-tag">Design visualisation</figcaption> : null}
            </figure>
          );
        })}
      </div>
      <div className="pj-meta">
        <div><span className="lbl">Location</span><span>{p.location}</span></div>
        <div><span className="lbl">Type</span><span>{p.type}</span></div>
        <div style={{ gridColumn: 'span 2' }}><span className="lbl">What we did</span><span>{p.did}</span></div>
      </div>
      <div className="pj-next">
        <Link className="go" href="/portfolio">All projects <Arrow /></Link>
        <Link className="n" href={`/portfolio/${next.slug}`}><span className="sr">Next project: </span>{next.name} <Arrow /></Link>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </main>
  );
}
