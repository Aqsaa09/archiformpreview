import Link from 'next/link';
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
        <p className="lbl rule">WHAT WE DO</p>
        <h1 className="disp">Every detail considered. Every space thoughtfully created.</h1>
        <p className="body">Creating a home you love should be an inspiring experience.</p>
        <p className="body">At ARCHIFORM, we offer a considered approach to interior design and residential renovations, combining creative vision, technical coordination and an understanding of everyday living.</p>
        <p className="body">Whether you're refreshing a single space or undertaking a complete home transformation, we guide you through each stage with care, clarity and attention to detail.</p>
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
      <div className="page-cta">
        <Link className="btn" href="/contact">DISCUSS YOUR PROJECT →</Link>
      </div>
      <Faq />
      <section className="service-insights" aria-labelledby="insights-title">
        <h2 className="h2" id="insights-title">Thoughts on thoughtful living</h2>
        <div className="service-insights-grid">
          <article>
            <h3 className="h2">01. The Art of Healthy Living: Why Your Home Environment Matters</h3>
            <p className="body">Exploring how light, ventilation, materials and spatial comfort contribute to a more thoughtful approach to home design.</p>
          </article>
          <article>
            <h3 className="h2">02. Luxury You Can Feel: Redefining the Meaning of a Beautiful Home</h3>
            <p className="body">Why true luxury is often found in comfort, functionality and the quiet details that enhance everyday life.</p>
          </article>
          <article>
            <h3 className="h2">03. Designing for Natural Light: Bringing Balance into Your Home</h3>
            <p className="body">How thoughtful lighting and spatial planning can create interiors that feel warmer, brighter and more welcoming.</p>
          </article>
          <article>
            <h3 className="h2">04. Timeless Over Trendy: Creating Interiors That Age Beautifully</h3>
            <p className="body">An exploration of natural materials, balanced proportions and enduring design choices.</p>
          </article>
          <article>
            <h3 className="h2">05. Beyond the Surface: Choosing Materials for a Healthier Home</h3>
            <p className="body">Why material selection deserves consideration for both aesthetic quality and suitability for your indoor environment.</p>
          </article>
          <article>
            <h3 className="h2">06. Renovating Your Home in Dubai: Where Should You Begin?</h3>
            <p className="body">A practical introduction to defining your vision, planning your renovation and approaching the process with confidence.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
