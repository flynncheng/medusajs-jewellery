import React from 'react';

import FeaturedCollections from '@/components/home/FeaturedCollections';
import Hero from '@/components/home/Hero';
import MainCollections from '@/components/home/MainCollections';

export default function Main() {
  return (
    <main className="flex-auto space-y-16 lg:space-y-28">
      <Hero />
      <MainCollections />
      <FeaturedCollections />
    </main>
  );
}
