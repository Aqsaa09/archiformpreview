import Link from 'next/link';
import Arrow from '@/components/Arrow';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main className="page">
      <div className="pg-ttl">
        <p className="lbl rule">404</p>
        <h1 className="disp">This room doesn’t exist.</h1>
        <p className="body">The page may have moved. Start again from the entrance, or see our work.</p>
      </div>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        <Link className="btn" href="/">Back home <Arrow /></Link>
        <Link className="go" href="/portfolio">View portfolio <Arrow /></Link>
      </div>
    </main>
  );
}
