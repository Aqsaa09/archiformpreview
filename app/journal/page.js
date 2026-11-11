import Image from 'next/image';
import Arrow from '@/components/Arrow';
import PageCta from '@/components/PageCta';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Journal',
  description: 'ARCHIFORM in the press: founder Roula Jbour in conversation with She Means Business, published by Gulf News, on designing healthier homes in Dubai.',
  path: '/journal',
  image: { url: '/m/she-means-business-p14.jpg', width: 1482, height: 1061, alt: 'Interview with Roula Jbour in She Means Business, Gulf News' },
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
              <Image src="/m/she-means-business-p14.jpg" alt="Page 14 of She Means Business: the interview with Roula Jbour, founder of ARCHIFORM, with her portrait" width={1482} height={1061} sizes="(max-width: 820px) 100vw, 88vw" loading="eager" />
            </a>
            <figcaption className="lbl">She Means Business · Gulf News · Page 14 · Friday, 30 October 2026 <a className="jr-full" href={ARTICLE_URL} target="_blank" rel="noopener noreferrer">Read the article<span className="sr"> (opens in a new tab)</span> <Arrow /></a></figcaption>
          </figure>

          <div className="jr-body">
            <p className="jr-lede">In conversation with She Means Business, published by Gulf News, ARCHIFORM founder Roula Jbour talks about the healthcare background that shaped her approach, how wellbeing is changing the way we renovate our homes, and her advice for women building design businesses.</p>
          </div>
        </article>
      </main>
      <PageCta />
    </>
  );
}
