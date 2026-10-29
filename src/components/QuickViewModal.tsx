'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore, Product } from '@/context/StoreContext';
import {
  X,
  Star,
  Sparkles,
  ShoppingBag,
  Clock,
  Wind,
  Layers,
  Heart,
  ChevronRight,
} from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml' | 'Engraved (100ml)'>('50ml');
  const [engravedText, setEngravedText] = useState('');
  const [engravedFont, setEngravedFont] = useState('Classic Serif');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lock body scroll on mobile touch screens when modal is open
  React.useEffect(() => {
    if (quickViewProduct) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const imagesList = [
    quickViewProduct.images.primary,
    quickViewProduct.images.secondary,
    quickViewProduct.images.macro,
  ];

  const currentPrice =
    selectedSize === '50ml'
      ? quickViewProduct.price
      : selectedSize === '100ml'
      ? quickViewProduct.price100ml
      : quickViewProduct.engravedPrice;

  const handleAdd = () => {
    addToCart(
      quickViewProduct,
      selectedSize,
      selectedSize === 'Engraved (100ml)' ? engravedText : '',
      engravedFont,
      1
    );
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Glass Modal / Native Mobile Bottom Sheet */}
      <div className="relative w-full max-w-4xl max-h-[88vh] sm:max-h-[90vh] overflow-y-auto liquid-glass rounded-t-[28px] sm:rounded-[32px] bg-white/95 dark:bg-[#181222]/95 border-t sm:border border-white/60 dark:border-white/10 shadow-2xl p-4 xs:p-5 sm:p-8 pb-safe z-10 animate-in slide-in-from-bottom sm:slide-in-from-none sm:zoom-in-95 duration-200 mobile-touch-scroll">
        {/* Mobile Pull-Down Drag Bar */}
        <div className="w-12 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 mx-auto mb-3 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 hover:text-black dark:hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start">
          {/* Left Column: Visual Gallery & Bottle Live Label */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative aspect-square max-h-[300px] sm:max-h-none rounded-[18px] sm:rounded-[24px] overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-white/40 dark:border-white/10 shadow-inner group">
              <Image
                src={imagesList[activeImageIndex]}
                alt={quickViewProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Live Engraving Overlay on the Bottle preview */}
              {selectedSize === 'Engraved (100ml)' && engravedText && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="glass-pill px-5 py-2.5 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/70 shadow-lg text-center transform -rotate-1">
                    <span className="text-[10px] font-mono-micro uppercase tracking-widest block text-neutral-600 dark:text-neutral-300">
                      ENGRAVED PARFUM
                    </span>
                    <span
                      className={`text-lg font-bold text-[#1F1A24] dark:text-white drop-shadow-sm ${
                        engravedFont === 'Classic Serif'
                          ? 'font-display italic'
                          : engravedFont === 'Modern Sans'
                          ? 'font-sans tracking-wide'
                          : 'font-mono-micro tracking-widest'
                      }`}
                    >
                      {engravedText}
                    </span>
                  </div>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className="absolute top-4 left-4 p-2.5 rounded-full liquid-glass bg-white/60 dark:bg-black/40 hover:scale-110 active:scale-95 transition-all"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorited ? 'fill-rose-500 text-rose-500' : 'text-neutral-700 dark:text-white'
                  }`}
                />
              </button>

              {/* Badge */}
              {quickViewProduct.badge && (
                <div className="absolute top-4 right-4 glass-pill px-3 py-1 text-[11px] font-mono-micro uppercase text-[#1F1A24] dark:text-white">
                  {quickViewProduct.badge}
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-3">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#1F1A24] dark:border-white scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Information, Fragrance Pyramid, Meters, and Controls */}
          <div className="space-y-6">
            <div>
              <div className="text-xs font-mono-micro uppercase text-[#887F93] tracking-widest mb-1">
                {quickViewProduct.tagline}
              </div>
              <h3 className="font-display text-xl xs:text-2xl sm:text-4xl text-[#1F1A24] dark:text-white">
                {quickViewProduct.name}
              </h3>
              <p className="text-xs italic text-[#70677C] dark:text-[#A79EB2] mt-1 font-serif">
                &ldquo;{quickViewProduct.moodLine}&rdquo;
              </p>

              {/* Star Rating & Concentration */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span className="text-xs font-mono-micro font-semibold">
                    {quickViewProduct.rating}
                  </span>
                </div>
                <span className="opacity-40 text-xs">/</span>
                <span className="text-xs text-neutral-500 font-mono-micro">
                  {quickViewProduct.reviewsCount} reviews
                </span>
                <span className="opacity-40 text-xs">/</span>
                <span className="text-xs text-neutral-500 font-mono-micro">
                  {quickViewProduct.concentration}
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {/* Fragrance Notes Pyramid */}
            <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-micro uppercase text-[#887F93] tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Notes Pyramid (Evolution Over Time)</span>
              </div>

              <div className="space-y-2 text-xs">
                {/* Top */}
                <div className="flex items-start gap-3">
                  <span className="font-mono-micro text-[11px] text-teal-700 dark:text-teal-300 w-16 shrink-0 uppercase">
                    Top
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.notes.top.map((n) => (
                      <span
                        key={n}
                        className="glass-pill px-2.5 py-0.5 text-[11px] text-neutral-700 dark:text-neutral-300"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Heart */}
                <div className="flex items-start gap-3">
                  <span className="font-mono-micro text-[11px] text-rose-700 dark:text-rose-300 w-16 shrink-0 uppercase">
                    Heart
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.notes.heart.map((n) => (
                      <span
                        key={n}
                        className="glass-pill px-2.5 py-0.5 text-[11px] text-neutral-700 dark:text-neutral-300"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Base */}
                <div className="flex items-start gap-3">
                  <span className="font-mono-micro text-[11px] text-amber-700 dark:text-amber-300 w-16 shrink-0 uppercase">
                    Base
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.notes.base.map((n) => (
                      <span
                        key={n}
                        className="glass-pill px-2.5 py-0.5 text-[11px] text-neutral-700 dark:text-neutral-300"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Longevity & Sillage Projection Meters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono-micro uppercase mb-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Longevity</span>
                </div>
                <div className="font-medium text-xs text-[#1F1A24] dark:text-white">
                  {quickViewProduct.meters.longevityLabel}
                </div>
                <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${quickViewProduct.meters.longevity * 10}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono-micro uppercase mb-1">
                  <Wind className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sillage Trail</span>
                </div>
                <div className="font-medium text-xs text-[#1F1A24] dark:text-white">
                  {quickViewProduct.meters.sillage}
                </div>
                <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${quickViewProduct.meters.sillagePercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono-micro uppercase text-[#887F93] mb-2">
                <span>Select Volume / Edition</span>
                <span className="font-semibold text-[#1F1A24] dark:text-white">
                  ₹{currentPrice}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['50ml', '100ml', 'Engraved (100ml)'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 rounded-full text-xs font-mono-micro transition-all border ${
                      selectedSize === size
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md'
                        : 'glass-pill text-neutral-600 dark:text-neutral-300 hover:border-black/30'
                    }`}
                  >
                    {size === 'Engraved (100ml)' ? '✦ Engraved' : size}
                  </button>
                ))}
              </div>
            </div>

            {/* If Engraved is selected, show live engraving customization input */}
            {selectedSize === 'Engraved (100ml)' && (
              <div className="p-4 rounded-2xl bg-[#E8D3A8]/15 dark:bg-[#E8D3A8]/10 border border-[#E8D3A8]/40 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-mono-micro uppercase text-[#8A6A32] dark:text-[#E8D3A8]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personalize Your Parfum</span>
                </div>
                <input
                  type="text"
                  placeholder="Type name or initials (e.g. A. Laurent)"
                  maxLength={16}
                  value={engravedText}
                  onChange={(e) => setEngravedText(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-full bg-white dark:bg-black/30 border border-black/15 dark:border-white/20 outline-none font-mono-micro"
                />
                <div className="flex gap-2 text-[10px] font-mono-micro">
                  {['Classic Serif', 'Modern Sans', 'Monogram'].map((font) => (
                    <button
                      key={font}
                      onClick={() => setEngravedFont(font)}
                      className={`px-2.5 py-1 rounded-full border transition-all ${
                        engravedFont === font
                          ? 'border-black dark:border-white bg-black/5 dark:bg-white/10 font-bold'
                          : 'border-transparent text-neutral-500'
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAdd}
                className="flex-1 glass-btn-solid py-3 text-xs uppercase tracking-wider font-mono-micro flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Wardrobe — ₹{currentPrice}</span>
              </button>

              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="glass-btn-outline px-4 py-3 text-xs font-mono-micro flex items-center justify-center gap-1 hover:text-black dark:hover:text-white"
                title="View full editorial product details"
              >
                <span>Full Page</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
