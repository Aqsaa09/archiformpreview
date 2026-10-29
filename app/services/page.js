import Faq from './Faq';
import { services } from '@/content/services';

export const metadata = {
  title: 'Services',
  description: 'Interior design, renovations, furnishing and project management in Dubai, with healthy-home thinking built into every stage.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <main className="page" id="services">
      <div className="pg-ttl">
        <p className="lbl rule">From concept to completion</p>
        <h1 className="disp">Services</h1>
        <p className="body">One studio from the first conversation to the final walkthrough, with healthy-home thinking built into every stage.</p>
      </div>
      <div>
        {services.map((s) => (
          <div className="svc" key={s.name}>
            <h2>{s.name}<span className="it">{s.tagline}</span></h2>
            <p>{s.text}</p>
            <div className="ph"><img src={s.image} alt={s.alt} loading="lazy" /></div>
          </div>
        ))}
      </div>
      <Faq />
    </main>
  );
}
