import Image from 'next/image';
import PageCta from '@/components/PageCta';

/* About Us: the founder beside her portrait, the approach beside the vase still life, the studio on olive, then the invitation */
export default function FounderContent() {
  return (
    <main id="founder">
      <section className="ab-hero">
        <div className="tx">
          <h1 className="lbl">About Us</h1>
          <h2 className="nm">Roula Jbour</h2>
          <p className="lbl rule">Founder &amp; interior designer</p>
          <p className="it tag">Designing spaces that care for the people within them.</p>
          <p className="body">My journey began in healthcare, where I came to see how deeply our surroundings shape the way we feel: the morning light, the materials we live with, the air we breathe.</p>
          <p className="body">That belief led me to found ARCHIFORM, bringing together two passions that have always felt connected: people and spaces. I love the creative process, but I care just as much about the details that make a home comfortable and easy to live in.</p>
          <p className="body">Because a home should never feel like a showroom. It should feel like you.</p>
          <p className="it sig">- Roula Jbour<br />Founder &amp; Interior Designer, ARCHIFORM</p>
        </div>
        <div className="ph">
          <Image src="/m/roula.jpg" alt="Roula Jbour, founder of ARCHIFORM" width={980} height={1600} sizes="(max-width: 900px) 100vw, 54vw" loading="eager" fetchPriority="high" />
          <p className="words"><span>Design</span><span>People</span><span>Wellbeing</span><span>Balance</span></p>
        </div>
      </section>

      <section className="ab-approach" id="philosophy">
        <div className="qp"><Image src="/m/vase.jpg" alt="Olive branches in a stone vase" width={584} height={892} sizes="(max-width: 900px) 100vw, 50vw" /><p>“A home should feel like you.”</p></div>
        <div className="tx">
          <p className="lbl rule">ARCHIFORM Approach</p>
          <h2 className="h2">What if your home could feel as good as it looks?</h2>
          <p className="body">Informed by a background in healthcare, we consider lighting, ventilation, cooling and materials alongside intuitive layouts and timeless aesthetics.</p>
          <div className="pillars" id="design-principles">
            <div><svg viewBox="0 0 70 104" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><use href="#sprig"/></svg><span className="lbl">01. Wellbeing by Design</span><span className="it">Light, airflow and materials that feel good to live with.</span></div>
            <div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M5 19 20 5l15 14v16H5z"/></svg><span className="lbl">02. Function with Purpose</span><span className="it">Intuitive layouts that work around everyday life.</span></div>
            <div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><circle cx="15" cy="20" r="11"/><circle cx="25" cy="20" r="11"/></svg><span className="lbl">03. Timeless Aesthetics</span><span className="it">Authentic materials and proportions beyond trends.</span></div>
            <div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true"><circle cx="20" cy="20" r="7"/><path d="M20 3v6M20 31v6M3 20h6M31 20h6M8 8l4.2 4.2M27.8 27.8 32 32M8 32l4.2-4.2M27.8 12.2 32 8"/></svg><span className="lbl">04. Personal Connection</span><span className="it">Your home should tell your story, not ours.</span></div>
          </div>
        </div>
      </section>

      <section className="ab-studio" id="about-archiform" aria-labelledby="aboutTitle">
        <p className="lbl rule">ABOUT ARCHIFORM</p>
        <div className="r">
          <h2 className="h2" id="aboutTitle">A more thoughtful way to <em>create home.</em></h2>
          <div className="cols">
            <p className="body">We spend so much of our lives within four walls, yet we often focus more on how a space looks than how it makes us feel. At ARCHIFORM, we believe the two should never be separate.</p>
            <p className="body">Based in Dubai, we specialise in interior design, residential renovations and project management, creating homes that are truly lived in, loved and felt.</p>
          </div>
        </div>
      </section>

      <PageCta />
    </main>
  );
}
