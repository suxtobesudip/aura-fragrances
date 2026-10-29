import React from 'react';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/context/StoreContext';
import CuratedCollectionPage from '@/components/CuratedCollectionPage';

export const metadata: Metadata = {
  title: 'Curated For Her — AURA Parfums',
  description:
    'Juicy blossoms steeped in morning rain, spiced dark plum, electric aldehydes, and comforting skin musks. Extraits curated for her.',
};

export default function ForHerPage() {
  const forHerIds = ['velvet-peony', 'midnight-orchid', 'rose-static', 'moonlit-vanilla'];
  const forHerProducts = (productsData as Product[]).filter((p) =>
    forHerIds.includes(p.id)
  );

  return (
    <CuratedCollectionPage
      currentSlug="for-her"
      eyebrow="Curated Wardrobe"
      title="For Her"
      quote="Juicy blossoms steeped in morning rain, spiced dark plum, and comforting skin musks."
      products={forHerProducts}
      signatureNotes={['White Peony', 'Centifolia Rose', 'Midnight Orchid', 'Bourbon Vanilla', 'Cashmere Musk']}
      layeringTip="Mist Velvet Peony across pulse points, followed by Moonlit Vanilla behind the ears for an intimate golden finish."
    />
  );
}
