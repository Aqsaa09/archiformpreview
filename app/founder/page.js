import FounderContent from './FounderContent';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About Us',
  description:
    'Roula Jbour founded ARCHIFORM to bring together her background in healthcare and her passion for interior design: refined, healthy homes in Dubai.',
  path: '/founder',
  image: { url: '/m/roula.jpg', width: 980, height: 1600, alt: 'Roula Jbour, founder of ARCHIFORM' },
});

export default function FounderPage() {
  return <FounderContent />;
}
