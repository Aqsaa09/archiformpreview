import Link from 'next/link';
import Faq from './Faq';
import ServiceList from './ServiceList';
import PageCta from '@/components/PageCta';
import { services } from '@/content/services';

export const metadata = {
  title: 'Services',
  description: 'Interior design, renovations, furnishing and project management in Dubai, with healthy-home thinking built into every stage.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
    <main className="page sv-page" id="services">
      <div className="sv-wrap">
        <div className="pg-ttl sv-ttl">
          <p className="lbl">WHAT WE DO</p>
          <h1 className="disp">Every detail considered. Every space thoughtfully created.</h1>
          <p className="body">From refreshing a single room to a complete home transformation, we guide you through each stage with care, clarity and attention to detail.</p>
        </div>
        <ServiceList services={services} />
      </div>
      <div className="page-cta">
        <Link className="btn" href="/contact">DISCUSS YOUR PROJECT →</Link>
      </div>
      <Faq />
    </main>
    <PageCta />
    </>
  );
}
