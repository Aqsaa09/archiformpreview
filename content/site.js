/**
 * Business details used across the site (header, footer, contact page, SEO, emails).
 * TODO before launch: replace every value marked PLACEHOLDER.
 */
export const site = {
  name: 'ARCHIFORM Design Studio',
  shortName: 'ARCHIFORM',
  tagline: 'Thoughtful Interiors. Healthy Living.',
  description:
    'A Dubai-based interior design studio where timeless aesthetics meet a thoughtful approach to healthy living.',
  // Your live domain. Vercel also lets you set NEXT_PUBLIC_SITE_URL instead.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.archiform.com', // PLACEHOLDER
  email: 'hello@archiform.com', // PLACEHOLDER
  phone: '', // PLACEHOLDER e.g. '+971 50 000 0000' (hidden while empty)
  whatsapp: '', // PLACEHOLDER digits only, e.g. '971500000000' (hidden while empty)
  instagram: '', // PLACEHOLDER e.g. 'archiform.studio' (hidden while empty)
  address: {
    city: 'Dubai',
    country: 'United Arab Emirates',
    street: '', // PLACEHOLDER (hidden while empty)
  },
  hours: 'By appointment only',
  founder: 'Roula Jbour',
};
