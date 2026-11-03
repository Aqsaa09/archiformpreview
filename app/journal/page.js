import Image from 'next/image';
import Arrow from '@/components/Arrow';
import PageCta from '@/components/PageCta';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Journal',
  description: 'ARCHIFORM in the press: founder Roula Jbour in conversation with She Means Business, published by Gulf News, on designing healthier homes in Dubai.',
  path: '/journal',
  image: { url: '/m/she-means-business.jpg', width: 1125, height: 806, alt: 'Interview with Roula Jbour in She Means Business' },
});

/* The interview as printed in She Means Business, published by Gulf News, 30 October 2026, page 14 */
const ARTICLE_URL = 'https://features.gulfnews.com/books/oknx/?maxwidthtosmallmode=0&maxheighttosmallmode=0';

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
            <span className="lbl">Published by Gulf News</span>
            <span className="lbl">30 October 2026</span>
          </div>
          <h2 className="h2" id="jrTitle">Roula Jbour on homes that are beautiful, functional and <em>supportive of healthier living.</em></h2>

          <figure className="jr-clip">
            <a href={ARTICLE_URL} target="_blank" rel="noopener noreferrer" aria-label="Read the article in She Means Business, Gulf News (opens in a new tab)">
              <Image src="/m/she-means-business.jpg" alt="Interview with Roula Jbour, founder of ARCHIFORM, in She Means Business, page 14" width={1125} height={806} sizes="(max-width: 820px) 100vw, 88vw" loading="eager" />
            </a>
            <figcaption className="lbl">She Means Business · Gulf News · Page 14 · Friday, 30 October 2026 <a className="jr-full" href={ARTICLE_URL} target="_blank" rel="noopener noreferrer">Read the article<span className="sr"> (opens in a new tab)</span> <Arrow /></a></figcaption>
          </figure>

          <div className="jr-body">
            <p className="jr-lede">In conversation with She Means Business, published by Gulf News, ARCHIFORM founder Roula Jbour talks about the healthcare background that shaped her approach, how wellbeing is changing the way we renovate our homes, and her advice for women building design businesses.</p>
          </div>
        </article>
        <section className="jr-thoughts" aria-labelledby="thoughtsTitle">
          <p className="lbl rule">From the studio</p>
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
