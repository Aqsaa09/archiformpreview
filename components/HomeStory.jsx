'use client';

import { useLayoutEffect } from 'react';
import HomeMarkup from './HomeMarkup';
import { initHomeStory } from '@/lib/home-story';

export default function HomeStory() {
  // Layout effect: the story sets up before the first paint, so there is no flash of the static layout.
  useLayoutEffect(() => initHomeStory(), []);
  return <HomeMarkup />;
}
