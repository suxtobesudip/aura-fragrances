import React from 'react';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/context/StoreContext';
import CuratedCollectionPage from '@/components/CuratedCollectionPage';

export const metadata: Metadata = {
  title: 'Woody Collection — AURA Parfums',
  description:
    'Smoldering Baltic amber crystals, ancient Japanese cedar shavings, dark aged rum, and bourbon vanilla pod extraits.',
};

export default function WoodyPage() {
  const woodyProducts = (productsData as Product[]).filter(
    (p) => p.family === 'Woody'
  );

  return (
    <CuratedCollectionPage
      currentSlug="woody"
      eyebrow="Olfactory Family 03"
      title="The Woody Collection"
      quote="Smoldering Baltic amber crystals, ancient Japanese cedar shavings, and bourbon vanilla pod."
      products={woodyProducts}
      signatureNotes={['Baltic Amber Resin', 'Atlas Cedar', 'Bourbon Vanilla', 'Smoked Birch', 'Cardamom Pod']}
      layeringTip="Layer Smoked Amber with Salt & Fig to lift molten amber resin with crystalline Mediterranean sea salt."
    />
  );
}
