import { site } from '@/content/site';
import { projects } from '@/content/projects';

export default function sitemap() {
  const now = new Date();
  const pages = ['', '/founder', '/portfolio', '/services', '/contact'].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({
    url: `${site.url}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));
  return [...pages, ...work];
}
