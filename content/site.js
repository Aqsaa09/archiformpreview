/**
 * Business details used across the site (header, footer, contact page, SEO, emails).
 * TODO before launch: replace every value marked PLACEHOLDER.
 */
export const site = {
  name: 'ARCHIFORM Design Studio',
  shortName: 'ARCHIFORM',
  tagline: 'Thoughtful Interiors. Healthy Living.',
  // Second half of the home page title, after the studio name
  titleTail: 'Interior design in Dubai',
  description:
    'Dubai interior design studio for villas and apartments. Interior design, renovation, bespoke joinery and project management, with healthy living built in.',
  // Your live domain. Vercel also lets you set NEXT_PUBLIC_SITE_URL instead.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.archiform.com', // PLACEHOLDER
  email: 'hello@archiformdesign.me',
  phone: '+971 50 160 5312',
  whatsapp: '971501605312', // digits only, same number as the phone
  instagram: '', // PLACEHOLDER e.g. 'archiform.studio' (hidden while empty)
  address: {
    city: 'Dubai',
    country: 'United Arab Emirates',
    street: '', // PLACEHOLDER (hidden while empty)
  },
  hours: 'By appointment only',
  founder: 'Roula Jbour',
};
