import ContactForm from '@/components/ContactForm';
import { site } from '@/content/site';

export const metadata = {
  title: 'Contact',
  description: 'Start a project with ARCHIFORM. Interior design and renovations in Dubai, by appointment.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="page ct-page" id="contact">
      <div className="pg-ttl ct-ttl">
        <p className="lbl">LET'S CREATE YOUR SPACE</p>
        <h1 className="disp">A beautiful home begins with a conversation.</h1>
      </div>
      <div className="ct">
        <div className="l">
          <p className="body">Whether you're planning a villa renovation or refreshing a single room, tell us about your space and the home you imagine.</p>
          <div className="info">
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
            <div>
              <span className="lbl">Studio</span>
              {site.address.street ? <span>{site.address.street}</span> : null}
              <span>{site.address.city}, UAE</span>
              <span>{site.hours}</span>
            </div>
          </div>
        </div>
        <div className="r">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
