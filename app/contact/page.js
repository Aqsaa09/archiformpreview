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
        <p className="lbl rule">LET'S CREATE YOUR SPACE</p>
        <h1 className="disp">A beautiful home begins with a conversation.</h1>
        <p className="body">Whether you're planning a complete villa renovation, refreshing your interiors or simply exploring what's possible, we'd love to hear your story.</p>
        <p className="body">Tell us about the space you have and the home you imagine.</p>
        <p className="body">We'll listen, explore your ideas and help you take the first steps toward an interior that feels beautiful, balanced and uniquely yours.</p>
      </div>
      <div className="ct">
        <div className="l">
          <div><span className="lbl">ARCHIFORM</span><span>Interior Design &amp; Project Management</span><span>Dubai, United Arab Emirates</span></div>
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
      <div className="page-cta"><p className="h2">Let's create a space that feels like you.</p></div>
    </main>
  );
}
