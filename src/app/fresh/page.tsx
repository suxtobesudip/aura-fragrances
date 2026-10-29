import React from 'react';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/context/StoreContext';
import CuratedCollectionPage from '@/components/CuratedCollectionPage';

export const metadata: Metadata = {
  title: 'Fresh Collection — AURA Parfums',
  description:
    'Saline morning breezes, crushed Mediterranean fig leaves, cold-pressed bergamot, and sun-bleached coastal driftwood extraits.',
};

export default function FreshPage() {
  const freshProducts = (productsData as Product[]).filter(
    (p) => p.family === 'Fresh'
  );

  return (
    <CuratedCollectionPage
      currentSlug="fresh"
      eyebrow="Olfactory Family 01"
      title="The Fresh Collection"
      quote="Saline morning breezes, crushed Mediterranean fig leaves, and sun-bleached coastal driftwood."
      products={freshProducts}
      signatureNotes={['Calabrian Bergamot', 'Aegean Sea Salt', 'Green Fig Leaf', 'Yuzu Rind', 'White Cedar']}
      layeringTip="Layer Salt & Fig with Cedar Hour to anchor marine ozone with meditative dry timber smoke."
    />
  );
}
