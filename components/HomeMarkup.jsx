import Link from 'next/link';

/* Markup for the home page scroll story. Element ids are used by lib/home-story.js. */
export default function HomeMarkup() {
  return (
    <>
      <div className="loader" id="loader" aria-hidden="true">
        <img className="ld-logo" id="ldLogo" src="/m/logo-dark.webp" alt="" width="520" height="352" />
        <p className="ld-cue" id="ldCue">Scroll to explore</p>
        <div className="meta"><span>Dubai · 25.20° N, 55.27° E</span><span id="ldPct">000</span></div>
      </div>
      <div id="vp" aria-hidden="true"></div>
      <main id="home">
        <section className="stage" id="stage" aria-label="Interiors designed around you">
          <div className="vis" id="heroVis">
            <div className="wall" id="wall" aria-hidden="true"><img className="entry" id="entryImg" src="/m/entry-wide-v2.webp" alt="" width="4000" height="1800" fetchPriority="high" /></div>
            <div className="view" id="view">
              <div className="scene" id="scene">
                <img className="skybg" id="skybg" src="/m/sky-dusk.jpg" alt="" width="1200" height="675" />
                <div className="sunglow"></div>
                <div className="dusk" id="dusk"></div>
                {/* Holistic design: a 3D garden on a travertine podium. Each cut-out stands at its own depth (--x, --z, --w in units of --u) */}
                <div className="land" id="land" aria-hidden="true">
                  <div className="lean" id="lean">
                    <div className="rig" id="rig">
                      <div className="pod">
                        <i><b style={{'--x': 0, '--z': .04, '--sw': 1.34, '--sh': .14}} /><b className="lt" style={{'--x': -.2, '--z': .1, '--sw': .5, '--sh': .18}} /><b style={{'--x': -.66, '--z': -.16, '--sw': .3}} /><b style={{'--x': .68, '--z': -.1, '--sw': .3}} /></i>
                        <i style={{'--d': 2}} />
                      </div>
                      <div className="ly haze" style={{'--x': 0, '--z': -.45, '--w': 3.2, '--y': -.02}}><span /></div>
                      <div className="ly glow" style={{'--x': -.05, '--z': -.04, '--w': 1.7}}><span /></div>
                      <div className="ly sway palm pl" style={{'--x': -.66, '--z': -.18, '--w': .3}}><img data-src="/m/hol/palm-fan.webp" alt="" width="663" height="1100" fetchPriority="low" /></div>
                      <div className="ly sway palm pr" style={{'--x': .68, '--z': -.12, '--w': .32}}><img data-src="/m/hol/palm-date.webp" alt="" width="709" height="1100" fetchPriority="low" /></div>
                      <div className="ly hs" id="hsLy" style={{'--x': 0, '--z': 0, '--w': 1.2}}><img data-src="/m/hol/house.webp" alt="" width="1877" height="688" fetchPriority="low" /></div>
                      <div className="ly bed" style={{'--x': -.5, '--z': .08, '--w': .4, '--y': -.008}}><img data-src="/m/hol/grass.webp" alt="" width="1400" height="407" fetchPriority="low" /></div>
                      <div className="ly bed" style={{'--x': .5, '--z': .06, '--w': .4, '--y': -.008}}><img data-src="/m/hol/shrubs.webp" alt="" width="1400" height="419" fetchPriority="low" /></div>
                      <div className="ly bed" style={{'--x': .22, '--z': .12, '--w': .3, '--y': -.004}}><img data-src="/m/hol/agave.webp" alt="" width="1400" height="391" fetchPriority="low" /></div>
                      <div className="ly hc" style={{'--x': 0, '--z': .04, '--w': .6, '--y': .455}}>
                        <div className="hcard"><span className="ic"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="7"/><path d="M20 3v6M20 31v6M3 20h6M31 20h6M8 8l4.2 4.2M27.8 27.8 32 32M8 32l4.2-4.2M27.8 12.2 32 8"/></svg></span><span className="nm">Sun &amp;<br />shade</span></div>
                        <div className="hcard"><span className="ic"><svg viewBox="0 0 40 40"><path d="M4 14h20a5 5 0 1 0-5-5M4 21h28a5 5 0 1 1-5 5M4 28h12"/></svg></span><span className="nm">Fresh<br />air</span></div>
                        <div className="hcard"><span className="ic"><svg viewBox="0 0 40 40"><path d="M20 5c6 8.5 10 14 10 20a10 10 0 0 1-20 0c0-6 4-11.5 10-20z"/><path d="M15 26a5 5 0 0 0 5 5"/></svg></span><span className="nm">Cool<br />water</span></div>
                        <div className="hcard"><span className="ic"><svg viewBox="0 0 70 104"><use href="#sprig"/></svg></span><span className="nm">Living<br />green</span></div>
                        <div className="hcard"><span className="ic"><svg viewBox="0 0 40 40"><circle cx="14" cy="13" r="5"/><circle cx="27" cy="15" r="4"/><path d="M5 35c0-7 4-12 9-12s9 5 9 12M20 35c1-6 4-10 7-10s7 4 7 10"/></svg></span><span className="nm">The people<br />inside</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hol" id="holText">
                  <p className="lbl">Holistic design</p>
                  <h2 className="h2">One house, designed as a <em>living system.</em></h2>
                  <p className="body">We map how a home works with its setting through the day and the year: sun, air, water, planting and the people inside. Every layer is designed together.</p>
                </div>
              </div>
              <div className="reelclip" id="reelclip">
                <div className="reel" id="reel">
                <video data-clip="0" muted playsInline preload="none" aria-hidden="true"></video>
                <video data-clip="1" data-src="/v/h-walk-v2.mp4" data-msrc="/v/h-walk-m.mp4" poster="/v/h-walk-v2.jpg" data-mposter="/v/h-walk-m.jpg" muted playsInline preload="auto" aria-label="Walking into a calm open-plan living room with tall windows and plants"></video>
                <video data-clip="2" data-src="/v/h-light-v2.mp4" data-msrc="/v/h-light-m.mp4" poster="/v/h-light-v2.jpg" data-mposter="/v/h-light-m.jpg" muted loop playsInline preload="none" aria-label="A child dancing through squares of sunlight on a wooden floor"></video>
                <video data-clip="3" data-src="/v/h-air-v2.mp4" data-msrc="/v/h-air-m.mp4" poster="/v/h-air-v2.jpg" data-mposter="/v/h-air-m.jpg" muted loop playsInline preload="none" aria-label="Sheer curtains lifting in the breeze at an open balcony door while a child rocks in a chair"></video>
                <video data-clip="4" data-src="/v/h-green-v2.mp4" data-msrc="/v/h-green-m.mp4" poster="/v/h-green-v2.jpg" data-mposter="/v/h-green-m.jpg" muted loop playsInline preload="none" aria-label="A breeze moving sheer curtains beside indoor planting in a soft, neutral living room"></video>
                <video data-clip="5" data-src="/v/h-flow-v2.mp4" data-msrc="/v/h-flow-m.mp4" poster="/v/h-flow-v2.jpg" data-mposter="/v/h-flow-m.jpg" muted playsInline preload="none" aria-label="A living room where the blinds come down and warm evening lights come on around a conversation seating group"></video>
                </div>
              </div>
              <svg className="inshade" aria-hidden="true"><defs><filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="12"/></filter></defs><path id="shPath" fill="none" stroke="rgba(52,40,28,.4)" strokeWidth="34" filter="url(#sh)"/></svg>
            </div>
            <div className="dim" id="dim" aria-hidden="true"></div>
            <div className="portal" id="portal" aria-hidden="true">
              <svg className="bez" id="bez"></svg>
              <div className="doors" id="doors"><div className="glow" id="dglow"></div><div className="leaf l" id="leafL"></div><div className="leaf r" id="leafR"></div></div>
            </div>

            <h1 className="sr" style={{position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)'}}>Beautiful spaces. Better living.</h1>
            <p className="hh a" id="hhA" aria-hidden="true">Beautiful<br />{' '}<em>spaces.</em></p>
            <p className="hh b" id="hhB" aria-hidden="true">Better<br />{' '}living.</p>
            <div className="hb" id="hb">
              <h2>INTERIORS DESIGNED AROUND YOU</h2>
              <hr />
              <p>A beautiful home is more than a place to live. It is where you unwind, reconnect, recharge and feel most like yourself.</p>
            </div>
            <ul className="hv lbl" id="hv" aria-label="What we design for"><li>Thoughtful Interiors.</li><li>Healthy Living.</li><li>Timeless Spaces.</li></ul>
            <div className="hcta" id="hcta"><Link className="p" href="/portfolio">EXPLORE OUR WORK →</Link><Link className="c" href="/contact" aria-label="Book a design consultation"><svg width="20" height="24" viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 47V19A15 15 0 0 1 35 19V47"/><use href="#sprig" x="11" y="14" width="20" height="30" strokeWidth="1.2"/></svg></Link></div>

            <div className="scroll-cue" id="cue" aria-hidden="true"><span>Scroll to enter</span><i /></div>

            <div className="say" id="sayH">
              <p className="lbl">Healthy living, by design</p>
              <p className="disp">What you feel the moment you walk in.</p>
              <p className="it">Designed for the way you live. Considered for the way you feel.</p>
            </div>
          </div>
          <div className="hl-panels" id="hlPanels">
              <div className="pane">
                <svg className="ic" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true"><circle cx="20" cy="20" r="7"/><path d="M20 3v6M20 31v6M3 20h6M31 20h6M8 8l4.2 4.2M27.8 27.8 32 32M8 32l4.2-4.2M27.8 12.2 32 8"/></svg>
                <h3>Natural Light</h3>
                <p className="it">Thoughtful lighting that helps create bright, inviting and comfortable interiors.</p>
              </div>
              <div className="pane">
                <svg className="ic" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true"><path d="M4 14h20a5 5 0 1 0-5-5M4 21h28a5 5 0 1 1-5 5M4 28h12"/></svg>
                <h3>Comfort &amp; Airflow</h3>
                <p className="it">Consideration for ventilation, cooling and everyday indoor comfort.</p>
              </div>
              <div className="pane">
                <svg className="ic" viewBox="0 0 70 104" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><use href="#sprig"/></svg>
                <h3>Considered Materials</h3>
                <p className="it">Finishes and materials selected with beauty, suitability and indoor wellbeing in mind.</p>
              </div>
              <div className="pane">
                <svg className="ic" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true"><path d="M5 5h30v30H5zM5 18h11M24 18h11M18 35V24"/><path d="M10 30c4-6 10-3 13-9s7-6 9-8" strokeDasharray="2 3"/></svg>
                <h3>Functional Living</h3>
                <p className="it">Intuitive spaces designed around real routines, personal needs and lasting comfort.</p>
              </div>
          </div>
          <ol className="hl-index" id="hlIndex" aria-hidden="true"><li className="on">Natural Light</li><li>Comfort &amp; Airflow</li><li>Considered Materials</li><li>Functional Living</li></ol>
        </section>

        <section className="dt" id="dt" aria-labelledby="dtTitle">
          <div className="dt-in">
            <div className="dt-head">
              <p className="lbl rule">The quieter details</p>
              <h2 className="h2" id="dtTitle">What else makes a home <em>healthy.</em></h2>
              <p className="body">Beyond light, air and plants, these are the elements we check on every project. Most are invisible once the room is finished. You notice them in how you sleep, breathe and feel at the end of the day.</p>
            </div>
            <div className="cards" id="cards">
              <article className="card"><div className="ph"><img src="/m/vase.jpg" alt="Olive branches in a stone vase on a travertine table" loading="lazy" /></div><h3>Natural materials</h3><p>Finishes you can live close to.</p><ul><li>Low-VOC paints</li><li>Timber, stone, lime plaster</li><li>Linen, cotton, wool</li></ul></article>
              <article className="card"><div className="ph"><img src="/m/bath-2.jpg" alt="Stone bathroom with a walk-in shower and oak vanity" loading="lazy" style={{objectPosition: '30% 50%'}} /></div><h3>Clean air &amp; humidity</h3><p>AC runs most of the year here, so the air needs care.</p><ul><li>AC servicing &amp; filters</li><li>Moisture prevention</li><li>Dust-aware detailing</li></ul></article>
              <article className="card"><div className="ph"><img src="/m/bed-evening.jpg" alt="Bedroom at dusk lit by a soft lamp" loading="lazy" /></div><h3>Layered light</h3><p>Light that follows the day.</p><ul><li>Bright task light by day</li><li>Warm, low light after sunset</li><li>Lamps &amp; dimmers</li></ul></article>
              <article className="card"><div className="ph"><img src="/m/panels.jpg" alt="Upholstered wall panels behind a bed" loading="lazy" /></div><h3>Acoustic calm</h3><p>Quiet is a comfort too.</p><ul><li>Upholstered panels</li><li>Rugs &amp; full curtains</li><li>Soft-close joinery</li></ul></article>
              <article className="card"><div className="ph"><img src="/m/dining.jpg" alt="Dining room with full-height linen curtains" loading="lazy" /></div><h3>Thermal comfort</h3><p>Cooler rooms with less effort.</p><ul><li>Curtains against afternoon heat</li><li>Shaded outdoor rooms</li><li>Cool stone underfoot</li></ul></article>
              <article className="card"><div className="ph"><img src="/m/vanity.jpg" alt="Sculpted dressing wall with built-in shelves and a backlit mirror" loading="lazy" style={{objectPosition: '40% 50%'}} /></div><h3>Considered storage</h3><p>Less clutter, a calmer mind.</p><ul><li>Bespoke joinery</li><li>A place for everything</li><li>Surfaces easy to clean</li></ul></article>
            </div>
          </div>
        </section>

        <section className="hl-intro featured-intro" aria-labelledby="fxTitle">
          <p className="lbl rule" id="fxTitle">Featured project</p>
        </section>

        <section className="stage stage2" id="fstage" aria-label="Seaside Villa, featured project">
          <div className="vis">
            <div className="fvid" id="fvid"><video id="vFeat" data-src="/v/feature-blended.mp4" data-msrc="/v/feature-blended-m.mp4" poster="/v/feature-blended.jpg" muted playsInline preload="none" aria-label="A woman at a balcony rail facing the sea turns around, then sits on the bed in a calm, light-filled bedroom"></video><div className="fshade" id="fshade"></div></div>
            <div className="say" id="sayA" aria-hidden="true">
              <p className="lbl">Fresh air</p>
              <p className="disp">It begins with the air you breathe.</p>
            </div>
            <div className="say" id="sayB" aria-hidden="true">
              <p className="disp">Now turn around.</p>
              <p className="it">The breeze comes straight through the house.</p>
            </div>

            <div className="feat" id="feat">
              <p className="lbl rule">Featured project</p>
              <h2>Seaside Villa</h2>
              <p className="sub">Interior renovation &amp; styling</p>
              <p className="body">A complete renovation of a private villa where warm neutrals, natural textures and timeless design come together. Rooms open to light and the sea air, with bespoke joinery, refined finishes and a calm, layered feel for everyday living.</p>
              <dl>
                <div><dt>Location</dt><dd>Dubai, UAE</dd></div>
                <div><dt>Type</dt><dd>Villa renovation</dd></div>
                <div><dt>Services</dt><dd>Interior design, project management, joinery, styling</dd></div>
              </dl>
              <div className="acts">
                <Link className="btn" href="/portfolio">View portfolio <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link>
                <Link className="go" href="/portfolio/seaside-villa">The full project <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link>
              </div>
            </div>
            <p className="it feat-q" id="featQ" style={{position: 'absolute', right: 'var(--side)', bottom: 'calc(30px + env(safe-area-inset-bottom,0px))', color: 'var(--paper)', fontSize: 'clamp(22px,2vw,28px)', textShadow: '0 2px 20px rgba(62,49,34,.45)'}}>“A home should feel like you.”</p>
          </div>
        </section>

        <section className="home-process" id="homeProcess" aria-labelledby="processTitle">
          <div className="process-layout">
            <div className="process-media" aria-hidden="true">
              <div className="process-visual">
                <div className="process-frame"><img src="/m/process-visit.webp" alt="" width="860" height="860" loading="lazy" /></div>
                <div className="process-frame"><img src="/m/process-materials.webp" alt="" width="860" height="860" loading="lazy" /></div>
                <div className="process-frame"><img src="/m/process-joinery.webp" alt="" width="860" height="1012" loading="lazy" /></div>
                <div className="process-frame"><img src="/m/bed.jpg" alt="" loading="lazy" /></div>
                <div className="process-founder"><img className="process-founder-portrait" src="/m/roula.jpg" alt="" loading="lazy" /></div>
              </div>
            </div>
            <div className="process-copy">
              <div className="process-heading">
                <h2 className="h2" id="processTitle">From first visit to final finish.</h2>
              </div>
              <div className="process-window">
                <ol className="process-steps">
                  <li><span className="lbl">01</span><h3 className="h2">Consultation</h3><p className="body">We visit and listen.</p></li>
                  <li><span className="lbl">02</span><h3 className="h2">Concept and materials</h3><p className="body">Light and airflow first, then finishes.</p></li>
                  <li><span className="lbl">03</span><h3 className="h2">Joinery and finishes</h3><p className="body">Thoughtful details, carefully coordinated.</p></li>
                  <li><span className="lbl">04</span><h3 className="h2">Furnishing and styling</h3><p className="body">The finishing touches that make it yours.</p></li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="fd" id="fdTeaser" aria-labelledby="fdName">
          <div className="ph"><img src="/m/roula.jpg" alt="Roula Jbour, founder of ARCHIFORM, leaning against a white wall" loading="lazy" /></div>
          <div className="tx">
            <p className="lbl rule">THE PERSON BEHIND THE PERSPECTIVE</p>
            <h2 className="disp" id="fdName">Meet Roula.</h2>
            <p className="body">With a background in healthcare and training in interior design, Roula Jbour brings together two passions: caring for people and creating beautiful spaces.</p>
            <p className="it">“I believe the true beauty of a space is not only in what you see, but in how comfortably and naturally you can live within it.”</p>
            <p className="lbl">ROULA JBOUR — FOUNDER, ARCHIFORM</p>
            <Link className="go" href="/founder" style={{alignSelf: 'flex-start'}}>MEET THE FOUNDER <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link>
          </div>
        </section>

        <div className="wordmark-band" id="wordmark" aria-hidden="true"><p className="wordmark">ARCHIFORM</p></div>

        <section id="closeSec" aria-labelledby="closeTitle">
          <div className="close">
            <div className="a">
              <p className="lbl rule">LET'S CREATE SOMETHING MEANINGFUL</p>
              <h2 className="disp" id="closeTitle">A home should feel like you.</h2>
            </div>
            <div className="b">
              <p className="body">Not just beautiful in photographs. Not simply impressive when guests arrive.</p>
              <p className="body">But genuinely comfortable, deeply personal and thoughtfully designed for the life happening within it.</p>
              <p className="body">Tell us what home means to you. Together, we'll bring that vision to life.</p>
              <Link className="btn ghost" href="/contact" style={{alignSelf: 'flex-start'}}>LET'S TALK ABOUT YOUR SPACE <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
