'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/StoreContext';
import { ArrowRight } from 'lucide-react';

export interface CuratedCollectionProps {
  currentSlug: 'fresh' | 'floral' | 'woody' | 'for-him' | 'for-her' | 'unisex';
  eyebrow: string;
  title: string;
  quote: string;
  products: Product[];
  signatureNotes: string[];
  layeringTip: string;
}

const scentFamilyCollections = [
  { name: 'Fresh', href: '/fresh', slug: 'fresh' },
  { name: 'Floral', href: '/floral', slug: 'floral' },
  { name: 'Woody', href: '/woody', slug: 'woody' },
];

const personaCollections = [
  { name: 'For Him', href: '/for-him', slug: 'for-him' },
  { name: 'For Her', href: '/for-her', slug: 'for-her' },
  { name: 'For Everyone', href: '/unisex', slug: 'unisex' },
];

export default function CuratedCollectionPage({
  currentSlug,
  eyebrow,
  title,
  quote,
  products,
  signatureNotes,
  layeringTip,
}: CuratedCollectionProps) {
  const isScentFamily = ['fresh', 'floral', 'woody'].includes(currentSlug);
  const activeGroup = isScentFamily ? scentFamilyCollections : personaCollections;

  return (
    <div className="max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 py-4 sm:py-10 space-y-8 sm:space-y-14">
      {/* ────────────────────────────────────────────────────────
          MINIMAL EDITORIAL HEADER
          ──────────────────────────────────────────────────────── */}
      <section className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-4 pt-1 sm:pt-4">
        <span className="text-[10px] sm:text-[11px] font-mono-micro uppercase tracking-[0.24em] text-[#887F93] dark:text-[#A79EB2] font-medium block">
          {eyebrow}
        </span>

        <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#1F1A24] dark:text-[#F7F3EE] tracking-tight">
          {title}
        </h1>

        <p className="font-pinterest text-sm xs:text-base sm:text-xl md:text-2xl text-[#554D60] dark:text-[#C5BED0] font-light italic leading-relaxed text-pretty max-w-xl mx-auto">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Minimal Category Switcher Pills - Strictly Filtered to Current Category */}
        <div className="pt-1.5 sm:pt-2 space-y-2">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {activeGroup.map((col) => {
              const isActive = col.slug === currentSlug;
              return (
                <Link
                  key={col.slug}
                  href={col.href}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono-micro tracking-wider uppercase transition-all duration-200 whitespace-nowrap active:scale-95 touch-manipulation ${
                    isActive
                      ? 'bg-[#1F1A24] text-white dark:bg-white dark:text-[#1F1A24] shadow-sm font-semibold'
                      : 'glass-pill text-[#6B6475] dark:text-[#A79EB2] hover:text-black dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  {col.name}
                </Link>
              );
            })}
          </div>

          {/* Discreet cross-reference switch */}
          <div className="px-2">
            {isScentFamily ? (
              <Link
                href="/#personas"
                className="inline-flex items-center justify-center flex-wrap gap-1.5 text-[10px] sm:text-[11px] font-mono-micro tracking-wider uppercase text-[#887F93] dark:text-[#A79EB2] hover:text-[#1F1A24] dark:hover:text-white transition-colors text-center"
              >
                <span>Looking to shop by person? Discover For Him, For Her, For Everyone</span>
                <ArrowRight className="w-3 h-3 shrink-0" />
              </Link>
            ) : (
              <Link
                href="/#families"
                className="inline-flex items-center justify-center flex-wrap gap-1.5 text-[10px] sm:text-[11px] font-mono-micro tracking-wider uppercase text-[#887F93] dark:text-[#A79EB2] hover:text-[#1F1A24] dark:hover:text-white transition-colors text-center"
              >
                <span>Looking for botanical families? Discover Fresh, Floral, Woody</span>
                <ArrowRight className="w-3 h-3 shrink-0" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          CURATED PARFUMS GRID (2-column on mobile, balanced like luxury boutiques)
          ──────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 xs:gap-3.5 sm:gap-8 items-stretch">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          MINIMAL BOTANICAL HARMONY STRIP
          ──────────────────────────────────────────────────────── */}
      <section className="liquid-glass rounded-[20px] sm:rounded-[28px] p-4 xs:p-6 sm:p-8 max-w-3xl mx-auto border border-white/60 dark:border-white/10 text-center space-y-3 sm:space-y-4">
        <span className="text-[9px] sm:text-[10px] font-mono-micro uppercase tracking-[0.24em] text-neutral-400 dark:text-neutral-500 block">
          Primary Botanical Isolates
        </span>
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {signatureNotes.map((note) => (
            <span
              key={note}
              className="glass-pill px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[11px] sm:text-xs text-[#383141] dark:text-[#E2DBE8] font-medium"
            >
              {note}
            </span>
          ))}
        </div>
        <p className="text-[11px] sm:text-xs text-[#6B6475] dark:text-[#A79EB2] font-light max-w-md mx-auto pt-0.5 sm:pt-1 leading-relaxed">
          {layeringTip}
        </p>
      </section>

      {/* ────────────────────────────────────────────────────────
          QUIET FOOTER LINK
          ──────────────────────────────────────────────────────── */}
      <div className="text-center pt-2 pb-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs font-mono-micro uppercase tracking-wider text-[#6B6475] dark:text-[#A79EB2]">
        <Link
          href={isScentFamily ? '/#families' : '/#personas'}
          className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors py-1"
        >
          <span>{isScentFamily ? 'Back to Scent Families' : 'Back to Personas'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <span className="text-black/20 dark:text-white/20 hidden sm:inline">•</span>
        <Link
          href={isScentFamily ? '/#personas' : '/#families'}
          className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors py-1"
        >
          <span>{isScentFamily ? 'Explore Personas' : 'Explore Scent Families'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <span className="text-black/20 dark:text-white/20 hidden sm:inline">•</span>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors py-1"
        >
          <span>All 8 Parfums</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
