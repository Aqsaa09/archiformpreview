import Link from 'next/link';
import Arrow from './Arrow';

/* Closing invitation shared by About Us, Services and Portfolio */
export default function PageCta() {
  return (
    <section className="cta-band" aria-labelledby="ctaTitle">
      <div className="a">
        <p className="lbl rule">Let’s create yours</p>
        <h2 className="ttl" id="ctaTitle">Thoughtful interiors.<br /><em>Lasting spaces.</em></h2>
      </div>
      <div className="b">
        <p>Every project begins with a conversation.<br />If you’re ready to create a space that feels balanced, functional and truly yours, I’d love to hear from you.</p>
        <Link className="go" href="/contact">Get in touch <Arrow /></Link>
      </div>
    </section>
  );
}
