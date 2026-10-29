'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore, Product } from '@/context/StoreContext';
import { Heart, Star, Eye, ShoppingBag, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml' | 'Engraved (100ml)'>('50ml');
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const currentPrice =
    selectedSize === '50ml'
      ? product.price
      : selectedSize === '100ml'
      ? product.price100ml
      : product.engravedPrice;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="liquid-glass-card group flex flex-col justify-between p-2.5 xs:p-3 sm:p-5 rounded-[18px] sm:rounded-[26px] h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col flex-1">
        {/* Image Container */}
        <div className="relative aspect-[4/5] rounded-[14px] sm:rounded-[22px] overflow-hidden bg-[#E8DFD0] dark:bg-neutral-800/60 mb-2 sm:mb-4 border border-[#D5C6B1]/70 dark:border-white/5 shadow-inner">
          {/* Primary perfume bottle image */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={product.images.primary}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>

          {/* Micro-badge */}
          {product.badge && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 glass-pill px-2 py-0.5 text-[8px] sm:text-[10px] font-mono-micro uppercase tracking-wider text-[#1F1A24] dark:text-white bg-white/70 dark:bg-black/50">
              {product.badge}
            </div>
          )}

          {/* Wishlist Heart */}
          <button
            onClick={handleWishlist}
            aria-label={`Save ${product.name} to wishlist`}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full liquid-glass bg-white/60 dark:bg-black/40 text-[#1F1A24] dark:text-white transition-colors z-10"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                isFavorited ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'
              }`}
            />
          </button>

          {/* Hover Actions Bar (Quick view & Quick add) */}
          <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <button
              onClick={handleQuickAdd}
              className="flex-1 glass-btn-solid py-2 px-3 text-[11px] font-mono-micro uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl hover:bg-white"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
            <button
              onClick={handleQuickView}
              aria-label="Quick preview"
              className="glass-pill p-2 text-[#1F1A24] dark:text-white bg-white/70 dark:bg-black/50 hover:bg-white shadow-xl"
              title="Quick view notes pyramid"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-1 sm:space-y-1.5 flex flex-col flex-1 justify-start">
          <div className="flex items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono-micro text-[#887F93] dark:text-[#A89FB3] min-h-[14px] sm:min-h-[16px]">
            <span className="truncate pr-1">{product.tagline}</span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
            <h3 className="font-display text-sm xs:text-base sm:text-2xl text-[#1F1A24] dark:text-white leading-tight truncate">
              {product.name}
            </h3>
          </Link>

          <p className="text-[10px] sm:text-xs text-[#6B6475] dark:text-[#9F96AA] truncate italic font-serif min-h-[14px] sm:min-h-[16px]">
            &ldquo;{product.moodLine}&rdquo;
          </p>
        </div>
      </div>

      {/* Footer controls: Size Selector & Price */}
      <div className="mt-auto pt-2 sm:pt-3 border-t border-black/5 dark:border-white/10 space-y-2 sm:space-y-3">
        {/* Pill Size Selector */}
        <div className="grid grid-cols-3 gap-0.5 sm:gap-1 bg-black/5 dark:bg-white/5 p-0.5 sm:p-1 rounded-full text-[8px] xs:text-[9px] sm:text-[10px] font-mono-micro">
          {(['50ml', '100ml', 'Engraved (100ml)'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-1 sm:py-1.5 px-0.5 sm:px-1 rounded-full transition-all text-center truncate touch-manipulation ${
                selectedSize === size
                  ? 'bg-white dark:bg-[#2C2138] text-[#1F1A24] dark:text-white font-bold shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {size === 'Engraved (100ml)' ? (
                <>
                  <span className="xs:hidden">✦ Engr</span>
                  <span className="hidden xs:inline">✦ Engraved</span>
                </>
              ) : (
                size
              )}
            </button>
          ))}
        </div>

        {/* Price & View CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[8px] sm:text-[10px] font-mono-micro uppercase text-neutral-400">PRICE</div>
            <div className="text-xs xs:text-sm sm:text-base font-mono-micro font-bold text-[#1F1A24] dark:text-white">
              ₹{currentPrice}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Quick 1-tap add button for mobile shoppers */}
            <button
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to cart`}
              className="sm:hidden p-1.5 rounded-full liquid-glass bg-white/80 dark:bg-white/10 active:scale-90 text-[#1F1A24] dark:text-white border border-black/5 dark:border-white/10 shadow-xs"
              title="Add to Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-800 dark:text-amber-300" />
            </button>

            <Link
              href={`/product/${product.slug}`}
              className="text-[10px] sm:text-xs font-mono-micro uppercase tracking-wider text-[#1F1A24] dark:text-white underline underline-offset-4 decoration-black/20 dark:decoration-white/20 hover:decoration-black dark:hover:decoration-white py-1 px-1.5 sm:py-1.5 sm:px-2 touch-manipulation rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Discover →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
