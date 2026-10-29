import ContactForm from '@/components/ContactForm';
import { site } from '@/content/site';

export const metadata = {
  title: 'Contact',
  description: 'Start a project with ARCHIFORM. Interior design and renovations in Dubai, by appointment.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const domain = site.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <main className="page" id="contact">
      <div className="pg-ttl">
        <p className="lbl rule">{site.address.city}, {site.address.country}</p>
        <h1 className="disp">Contact</h1>
        <p className="it" style={{ fontSize: 'clamp(24px,2.4vw,32px)' }}>Every project begins with a conversation.</p>
      </div>
      <div className="ct">
        <div className="l">
          <div><span className="lbl">Email</span><a className="sel" href={`mailto:${site.email}`} style={{ textDecoration: 'none' }}>{site.email}</a></div>
          {site.phone ? (
            <div><span className="lbl">Phone</span><a href={`tel:${site.phone.replace(/\s/g, '')}`} style={{ textDecoration: 'none' }}>{site.phone}</a></div>
          ) : null}
          {site.whatsapp ? (
            <div><span className="lbl">WhatsApp</span><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Message us</a></div>
          ) : null}
          {site.instagram ? (
            <div><span className="lbl">Instagram</span><a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>@{site.instagram}</a></div>
          ) : null}
          <div><span className="lbl">Website</span><span>{domain}</span></div>
          <div>
            <span className="lbl">Studio</span>
            {site.address.street ? <span>{site.address.street}</span> : null}
            <span>{site.address.city}, UAE</span>
            <span>{site.hours}</span>
          </div>
        </div>
        <div className="r">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
