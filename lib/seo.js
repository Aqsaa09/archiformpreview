import { site } from '@/content/site';

export const ogImage = { url: '/og.jpg', width: 1200, height: 630, alt: 'The arched entrance of an ARCHIFORM home' };

/**
 * Page metadata with a canonical URL and matching Open Graph tags. Next.js replaces (not merges) a parent's
 * openGraph object, so every page builds the full set here instead of relying on the root layout.
 */
export function pageMeta({ title, description, path, image }) {
  return {
    // Leave title out when not given, so the root layout's default title applies
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_AE',
      url: path,
      title: title ? `${title} | ${site.name}` : `${site.name} | ${site.titleTail}`,
      description,
      images: [image || ogImage],
    },
  };
}
