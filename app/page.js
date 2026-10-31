import HomeStory from '@/components/HomeStory';
import { pageMeta } from '@/lib/seo';
import { site } from '@/content/site';

// No title: the home page uses the root layout's default, "ARCHIFORM Design Studio | Interior design in Dubai"
export const metadata = pageMeta({ description: site.description, path: '/' });

export default function HomePage() {
  return <HomeStory />;
}
