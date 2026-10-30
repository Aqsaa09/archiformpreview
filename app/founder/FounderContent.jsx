import Link from 'next/link';

export default function FounderContent() {
  return (
    <main className="page" id="founder">
      <div className="f-hero">
        <div className="tx">
          <p className="lbl rule">Founder &amp; interior designer</p>
          <h1 className="disp">About Us</h1>
          <h2 className="h2">Roula Jbour</h2>
          <p className="it" style={{fontSize: 'clamp(26px,2.6vw,36px)'}}>Designing spaces that care for the people within them.</p>
          <p className="body">Before I discovered my passion for interior design, my professional journey began in healthcare.</p>
          <p className="body">Working in the medical field gave me a deeper appreciation for wellbeing, and for the many factors that influence how we feel in our everyday lives.</p>
          <p className="body">Over time, I became increasingly aware that our surroundings are part of that story too.</p>
          <p className="body">The natural light that welcomes us in the morning. The comfort of a room after a long day. The materials we live with, the air we breathe, and the quiet sense of balance a thoughtfully designed space can offer.</p>
          <p className="body">These observations inspired me to pursue interior design and eventually establish ARCHIFORM, bringing together two passions that have always felt closely connected: people and spaces.</p>
          <p className="body">Today, I approach each project with the belief that beautiful interiors should serve a purpose beyond aesthetics.</p>
          <p className="body">Of course, I love the creative process - selecting beautiful materials, exploring textures, shaping spaces and bringing a vision to life. But I care just as deeply about the practical details that make a home comfortable, functional and supportive of everyday wellbeing.</p>
          <p className="body">For me, the most rewarding part of interior design isn't simply seeing a finished space. It's knowing that the people who live there can feel truly at home.</p>
          <p className="body">I want every project to reflect its owners, honour their routines and bring a lasting sense of ease and belonging.</p>
          <p className="body">Because a home should never feel like a showroom.</p>
          <p className="body">It should feel like you.</p>
          <p className="it">- Roula Jbour<br />Founder &amp; Interior Designer, ARCHIFORM</p>
          <p className="words f-words" style={{display: 'flex', gap: '10px 24px', flexWrap: 'wrap', fontStyle: 'italic', fontSize: '22px'}}><span>Design</span><span>People</span><span>Wellbeing</span><span>Balance</span></p>
        </div>
        <div className="ph"><img src="/m/roula.jpg" alt="Roula Jbour, founder of ARCHIFORM" /></div>
      </div>
        <section className="hl-intro" id="about-archiform" aria-labelledby="aboutTitle">
          <p className="lbl rule">ABOUT ARCHIFORM</p>
          <h2 className="h2" id="aboutTitle">A more thoughtful way to <em>create home.</em></h2>
          <p className="body">We spend so much of our lives within four walls. They witness our quiet mornings, our family gatherings, our everyday routines and our most meaningful moments.</p>
          <p className="body">Yet, when it comes to creating beautiful homes, we sometimes focus more on how a space looks than how it makes us feel.</p>
          <p className="body">At ARCHIFORM, we believe the two should never be separate.</p>
          <p className="body">Founded on the belief that our surroundings play an important role in everyday wellbeing, ARCHIFORM brings a different perspective to residential interior design.</p>
          <p className="body">We look beyond aesthetics to consider the details that shape daily life, from comfort and functionality to lighting, ventilation and material choices.</p>
          <p className="body">Our designs embrace quiet elegance, natural textures, balanced layouts and refined details. But beneath every beautiful finish lies something equally important: the intention to create a home that supports the life within it.</p>
          <p className="body">Based in Dubai, ARCHIFORM specialises in interior design, residential renovations and project management, bringing creativity and considered execution together in every project.</p>
          <p className="body">We don't believe in designing spaces simply to be admired. We believe in creating homes that are truly lived in, loved and felt.</p>
          <p className="body">True luxury is living beautifully, every day.</p>
        </section>

      <div className="approach" id="philosophy">
        <div className="qp"><img src="/m/vase.jpg" alt="Olive branches in a stone vase" loading="lazy" /><p>“A home should feel like you.”</p></div>
        <div className="tx">
          <p className="lbl rule">ARCHIFORM Approach</p>
          <h2 className="h2">What if your home could feel as good as it looks?</h2>
          <p className="body">Wellbeing also lives in the spaces where we spend our days. Our founder's background in healthcare informs a design philosophy that considers comfort, everyday functionality and the indoor environment alongside timeless aesthetics.</p>
          <p className="body">We consider lighting, ventilation, cooling, moisture prevention and material suitability, alongside intuitive layouts that support activity, connection, privacy and rest.</p>
          <p className="body">Because healthy living isn't about adding another feature to your home. It's about approaching the entire design with a greater understanding of the people who live there.</p>
          <Link className="go" href="#design-principles" style={{alignSelf: 'flex-start'}}>DISCOVER OUR APPROACH →</Link>
          <p className="body">Our philosophy is built around four essential principles:</p>
          <div className="pillars" id="design-principles">
            <div><svg viewBox="0 0 70 104" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><use href="#sprig"/></svg><span className="lbl">01. Wellbeing by Design</span><span className="it">A beautiful home should also feel good to live in. We consider lighting, airflow, indoor comfort and material selections as part of a more holistic approach to interiors.</span></div>
            <div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M5 19 20 5l15 14v16H5z"/></svg><span className="lbl">02. Function with Purpose</span><span className="it">Good design works effortlessly around everyday life. We create intuitive layouts, considered storage and practical solutions that make your home feel naturally comfortable.</span></div>
            <div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><circle cx="15" cy="20" r="11"/><circle cx="25" cy="20" r="11"/></svg><span className="lbl">03. Timeless Aesthetics</span><span className="it">We believe lasting beauty comes from thoughtful proportions, authentic materials, elegant details and spaces that feel relevant beyond passing trends.</span></div>
            <div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true"><circle cx="20" cy="20" r="7"/><path d="M20 3v6M20 31v6M3 20h6M31 20h6M8 8l4.2 4.2M27.8 27.8 32 32M8 32l4.2-4.2M27.8 12.2 32 8"/></svg><span className="lbl">04. Personal Connection</span><span className="it">Your home should tell your story, not ours. Every decision begins with understanding your personality, priorities and the way you want to live.</span></div>
          </div>
          <p className="body">The result is a home that feels balanced, refined and unmistakably personal.</p>
        </div>
      </div>
      <div className="page-cta"><p className="h2" style={{fontStyle: 'italic'}}>Let’s create a space that feels like you.</p><Link className="btn" href="/contact">Get in touch <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link></div>
    </main>
  );
}
