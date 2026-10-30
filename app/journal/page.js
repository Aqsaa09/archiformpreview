import Link from 'next/link';
import Arrow from '@/components/Arrow';
import PageCta from '@/components/PageCta';

export const metadata = {
  title: 'Journal',
  description: 'ARCHIFORM in the press: founder Roula Jbour in conversation with She Means Business on designing healthier homes in Dubai.',
  alternates: { canonical: '/journal' },
};

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
              <img src="/m/she-means-business.jpg" alt="Interview with Roula Jbour, founder of ARCHIFORM, in She Means Business, page 14" width="1125" height="806" />
            </a>
            <figcaption className="lbl">She Means Business · Page 14 · Friday, 30 October 2026 <span className="jr-swipe">Swipe to read the page</span> <span>Open full size <Arrow /></span></figcaption>
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
      </main>
      <PageCta />
    </>
  );
}
