import Link from 'next/link';
import Image from 'next/image';
import Arrow from '@/components/Arrow';
import PageCta from '@/components/PageCta';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Journal',
  description: 'ARCHIFORM in the press: founder Roula Jbour in conversation with She Means Business on designing healthier homes in Dubai.',
  path: '/journal',
  image: { url: '/m/she-means-business.jpg', width: 1125, height: 806, alt: 'Interview with Roula Jbour in She Means Business' },
});

/* The interview as printed in She Means Business, 30 October 2026, page 14 */
const qa = [
  {
    q: 'How did your background in healthcare inspire your transition into interior design, and what entrepreneurial vision drives ARCHIFORM?',
    a: [
      'My healthcare background shaped my understanding of how our surroundings influence wellbeing. When I pursued formal training in interior design, I saw an opportunity to combine creativity with this perspective. Through ARCHIFORM, I focus on home renovations, joinery and decorative finishes, managing projects from concept to completion. My vision is to move beyond aesthetics and create homes that are beautiful, functional and genuinely supportive of healthier everyday living.',
    ],
  },
  {
    q: 'How is growing awareness of health and wellbeing reshaping home renovation trends, and how does ARCHIFORM integrate these priorities into its projects?',
    a: [
      'Homeowners are increasingly recognising that good design is not simply about appearance. The spaces we inhabit influence our comfort, sleep and overall wellbeing. At ARCHIFORM, we consider lighting, ventilation, insulation, air conditioning and material selection from the earliest planning stages. Thoughtfully layered lighting can support natural sleep cycles, while effective moisture control and properly maintained cooling systems help protect indoor air quality.',
      'We also consider the potential impact of volatile organic compounds found in certain paints, adhesives and finishes, particularly in children’s rooms and nurseries. Our approach balances aesthetics, functionality, quality and budget without overlooking the health of those living within these spaces.',
    ],
  },
  {
    q: 'What challenges and opportunities have shaped your entrepreneurial journey, and what advice would you offer women aspiring to build successful design businesses?',
    a: [
      'Transitioning from healthcare into design meant developing new technical expertise while building upon my existing professional knowledge. Establishing ARCHIFORM has also taught me the importance of balancing creative vision, practical execution and clients’ expectations, while building trust and a business with a clear purpose.',
      'For aspiring women entrepreneurs, my advice is to recognise the value of their previous experiences, invest in professional expertise and develop a distinctive approach. A successful design business should deliver more than beautiful spaces; it should create meaningful, lasting value for its clients.',
    ],
  },
];

export default function JournalPage() {
  return (
    <>
      <main className="page jr-page" id="journal">
        <header className="pg-ttl jr-ttl">
          <p className="lbl rule">JOURNAL</p>
          <h1 className="disp">In the press.</h1>
          <p className="body">Conversations about design, wellbeing and the homes we create.</p>
        </header>

        <article className="jr-art" aria-labelledby="jrTitle">
          <div className="jr-meta">
            <span className="lbl">She Means Business</span>
            <span className="lbl">Interview</span>
            <span className="lbl">30 October 2026</span>
          </div>
          <h2 className="h2" id="jrTitle">Roula Jbour on homes that are beautiful, functional and <em>supportive of healthier living.</em></h2>

          <figure className="jr-clip">
            <a href="/m/she-means-business.jpg" target="_blank" rel="noopener noreferrer" aria-label="Open the article page at full size">
              <Image src="/m/she-means-business.jpg" alt="Interview with Roula Jbour, founder of ARCHIFORM, in She Means Business, page 14" width={1125} height={806} sizes="(max-width: 820px) 100vw, 88vw" loading="eager" />
            </a>
            <figcaption className="lbl">She Means Business · Page 14 · Friday, 30 October 2026 <a className="jr-full" href="/m/she-means-business.jpg" target="_blank" rel="noopener noreferrer">Open full size <Arrow /></a></figcaption>
          </figure>

          <div className="jr-body">
            <p className="jr-lede">In conversation with She Means Business, ARCHIFORM founder Roula Jbour talks about the healthcare background that shaped her approach, how wellbeing is changing the way we renovate our homes, and her advice for women building design businesses.</p>
            {qa.map((item, i) => (
              <section className="jr-qa" key={i}>
                <h3 className="jr-q">{item.q}</h3>
                {item.a.map((para, j) => <p className="jr-a" key={j}>{para}</p>)}
                {i === 1 ? (
                  <blockquote className="jr-pull">“A successful design business should deliver more than beautiful spaces; it should create meaningful, lasting value for its clients.”</blockquote>
                ) : null}
              </section>
            ))}
            <div className="jr-end">
              <p className="lbl">Originally published in She Means Business, 30 October 2026</p>
              <Link className="go" href="/founder">Meet Roula <Arrow /></Link>
            </div>
          </div>
        </article>
        <section className="jr-thoughts" aria-labelledby="thoughtsTitle">
          <p className="lbl rule">Coming soon</p>
          <h2 className="h2" id="thoughtsTitle">Thoughts on thoughtful living</h2>
          <p className="body">Articles we are preparing. Until they are published, we are happy to talk through any of these topics in a first consultation.</p>
          <div className="jr-thoughts-grid">
            <article>
              <p className="lbl">01</p>
              <h3 className="h2">The Art of Healthy Living: Why Your Home Environment Matters</h3>
              <p className="body">Exploring how light, ventilation, materials and spatial comfort contribute to a more thoughtful approach to home design.</p>
            </article>
            <article>
              <p className="lbl">02</p>
              <h3 className="h2">Luxury You Can Feel: Redefining the Meaning of a Beautiful Home</h3>
              <p className="body">Why true luxury is often found in comfort, functionality and the quiet details that enhance everyday life.</p>
            </article>
            <article>
              <p className="lbl">03</p>
              <h3 className="h2">Designing for Natural Light: Bringing Balance into Your Home</h3>
              <p className="body">How thoughtful lighting and spatial planning can create interiors that feel warmer, brighter and more welcoming.</p>
            </article>
            <article>
              <p className="lbl">04</p>
              <h3 className="h2">Timeless Over Trendy: Creating Interiors That Age Beautifully</h3>
              <p className="body">An exploration of natural materials, balanced proportions and enduring design choices.</p>
            </article>
            <article>
              <p className="lbl">05</p>
              <h3 className="h2">Beyond the Surface: Choosing Materials for a Healthier Home</h3>
              <p className="body">Why material selection deserves consideration for both aesthetic quality and suitability for your indoor environment.</p>
            </article>
            <article>
              <p className="lbl">06</p>
              <h3 className="h2">Renovating Your Home in Dubai: Where Should You Begin?</h3>
              <p className="body">A practical introduction to defining your vision, planning your renovation and approaching the process with confidence.</p>
            </article>
          </div>
        </section>
      </main>
      <PageCta />
    </>
  );
}
