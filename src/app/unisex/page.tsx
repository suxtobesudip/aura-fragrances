import React from 'react';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/context/StoreContext';
import CuratedCollectionPage from '@/components/CuratedCollectionPage';

export const metadata: Metadata = {
  title: 'The Unisex Collection — AURA Parfums',
  description:
    'Pure olfactory geometry. Crystalline salt, green botanicals, smoked timber, and magnetic molecular skin aura. Extraits for everyone.',
};

export default function UnisexPage() {
  const unisexProducts = (productsData as Product[]).filter(
    (p) => p.gender === 'For Everyone'
  );

  return (
    <CuratedCollectionPage
      currentSlug="unisex"
      eyebrow="Universal Geometry"
      title="For Everyone"
      quote="Pure olfactory geometry. Crystalline salt, green botanicals, and molecular skin aura."
      products={unisexProducts}
      signatureNotes={['Aegean Sea Salt', 'Green Fig Leaf', 'Baltic Amber', 'Atlas Cedar', 'Yuzu Rind']}
      layeringTip="Combine any two universal extraits to compose a signature accord tailored directly to your skin chemistry."
    />
  );
}
