import React from 'react';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/context/StoreContext';
import CuratedCollectionPage from '@/components/CuratedCollectionPage';

export const metadata: Metadata = {
  title: 'Curated For Him — AURA Parfums',
  description:
    'Quiet authority, tactile dry woods, charred resin, cold mountain pine, and saline coastal minerals. Extraits curated for him.',
};

export default function ForHimPage() {
  const forHimIds = ['cedar-hour', 'smoked-amber', 'salt-and-fig'];
  const forHimProducts = (productsData as Product[]).filter((p) =>
    forHimIds.includes(p.id)
  );

  return (
    <CuratedCollectionPage
      currentSlug="for-him"
      eyebrow="Curated Wardrobe"
      title="For Him"
      quote="Quiet authority, tactile dry woods, charred resin, and cold mountain pine."
      products={forHimProducts}
      signatureNotes={['Virginia Cedar', 'Smoked Birch', 'Baltic Amber', 'Aegean Sea Salt', 'Haitian Vetiver']}
      layeringTip="Wear Salt & Fig after morning grooming, then add a light mist of Cedar Hour on outerwear for all-day presence."
    />
  );
}
