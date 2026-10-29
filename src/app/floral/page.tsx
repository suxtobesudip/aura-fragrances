import React from 'react';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/context/StoreContext';
import CuratedCollectionPage from '@/components/CuratedCollectionPage';

export const metadata: Metadata = {
  title: 'Floral Collection — AURA Parfums',
  description:
    'White peony steeped in cold rainwater, nocturnal orchid petals, dewy May rose, and intoxicating pink peppercorn.',
};

export default function FloralPage() {
  const floralProducts = (productsData as Product[]).filter(
    (p) => p.family === 'Floral'
  );

  return (
    <CuratedCollectionPage
      currentSlug="floral"
      eyebrow="Olfactory Family 02"
      title="The Floral Collection"
      quote="White peony steeped in cold rainwater, nocturnal orchid petals, and intoxicating pink pepper."
      products={floralProducts}
      signatureNotes={['White Peony', 'Centifolia Rose', 'Midnight Orchid', 'Pink Pepper', 'Cashmere Musk']}
      layeringTip="Layer Velvet Peony over Smoked Amber to soften dark Baltic resin with dewy botanical petals."
    />
  );
}
