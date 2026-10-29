import Link from 'next/link';

export default function FounderContent() {
  return (
    <main className="page" id="founder">
      <div className="f-hero">
        <div className="tx">
          <p className="lbl rule">Founder &amp; interior designer</p>
          <h1 className="disp">Roula Jbour</h1>
          <p className="it" style={{fontSize: 'clamp(26px,2.6vw,36px)'}}>Spaces that support the way you live.</p>
          <p className="body">With a background in healthcare and a deep belief in the power of environment on wellbeing, I founded ARCHIFORM to bring together my two passions: people and spaces.</p>
          <p className="body">After years working in the medical field, I realised that true wellness extends beyond physical health. It also lives in the spaces we inhabit. This led me to interior design, where I now combine creativity, functionality and an understanding of how spaces affect our physical and mental wellbeing.</p>
          <p className="body">As founder and interior designer at ARCHIFORM, I take a holistic approach: aesthetics and execution, and also healthy living environments. Every project reflects how I believe a space should feel: calm, functional, inspiring and tailored to the people who live in it.</p>
          <p className="words f-words" style={{display: 'flex', gap: '10px 24px', flexWrap: 'wrap', fontStyle: 'italic', fontSize: '22px'}}><span>Design</span><span>People</span><span>Wellbeing</span><span>Balance</span></p>
        </div>
        <div className="ph"><img src="/m/roula.jpg" alt="Roula Jbour, founder of ARCHIFORM" /></div>
      </div>
      <div className="approach">
        <div className="qp"><img src="/m/vase.jpg" alt="Olive branches in a stone vase" loading="lazy" /><p>“A home should feel like you.”</p></div>
        <div className="tx">
          <p className="lbl rule">My approach</p>
          <p className="body">Great design is about more than beautiful finishes. It is about spaces that enhance your lifestyle and support your wellbeing. From concept to completion I work closely with each client, bringing together design, planning and project management for a seamless, thoughtful journey.</p>
          <p className="body">Whether it is a villa, a family home or a renovation, the goal is the same: interiors that feel balanced, functional and timeless.</p>
          <div className="pillars">
            <div><svg viewBox="0 0 70 104" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><use href="#sprig"/></svg><span className="lbl">Holistic design</span><span className="it">for well-being</span></div>
            <div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M5 19 20 5l15 14v16H5z"/></svg><span className="lbl">Functional spaces</span><span className="it">for everyday life</span></div>
            <div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><circle cx="15" cy="20" r="11"/><circle cx="25" cy="20" r="11"/></svg><span className="lbl">Refined aesthetics</span><span className="it">for timeless living</span></div>
            <div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true"><circle cx="20" cy="20" r="7"/><path d="M20 3v6M20 31v6M3 20h6M31 20h6M8 8l4.2 4.2M27.8 27.8 32 32M8 32l4.2-4.2M27.8 12.2 32 8"/></svg><span className="lbl">Healthy environments</span><span className="it">for a better you</span></div>
          </div>
        </div>
      </div>
      <div className="page-cta"><p className="h2" style={{fontStyle: 'italic'}}>Let’s create a space that feels like you.</p><Link className="btn" href="/contact">Get in touch <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link></div>
    </main>
  );
}
