'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useStore, Product } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import {
  Star,
  Sparkles,
  ShoppingBag,
  Clock,
  Wind,
  Layers,
  Heart,
  ShieldCheck,
  RotateCcw,
  Truck,
  Plus,
  Minus,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const { addToCart, toggleWishlist, isInWishlist, brandName } = useStore();

  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml' | 'Engraved (100ml)'>('50ml');
  const [quantity, setQuantity] = useState(1);
  const [engravedText, setEngravedText] = useState('');
  const [engravedFont, setEngravedFont] = useState('Classic Serif');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const imagesList = [
    product.images.primary,
    product.images.secondary,
    product.images.macro,
  ];

  const currentPrice =
    selectedSize === '50ml'
      ? product.price
      : selectedSize === '100ml'
      ? product.price100ml
      : product.engravedPrice;

  const handleAddToCart = () => {
    addToCart(
      product as any,
      selectedSize,
      selectedSize === 'Engraved (100ml)' ? engravedText : '',
      engravedFont,
      quantity
    );
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products
  const relatedProducts = productsData
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 py-4 sm:py-12 space-y-8 sm:space-y-16">
      {/* Breadcrumb */}
      <nav className="text-[11px] sm:text-xs font-mono-micro text-neutral-500 flex items-center gap-1.5 sm:gap-2">
        <Link href="/" className="hover:text-black dark:hover:text-white">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-black dark:hover:text-white">
          Wardrobe
        </Link>
        <span>/</span>
        <span className="text-[#1F1A24] dark:text-white font-semibold">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
        {/* Left Column: Multi-Angle Gallery & Live Engraving Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-h-[340px] sm:max-h-none rounded-[22px] sm:rounded-[32px] overflow-hidden bg-neutral-100 dark:bg-neutral-800 liquid-glass border border-white/60 dark:border-white/10 shadow-2xl group">
            <Image
              src={imagesList[activeImageIndex]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Specular Engraving Live Overlay on the Flacon */}
            {selectedSize === 'Engraved (100ml)' && engravedText && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4 sm:p-6">
                <div className="glass-pill px-4 sm:px-6 py-2 sm:py-3.5 bg-white/40 dark:bg-black/50 backdrop-blur-md border border-white/80 shadow-2xl text-center transform -rotate-1 max-w-[240px] sm:max-w-[260px] w-full">
                  <span className="text-[8px] sm:text-[9px] font-mono-micro tracking-widest uppercase text-neutral-600 dark:text-neutral-300 block mb-0.5">
                    {brandName} PARFUMS
                  </span>
                  <span
                    className={`text-base sm:text-xl font-bold tracking-wider text-[#1F1A24] dark:text-white drop-shadow block ${
                      engravedFont === 'Classic Serif'
                        ? 'font-display italic'
                        : engravedFont === 'Modern Sans'
                        ? 'font-sans uppercase tracking-widest'
                        : 'font-mono-micro uppercase tracking-widest'
                    }`}
                  >
                    {engravedText}
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-mono-micro tracking-widest uppercase text-neutral-500 block mt-0.5">
                    EXTRAIT DE PARFUM
                  </span>
                </div>
              </div>
            )}

            {/* Action floating buttons */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleShare}
                className="p-2 sm:p-3 rounded-full liquid-glass bg-white/70 dark:bg-black/50 text-[#1F1A24] dark:text-white hover:scale-105 active:scale-95 transition-all"
                title="Copy product link"
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-2 sm:p-3 rounded-full liquid-glass bg-white/70 dark:bg-black/50 text-[#1F1A24] dark:text-white hover:scale-105 active:scale-95 transition-all"
                title="Save to wishlist"
              >
                <Heart
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    isFavorited ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>
            </div>

            {copiedLink && (
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 glass-pill px-3 py-1 text-[11px] font-mono-micro text-white bg-black/80">
                Link copied to clipboard!
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-1 mobile-touch-scroll">
            {imagesList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-24 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all shrink-0 touch-manipulation ${
                  activeImageIndex === idx
                    ? 'border-black dark:border-white scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="Thumbnail view" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Specs, Pyramid, Meters, and Add to Cart (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono-micro text-[#887F93] uppercase tracking-wider mb-0.5 sm:mb-1">
              <span>{product.tagline}</span>
              <span>{product.gender}</span>
            </div>
            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-[#1F1A24] dark:text-white">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm italic text-[#6B6475] dark:text-[#A79EB2] mt-0.5 sm:mt-1 font-serif">
              &ldquo;{product.moodLine}&rdquo;
            </p>

            <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500" />
                <span className="text-[11px] sm:text-xs font-mono-micro font-semibold">{product.rating}</span>
              </div>
              <span className="opacity-40 text-xs">/</span>
              <span className="text-[11px] sm:text-xs text-neutral-500 font-mono-micro">
                {product.reviewsCount} verified reviews
              </span>
              <span className="opacity-40 text-xs">/</span>
              <span className="text-[11px] sm:text-xs text-neutral-500 font-mono-micro">
                {product.concentration}
              </span>
            </div>
          </div>

          <p className="text-sm text-[#544C5E] dark:text-[#B6ADC2] leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="p-5 rounded-2xl liquid-glass bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono-micro uppercase text-[#887F93]">
              <span>Choose Bottle Edition</span>
              <span className="font-bold text-base text-[#1F1A24] dark:text-white">
                ₹{currentPrice}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['50ml', '100ml', 'Engraved (100ml)'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 px-3 rounded-full text-xs font-mono-micro transition-all border ${
                    selectedSize === size
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold shadow-md'
                      : 'glass-pill text-neutral-600 dark:text-neutral-300 hover:border-black/30'
                  }`}
                >
                  {size === 'Engraved (100ml)' ? '✦ Engraved' : size}
                </button>
              ))}
            </div>

            {/* Custom Engraving Field if selected */}
            {selectedSize === 'Engraved (100ml)' && (
              <div className="pt-3 border-t border-black/5 dark:border-white/10 space-y-2">
                <label className="text-xs font-mono-micro uppercase text-[#8A6A32] dark:text-[#E8D3A8] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Monogram or Name (Max 16 Chars)</span>
                </label>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="e.g. VALENTINA S."
                  value={engravedText}
                  onChange={(e) => setEngravedText(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-full bg-white dark:bg-black/40 border border-black/15 dark:border-white/20 outline-none font-mono-micro uppercase"
                />
                <div className="flex gap-2 text-[10px] font-mono-micro pt-1">
                  {['Classic Serif', 'Modern Sans', 'Monogram'].map((font) => (
                    <button
                      key={font}
                      onClick={() => setEngravedFont(font)}
                      className={`px-3 py-1 rounded-full border transition-all ${
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
          </div>

          {/* Add to Cart Bar */}
          <div className="flex gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 border border-black/10 dark:border-white/10 rounded-full px-3 py-2 bg-white/60 dark:bg-white/5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-neutral-500 hover:text-black dark:hover:text-white p-1 touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono-micro font-semibold px-1 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-neutral-500 hover:text-black dark:hover:text-white p-1 touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 glass-btn-solid py-4 text-xs font-mono-micro uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Wardrobe — ₹{currentPrice * quantity}</span>
            </button>
          </div>

          {/* Longevity & Projection Meters */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl liquid-glass bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono-micro uppercase mb-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Longevity</span>
              </div>
              <div className="font-medium text-xs text-[#1F1A24] dark:text-white">
                {product.meters.longevityLabel}
              </div>
              <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${product.meters.longevity * 10}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl liquid-glass bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono-micro uppercase mb-1">
                <Wind className="w-3.5 h-3.5 text-amber-500" />
                <span>Sillage Trail</span>
              </div>
              <div className="font-medium text-xs text-[#1F1A24] dark:text-white">
                {product.meters.sillage}
              </div>
              <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${product.meters.sillagePercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Fragrance Notes Pyramid */}
          <div className="p-5 rounded-2xl liquid-glass bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-micro uppercase text-[#887F93] tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Olfactory Architecture</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="font-mono-micro text-[11px] text-teal-700 dark:text-teal-300 w-16 shrink-0 uppercase font-semibold">
                  Top (0–30m)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.top.map((n) => (
                    <span
                      key={n}
                      className="glass-pill px-3 py-1 text-[11px] text-neutral-800 dark:text-neutral-200"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono-micro text-[11px] text-rose-700 dark:text-rose-300 w-16 shrink-0 uppercase font-semibold">
                  Heart (2–4h)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.heart.map((n) => (
                    <span
                      key={n}
                      className="glass-pill px-3 py-1 text-[11px] text-neutral-800 dark:text-neutral-200"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono-micro text-[11px] text-amber-700 dark:text-amber-300 w-16 shrink-0 uppercase font-semibold">
                  Base (6–12h)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.base.map((n) => (
                    <span
                      key={n}
                      className="glass-pill px-3 py-1 text-[11px] text-neutral-800 dark:text-neutral-200"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Layering Guide Recommendation */}
          {product.layeringWith && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
              <div className="font-mono-micro uppercase text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Harmonious Layering Pairing</span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300">
                Layer with{' '}
                <Link
                  href={`/product/${product.layeringWith.slug}`}
                  className="font-bold underline"
                >
                  {product.layeringWith.name}
                </Link>
                : {product.layeringWith.effect}
              </p>
            </div>
          )}

          {/* Trust points */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono-micro text-neutral-500">
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-emerald-600" /> Free Shipping
            </div>
            <div className="flex items-center gap-1">
              <RotateCcw className="w-3 h-3 text-indigo-600" /> Free Exchanges
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-600" /> Sample First
            </div>
          </div>
        </div>
      </div>

      {/* Related Fragrances */}
      <div className="pt-8 sm:pt-16 border-t border-black/5 dark:border-white/10 space-y-4 sm:space-y-8">
        <div>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl text-[#1F1A24] dark:text-white">
            Fragrances you may adore
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p as any} />
          ))}
        </div>
      </div>
    </div>
  );
}
