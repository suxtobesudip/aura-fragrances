'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import productsData from '@/data/products.json';
import {
  ShoppingBag,
  Gift,
  CheckCircle2,
  Heart,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MakeItYoursPage() {
  const { addToCart, brandName } = useStore();

  const [selectedProductId, setSelectedProductId] = useState(productsData[0].id);
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('100ml');
  const [engravedText, setEngravedText] = useState('ELEANOR V.');
  const [engravedFont, setEngravedFont] = useState<'Classic Serif' | 'Modern Sans' | 'Monogram' | 'Script Cursive'>('Classic Serif');
  const [giftBoxOption, setGiftBoxOption] = useState(true);
  const [giftNote, setGiftNote] = useState('For the moments we swore we would never forget.');
  const [isAdded, setIsAdded] = useState(false);

  const selectedProduct = productsData.find((p) => p.id === selectedProductId) || productsData[0];

  const basePrice = selectedSize === '50ml' ? selectedProduct.price : selectedProduct.price100ml;
  const engravingFee = 400; // Free promotion with FESTIVE15
  const totalPrice = basePrice + engravingFee;

  const handleCommissionFlacon = () => {
    addToCart(
      selectedProduct as any,
      'Engraved (100ml)',
      engravedText,
      engravedFont,
      1
    );

    setIsAdded(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E8D3A8', '#F2C9D0', '#CFC3F0', '#CFE0D4'],
      });
    } catch {}

    setTimeout(() => setIsAdded(false), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 py-4 sm:py-16 space-y-6 sm:space-y-16">
      {/* Editorial Prologue */}
      <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
        <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl lg:text-7xl text-[#1F1A24] dark:text-[#F7F3EE]">
          Make it <span className="italic font-serif font-light text-amber-800 dark:text-amber-300">*yours*</span>.
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5467] dark:text-[#B6ADC2] leading-relaxed max-w-md mx-auto">
          Diamond-tip laser engraving etched directly into heavy French crystal. An intimate dedication, wedding date, or personal talisman.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
        {/* Left: 3D Bottle Showcase with Real-Time Dynamic Specular Engraving Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4 lg:sticky lg:top-28">
          <div className="relative aspect-[4/5] max-h-[340px] sm:max-h-none rounded-[22px] sm:rounded-[36px] overflow-hidden bg-neutral-900 border border-white/40 dark:border-white/15 shadow-2xl group liquid-glass">
            <Image
              src={selectedProduct.images.primary}
              alt={selectedProduct.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Ambient Lighting Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Dynamic Real-time Engraved Flacon Plaque */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 pointer-events-none">
              <div className="glass-pill px-4 sm:px-7 py-3 sm:py-5 bg-white/25 dark:bg-black/50 backdrop-blur-xl border border-white/80 dark:border-white/30 shadow-2xl text-center transform -rotate-1 max-w-[240px] sm:max-w-[300px] w-full animate-in zoom-in-95 duration-300">
                <span className="text-[8px] sm:text-[10px] font-mono-micro tracking-widest uppercase text-white/90 block mb-0.5 sm:mb-1">
                  {brandName} — {selectedProduct.name.toUpperCase()}
                </span>

                <span
                  className={`text-lg sm:text-2xl font-bold tracking-wider text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] block transition-all py-0.5 sm:py-1 ${
                    engravedFont === 'Classic Serif'
                      ? 'font-display italic text-xl sm:text-3xl font-normal'
                      : engravedFont === 'Modern Sans'
                      ? 'font-sans uppercase tracking-[0.25em]'
                      : engravedFont === 'Script Cursive'
                      ? 'font-serif italic text-xl sm:text-3xl font-light'
                      : 'font-mono-micro uppercase tracking-widest text-base sm:text-lg'
                  }`}
                >
                  {engravedText || 'YOUR NAME'}
                </span>

                <span className="text-[8px] sm:text-[9px] font-mono-micro tracking-widest uppercase text-white/80 block mt-0.5 sm:mt-1">
                  {selectedSize} EXTRAIT — NO. 158
                </span>
              </div>
            </div>

            {/* Bottom Status Pill */}
            <div className="absolute bottom-5 inset-x-5 flex items-center justify-between text-[11px] font-mono-micro text-white/90">
              <span className="glass-pill px-3 py-1 bg-black/50 backdrop-blur-md">
                ✦ Real-time Optical Preview
              </span>
              <span className="glass-pill px-3 py-1 bg-black/50 backdrop-blur-md">
                Laser Depth: 0.18mm
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl liquid-glass bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 text-xs flex items-center justify-between">
            <span className="text-neutral-500 font-mono-micro">ENGRAVING PROMISE:</span>
            <span className="text-[#1F1A24] dark:text-white font-medium">
              Hand-inspected before sealing in wax
            </span>
          </div>
        </div>

        {/* Right: Customization Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          {/* Step 1: Select Fragrance Formula */}
          <div className="space-y-3">
            <label className="text-xs font-mono-micro uppercase text-[#887F93] tracking-widest flex items-center gap-1.5">
              <span>01. Select Fragrance Extract</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {productsData.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs ${
                    selectedProductId === prod.id
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md font-bold'
                      : 'glass-pill text-neutral-600 dark:text-neutral-300 hover:border-black/30'
                  }`}
                >
                  <span className="block truncate">{prod.name}</span>
                  <span className="text-[10px] opacity-70 block font-mono-micro">
                    {prod.family}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Size */}
          <div className="space-y-3">
            <label className="text-xs font-mono-micro uppercase text-[#887F93] tracking-widest flex items-center gap-1.5">
              <span>02. Select Parfum Volume</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['50ml', '100ml'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-4 rounded-full text-xs font-mono-micro transition-all border flex items-center justify-between ${
                    selectedSize === size
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold shadow-md'
                      : 'glass-pill text-neutral-600 dark:text-neutral-300 hover:border-black/30'
                  }`}
                >
                  <span>{size} Parfum</span>
                  <span>₹{size === '50ml' ? selectedProduct.price : selectedProduct.price100ml}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Type Personal Text */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono-micro uppercase text-[#887F93]">
              <span>03. Personal Dedication</span>
              <span>{engravedText.length}/16 Chars</span>
            </div>
            <input
              type="text"
              maxLength={16}
              value={engravedText}
              onChange={(e) => setEngravedText(e.target.value)}
              placeholder="Type Name, Monogram or Date..."
              className="w-full px-5 py-3.5 text-base rounded-full bg-white/70 dark:bg-white/5 border border-black/15 dark:border-white/20 outline-none font-mono-micro uppercase tracking-wider text-[#1F1A24] dark:text-white shadow-inner focus:border-black dark:focus:border-white"
            />
          </div>

          {/* Step 4: Choose Typography */}
          <div className="space-y-3">
            <label className="text-xs font-mono-micro uppercase text-[#887F93] tracking-widest">
              04. Engraving Typography
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Classic Serif', 'Modern Sans', 'Monogram', 'Script Cursive'] as const).map((font) => (
                <button
                  key={font}
                  onClick={() => setEngravedFont(font)}
                  className={`py-3 px-3 rounded-2xl text-xs transition-all border text-center ${
                    engravedFont === font
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold shadow-md'
                      : 'glass-pill text-neutral-600 dark:text-neutral-300 hover:border-black/30'
                  }`}
                >
                  <span
                    className={
                      font === 'Classic Serif'
                        ? 'font-display italic text-sm'
                        : font === 'Modern Sans'
                        ? 'font-sans uppercase text-xs'
                        : font === 'Script Cursive'
                        ? 'font-serif italic text-sm'
                        : 'font-mono-micro uppercase text-xs'
                    }
                  >
                    {font}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Gift Presentation Packaging */}
          <div className="p-5 rounded-2xl liquid-glass bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-600 dark:text-amber-300" />
                <span className="text-xs font-mono-micro uppercase font-semibold text-[#1F1A24] dark:text-white">
                  Complimentary Gift Packaging
                </span>
              </div>
              <input
                type="checkbox"
                checked={giftBoxOption}
                onChange={(e) => setGiftBoxOption(e.target.checked)}
                className="w-4 h-4 rounded text-black accent-black cursor-pointer"
              />
            </div>

            {giftBoxOption && (
              <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                <label className="text-[11px] font-mono-micro uppercase text-neutral-500 block">
                  Handwritten Note for the Recipient
                </label>
                <textarea
                  rows={2}
                  maxLength={120}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Add your intimate message..."
                  className="w-full px-4 py-2.5 text-xs rounded-2xl bg-white/60 dark:bg-black/30 border border-black/10 dark:border-white/15 outline-none font-sans text-[#1F1A24] dark:text-white"
                />
              </div>
            )}
          </div>

          {/* Pricing & Commission Button */}
          <div className="p-6 rounded-[28px] liquid-glass bg-white/70 dark:bg-white/10 border border-white/70 dark:border-white/20 shadow-xl space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono-micro uppercase text-neutral-400 block">
                  TOTAL COMMISSION
                </span>
                <span className="font-mono-micro text-2xl font-bold text-[#1F1A24] dark:text-white">
                  ₹{totalPrice}
                </span>
              </div>
              <div className="text-right text-xs font-mono-micro text-emerald-600 dark:text-emerald-400">
                <span>Engraving included</span>
                <span className="block text-[10px] text-neutral-400">Apply FESTIVE15 for 15% off</span>
              </div>
            </div>

            <button
              onClick={handleCommissionFlacon}
              className="w-full glass-btn-solid py-4 text-xs font-mono-micro uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            >
              {isAdded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Parfum Commissioned & Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Commission Engraved Parfum</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-6 text-[10px] font-mono-micro text-neutral-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Insured Courier
              </span>
              <span>✦</span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-indigo-600" /> Free 2ml Sample Included
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
