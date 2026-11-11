import Image from 'next/image';
import Link from 'next/link';
import { roomFilms, featureFilm } from '@/content/media';
import { getProject } from '@/content/projects';

const featured = getProject('emirates-living-villa');
// Arched images beside the process steps and the founder teaser share one column: about 80vw on phones, a third of the page on desktop
const ARCH_SIZES = '(max-width: 820px) 80vw, 34vw';
const CARD_SIZES = '(max-width: 820px) 74vw, 360px';

/* Markup for the home page scroll story. Element ids are used by lib/home-story.js. */
export default function HomeMarkup() {
  return (
    <>
      <div className="loader" id="loader" aria-hidden="true">
        <img className="ld-logo" id="ldLogo" src="/m/logo-dark.webp" alt="" width="520" height="352" />
        <div className="meta"><span>Dubai · 25.20° N, 55.27° E</span><span id="ldPct">000</span></div>
      </div>
      <div id="vp" aria-hidden="true"></div>
      <main id="home">
        <section className="stage" id="stage" aria-label="Designed with intention, built around better living">
          <h1 className="sr">Designed with intention, built around better living. Interior design in Dubai by ARCHIFORM.</h1>
          <div className="vis" id="heroVis">
            <div className="wall" id="wall" aria-hidden="true">
              {/* Phones and tablets (the same 1100px break as lib/home-story.js) keep the original, shorter olive trees */}
              <picture><source media="(max-width: 1100px)" srcSet="/m/entry-wide-v5.webp" /><img className="entry" id="entryImg" src="/m/entry-wide-v6.webp" alt="" width="4000" height="1800" fetchPriority="high" /></picture>
            </div>
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
                        <i><b style={{'--x': 0, '--z': .04, '--sw': 1.34, '--sh': .14}} /><b className="lt" style={{'--x': -.2, '--z': .1, '--sw': .5, '--sh': .18}} /><b style={{'--x': -.66, '--z': -.16, '--sw': .3}} /><b style={{'--x': .68, '--z': -.1, '--sw': .3}} /><b style={{'--x': -.546, '--z': -.2, '--sw': .4, '--sh': .1}} /><b style={{'--x': .582, '--z': -.2, '--sw': .4, '--sh': .1}} /></i>
                        <i style={{'--d': 2}} />
                      </div>
                      <div className="ly haze" style={{'--x': 0, '--z': -.45, '--w': 3.2, '--y': -.02}}><span /></div>
                      <div className="ly glow" style={{'--x': -.05, '--z': -.04, '--w': 1.7}}><span /></div>
                      <div className="ly sway palm pl" style={{'--x': -.42, '--z': .02, '--w': .3}}><img data-src="/m/hol/palm-fan.webp" alt="" width="663" height="1100" fetchPriority="low" /></div>
                      <div className="ly sway palm pr" style={{'--x': .43, '--z': .02, '--w': .32}}><img data-src="/m/hol/palm-date.webp" alt="" width="709" height="1100" fetchPriority="low" /></div>
                      {/* An old olive planted behind and beside each palm, set so the palm hides about 30% of it. lib/home-story.js keeps the diagram labels off them */}
                      <div className="ly sway palm olive l" style={{'--x': -.546, '--z': -.2, '--w': .35}}><span><img data-src="/m/hol/olive-tree.webp" alt="" width="776" height="860" fetchPriority="low" /></span></div>
                      <div className="ly sway palm olive r" style={{'--x': .582, '--z': -.2, '--w': .37}}><img data-src="/m/hol/olive-tree.webp" alt="" width="776" height="860" fetchPriority="low" /></div>
                      <div className="ly hs" id="hsLy" style={{'--x': 0, '--z': 0, '--w': 1.2}}><img data-src="/m/hol/house-v4.webp" alt="" width="2728" height="1000" fetchPriority="low" /><span className="hmk" aria-hidden="true"><i data-k="sun" style={{left: '38.5%', top: '5%'}} /><i data-k="air" style={{left: '59.4%', top: '33%'}} /><i data-k="water" style={{left: '55%', top: '95%'}} /><i data-k="green" style={{left: '33%', top: '93%'}} /><i data-k="people" style={{left: '38%', top: '30%'}} /></span></div>
                      <div className="ly bed" style={{'--x': -.36, '--z': .08, '--w': .4, '--y': -.008}}><img data-src="/m/hol/grass.webp" alt="" width="1400" height="407" fetchPriority="low" /></div>
                      <div className="ly bed" style={{'--x': .37, '--z': .06, '--w': .4, '--y': -.008}}><img data-src="/m/hol/shrubs.webp" alt="" width="1400" height="419" fetchPriority="low" /></div>
                      {/* A potted olive either side of the front door, standing at the foot of its pilasters */}
                      <div className="ly pot" style={{'--x': -.074, '--z': .02, '--w': .04, '--y': .03}}><img data-src="/m/hol/olive-pot.webp" alt="" width="318" height="640" fetchPriority="low" /></div>
                      <div className="ly pot" style={{'--x': .05, '--z': .02, '--w': .04, '--y': .03}}><img data-src="/m/hol/olive-pot.webp" alt="" width="318" height="640" fetchPriority="low" /></div>
                      {/* Phones only: the feature cards in a row above the roof (desktop shows the labelled diagram, #holDiag, instead) */}
                      <div className="ly hc" style={{'--x': 0, '--z': .04, '--w': .96, '--y': .62}}>
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
                {/* Holistic design as a diagram: each point is labelled clear of the house and the text, with a leader line to the
                    part of the house it describes. lib/home-story.js draws the lines to the markers in the house layer (.hmk). */}
                <div className="hdg" id="holDiag">
                  <svg className="hdg-lines" aria-hidden="true"><line pathLength="1" /><circle r="3.5" /><line pathLength="1" /><circle r="3.5" /><line pathLength="1" /><circle r="3.5" /><line pathLength="1" /><circle r="3.5" /><line pathLength="1" /><circle r="3.5" /></svg>
                  <ul className="hdg-pts" aria-label="What we design for">
                    <li className="hdg-pt l" data-k="green"><span className="ic" aria-hidden="true"><svg viewBox="0 0 70 104"><use href="#sprig"/></svg></span><span><b>Living green</b><em>Planting woven into every view</em></span></li>
                    <li className="hdg-pt l" data-k="sun"><span className="ic" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="7"/><path d="M20 3v6M20 31v6M3 20h6M31 20h6M8 8l4.2 4.2M27.8 27.8 32 32M8 32l4.2-4.2M27.8 12.2 32 8"/></svg></span><span><b>Sun &amp; shade</b><em>Overhangs and glazing set for the sun</em></span></li>
                    <li className="hdg-pt l" data-k="people"><span className="ic" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="14" cy="13" r="5"/><circle cx="27" cy="15" r="4"/><path d="M5 35c0-7 4-12 9-12s9 5 9 12M20 35c1-6 4-10 7-10s7 4 7 10"/></svg></span><span><b>The people inside</b><em>Rooms shaped around daily life</em></span></li>
                    <li className="hdg-pt r" data-k="water"><span className="ic" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M20 5c6 8.5 10 14 10 20a10 10 0 0 1-20 0c0-6 4-11.5 10-20z"/><path d="M15 26a5 5 0 0 0 5 5"/></svg></span><span><b>Cool water</b><em>Water and planting that cool the air</em></span></li>
                    <li className="hdg-pt r" data-k="air"><span className="ic" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M4 14h20a5 5 0 1 0-5-5M4 21h28a5 5 0 1 1-5 5M4 28h12"/></svg></span><span><b>Fresh air</b><em>Openings placed for cross-breezes</em></span></li>
                  </ul>
                </div>
              </div>
              <div className="reelclip" id="reelclip">
                <div className="reel" id="reel">
                <video data-clip="0" muted playsInline preload="none" aria-hidden="true"></video>
                {roomFilms.map((f, i) => (
                  <video key={f.id} data-clip={i + 1} data-src={f.src} data-msrc={f.msrc} data-poster={f.poster} data-mposter={f.mposter} muted loop={f.loop} playsInline preload={i ? 'none' : 'auto'} aria-label={f.label}></video>
                ))}
                </div>
              </div>
              <svg className="inshade" aria-hidden="true"><defs><filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="12"/></filter></defs><path id="shPath" fill="none" stroke="rgba(52,40,28,.4)" strokeWidth="34" filter="url(#sh)"/></svg>
            </div>
            <div className="dim" id="dim" aria-hidden="true"></div>
            <div className="portal" id="portal" aria-hidden="true">
              <svg className="bez" id="bez"></svg>
              <div className="doors" id="doors"><div className="glow" id="dglow"></div><div className="leaf l" id="leafL"></div><div className="leaf r" id="leafR"></div></div>
            </div>

            <p className="hh a" id="hhA" aria-hidden="true">Designed with<br />{' '}intention.</p>
            <p className="hh b" id="hhB" aria-hidden="true"><em>Built around</em><br />{' '}better living.</p>
            <div className="hb" id="hb">
              <hr />
              <p>A home is a collection of everyday experiences, and we believe each deserves careful thought. From the flow of a room to the feel of its materials, we approach every project with precision, purpose and genuine care — creating environments where functionality and wellbeing exist.</p>
            </div>
            <ul className="hv lbl" id="hv" aria-label="What we design for"><li>Thoughtful Interiors.</li><li>Healthy Living.</li><li>Timeless Spaces.</li></ul>

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
              <p className="lbl rule">The Quieter Details</p>
              <h2 className="h2" id="dtTitle">What else makes a home <em>healthy.</em></h2>
              <p className="body">Beyond light, air and plants, these are the elements we check in every project. Most are invisible once the room is finished. You notice them in how you sleep, breathe and feel through out the day.</p>
            </div>
            <div className="cards" id="cards">
              <article className="card"><div className="ph"><Image src="/m/materials-board.jpg" alt="Material samples laid out on oak: violet-veined marble, travertine, walnut, bouclé and linen swatches beside kitchen drawings" width={1200} height={1493} sizes={CARD_SIZES} /></div><h3>Natural Materials</h3><p>Organic elements for everyday comfort.</p><ul><li>Clean-air, low-VOC paints.</li><li>Solid wood, stone, and lime plaster.</li><li>Breathable linen, cotton, and wool.</li></ul></article>
              <article className="card"><div className="ph"><Image src="/m/kitchen-marble.jpg" alt="Kitchen with a full marble backsplash and shelf, oak cabinets and an olive branch in a glass vase" width={809} height={1470} sizes={CARD_SIZES} style={{objectPosition: '50% 40%'}} /></div><h3>Clean Air &amp; Humidity Control</h3><p>Fresh air for a healthier home.</p><ul><li>Natural cross-ventilation and fresh airflow.</li><li>Balanced indoor humidity.</li><li>Dust-minimizing layouts.</li></ul></article>
              <article className="card"><div className="ph"><Image src="/m/bed-sunlight.jpg" alt="Bedroom with late sun falling across the wall, a palm-print headboard and a small lamp on the bedside table" width={720} height={1280} sizes={CARD_SIZES} style={{objectPosition: '50% 55%'}} /></div><h3>Layered Lighting</h3><p>The right light for every moment.</p><ul><li>Bright light for daily tasks.</li><li>Warm light for evening rest.</li><li>Easy dimming with lamps and switches.</li></ul></article>
              <article className="card"><div className="ph"><Image src="/m/acoustic.jpg" alt="Reading corner with a slatted timber wall, felt acoustic pendants and a green velvet armchair" width={1200} height={1600} sizes={CARD_SIZES} style={{objectPosition: '50% 45%'}} /></div><h3>Sound Insulation</h3><p>Acoustic comfort for a quieter home.</p><ul><li>Noise-absorbing rugs and drapes.</li><li>Soft-close doors and drawers.</li><li>Sound-dampening finishes.</li></ul></article>
              <article className="card"><div className="ph"><Image src="/m/vanity.jpg" alt="Design visualisation of a sculpted dressing wall with built-in shelves and a backlit mirror" width={1448} height={1086} sizes={CARD_SIZES} style={{objectPosition: '40% 50%'}} /></div><h3>Considered Storage</h3><p>Effortless organization for calm spaces.</p><ul><li>Tailored daily storage.</li><li>Seamless built-in cabinets.</li><li>Open, clutter-free layouts.</li></ul></article>
            </div>
          </div>
        </section>

        <section className="hl-intro featured-intro" aria-labelledby="fxTitle">
          <p className="lbl rule" id="fxTitle">Featured project</p>
        </section>

        <section className="stage stage2" id="fstage" aria-label={`${featured.name}, featured project`}>
          <div className="vis">
            <div className="fvid" id="fvid"><video id="vFeat" data-src={featureFilm.src} data-msrc={featureFilm.msrc} data-poster={featureFilm.poster} muted playsInline preload="none" aria-label={featureFilm.label}></video><div className="fshade" id="fshade"></div></div>
            <div className="say" id="sayA" aria-hidden="true">
              <p className="lbl">Fresh air</p>
              <p className="disp">It begins with the air you breathe.</p>
            </div>
            <div className="say" id="sayB" aria-hidden="true">
              <p className="disp">Then let the garden in.</p>
              <p className="it">Daylight and greenery, part of every room.</p>
            </div>

            <div className="feat" id="feat">
              <p className="lbl rule">Featured project</p>
              <h2>{featured.name}</h2>
              <p className="sub">Interior renovation &amp; styling</p>
              <p className="body">A complete renovation of a private villa where warm neutrals, natural textures and timeless design come together. Rooms open to light and fresh air, with bespoke joinery, refined finishes and a calm, layered feel for everyday living.</p>
              <dl>
                <div><dt>Location</dt><dd>{featured.location}</dd></div>
                <div><dt>Type</dt><dd>{featured.type}</dd></div>
                <div><dt>Services</dt><dd>{featured.did}</dd></div>
              </dl>
              <div className="acts">
                <Link className="btn" href="/portfolio">View portfolio <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link>
                <Link className="go" href={`/portfolio/${featured.slug}`}>View the project <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link>
              </div>
            </div>
            <p className="it feat-q" id="featQ" style={{position: 'absolute', right: 'var(--side)', bottom: 'calc(30px + env(safe-area-inset-bottom,0px))', color: 'var(--paper)', fontSize: 'clamp(22px,2vw,28px)', textShadow: '0 2px 20px rgba(62,49,34,.45)'}}>“A home should feel like you.”</p>
          </div>
        </section>

        <section className="home-process" id="homeProcess" aria-labelledby="processTitle">
          <div className="process-layout">
            <div className="process-media" aria-hidden="true">
              <div className="process-visual">
                <div className="process-frame"><Image src="/m/process-visit.webp" alt="" width={860} height={860} sizes={ARCH_SIZES} /></div>
                <div className="process-frame"><Image src="/m/process-materials.webp" alt="" width={860} height={860} sizes={ARCH_SIZES} /></div>
                <div className="process-frame"><Image src="/m/process-joinery.webp" alt="" width={860} height={1012} sizes={ARCH_SIZES} /></div>
                <div className="process-frame"><Image src="/m/bed.jpg" alt="" width={852} height={1280} sizes={ARCH_SIZES} /></div>
                <div className="process-founder"><Image className="process-founder-portrait" src="/m/roula.jpg" alt="" width={980} height={1600} sizes={ARCH_SIZES} /></div>
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
          <div className="ph"><Image src="/m/roula.jpg" alt="Roula Jbour, founder of ARCHIFORM, leaning against a white wall" width={980} height={1600} sizes={ARCH_SIZES} /></div>
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
              <Link className="go talk" href="/contact">LET'S TALK ABOUT YOUR SPACE <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
