// Latin subsets only: the site is in English, and the full sets added ~40 KB of render-blocking @font-face rules.
import '@fontsource/cormorant-garamond/latin-300.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-300-italic.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/jost/latin-300.css';
import '@fontsource/jost/latin-400.css';
import '@fontsource/jost/latin-500.css';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SvgSprites from '@/components/SvgSprites';
import { site } from '@/content/site';
import { services } from '@/content/services';
import { ogImage } from '@/lib/seo';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.titleTail}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_AE',
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/m/favicon.png', apple: '/m/favicon.png' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ECE3E2',
};

// Structured data so search engines understand the business. Only details from content/site.js are used;
// empty placeholders (phone, street, Instagram) are left out rather than guessed.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesigner',
  '@id': `${site.url}/#studio`,
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/m/logo-dark.png`,
  image: `${site.url}${ogImage.url}`,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.instagram ? { sameAs: [`https://instagram.com/${site.instagram}`] } : {}),
  founder: { '@type': 'Person', name: site.founder },
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressCountry: 'AE',
    ...(site.address.street ? { streetAddress: site.address.street } : {}),
  },
  areaServed: { '@type': 'City', name: 'Dubai' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Interior design services',
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.text } })),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#content">Skip to content</a>
        <SvgSprites />
        <Header />
        <div id="content" tabIndex={-1} />
        {children}
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
