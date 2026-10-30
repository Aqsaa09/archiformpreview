import Link from 'next/link';
import Arrow from './Arrow';

/* Closing invitation shared by About Us, Services and Portfolio */
export default function PageCta() {
  return (
    <section className="cta-band" aria-labelledby="ctaTitle">
      <div className="a">
        <h2 className="ttl" id="ctaTitle">Thoughtful interiors. <em>Lasting spaces.</em></h2>
      </div>
      <div className="b">
        <p>Every project begins with a conversation.</p>
        <Link className="go" href="/contact">Get in touch <Arrow /></Link>
      </div>
    </section>
  );
}
