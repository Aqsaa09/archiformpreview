import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/300-italic.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource/jost/300.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SvgSprites from '@/components/SvgSprites';
import { site } from '@/content/site';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Healthy interior design in Dubai`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_AE',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'The arched entrance of an ARCHIFORM home' }],
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

// Structured data so search engines understand the business.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesigner',
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  founder: { '@type': 'Person', name: site.founder },
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressCountry: 'AE',
    ...(site.address.street ? { streetAddress: site.address.street } : {}),
  },
  areaServed: 'Dubai',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SvgSprites />
        <Header />
        {children}
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
