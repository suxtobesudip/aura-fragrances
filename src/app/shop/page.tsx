'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { SlidersHorizontal, X, Heart, Search } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialFamily = searchParams.get('family') || 'All';
  const initialGender = searchParams.get('gender') || 'All';
  const initialFilter = searchParams.get('filter') || '';
  const initialQuery = searchParams.get('q') || '';

  const { wishlist } = useStore();

  const [selectedFamily, setSelectedFamily] = useState<string>(initialFamily);
  const [selectedGender, setSelectedGender] = useState<string>(initialGender);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string>('All');
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(initialFilter === 'wishlist');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(initialGender !== 'All');

  // React to URL search query changes (e.g. navigation from navbar or categories)
  useEffect(() => {
    const family = searchParams.get('family');
    setSelectedFamily(family || 'All');

    const gender = searchParams.get('gender');
    setSelectedGender(gender || 'All');

    const filter = searchParams.get('filter');
    setShowWishlistOnly(filter === 'wishlist');

    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const families = ['All', 'Fresh', 'Floral', 'Woody'];
  const genders = ['All', 'For Everyone', 'For Her', 'For Him'];
  const timesOfDay = ['All', 'Morning Glow', 'Golden Hour', 'Midnight', 'Day & Night'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((prod) => {
        // Family filter
        if (selectedFamily !== 'All' && prod.family !== selectedFamily) return false;

        // Gender filter
        if (selectedGender !== 'All' && prod.gender !== selectedGender) return false;

        // Time of Day
        if (selectedTimeOfDay !== 'All' && prod.timeOfDay !== selectedTimeOfDay) return false;

        // Wishlist filter
        if (showWishlistOnly && !wishlist.includes(prod.id)) return false;

        // Search text: Comprehensive multi-attribute match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = prod.name.toLowerCase().includes(q);
          const matchFamily = prod.family.toLowerCase().includes(q);
          const matchGender = prod.gender.toLowerCase().includes(q);
          const matchTime = prod.timeOfDay.toLowerCase().includes(q);
          const matchTagline = prod.tagline?.toLowerCase().includes(q);
          const matchMood = prod.moodLine?.toLowerCase().includes(q);
          const matchShort = prod.shortDescription?.toLowerCase().includes(q);
          const matchDesc = prod.description.toLowerCase().includes(q);
          const matchNotes = [
            ...prod.notes.top,
            ...prod.notes.heart,
            ...prod.notes.base,
          ].some((note) => note.toLowerCase().includes(q));

          if (
            !matchName &&
            !matchFamily &&
            !matchGender &&
            !matchTime &&
            !matchTagline &&
            !matchMood &&
            !matchShort &&
            !matchDesc &&
            !matchNotes
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [
    selectedFamily,
    selectedGender,
    selectedTimeOfDay,
    showWishlistOnly,
    searchQuery,
    sortBy,
    wishlist,
  ]);

  const resetFilters = () => {
    setSelectedFamily('All');
    setSelectedGender('All');
    setSelectedTimeOfDay('All');
    setShowWishlistOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedFamily !== 'All' ||
    selectedGender !== 'All' ||
    selectedTimeOfDay !== 'All' ||
    showWishlistOnly ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
      {/* Editorial Graphic Header */}
      <div className="relative text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 pt-1 sm:pt-6 pb-1 sm:pb-2">
        {/* Scaled Editorial Title */}
        <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#1F1A24] dark:text-[#F7F3EE] tracking-tight font-light leading-none">
          The Fragrance <span className="italic font-serif font-light text-[#9E7743] dark:text-[#E8D3A8]">Wardrobe</span>
        </h1>

        {/* Refined Subtitle */}
        <p className="text-xs sm:text-base text-[#6B6475] dark:text-[#A79EB2] max-w-sm sm:max-w-lg mx-auto font-light leading-relaxed">
          Eight original extraits formulated at 28% noble oil concentration. Hand-poured in numbered editions of 300 borosilicate flacons.
        </p>
      </div>

      {/* Minimalist Filter Bar */}
      <div className="space-y-2.5">
        <div className="liquid-glass rounded-2xl sm:rounded-full p-1.5 bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {/* Family Segmented Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none px-1">
            {families.map((family) => (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-3.5 py-1 rounded-full text-[11px] font-mono-micro tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  selectedFamily === family
                    ? 'bg-[#1F1A24] text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                    : 'text-[#6B6475] dark:text-[#A79EB2] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {family}
              </button>
            ))}
          </div>

          {/* Right Controls: Search, Filters toggle, Wishlist, Sort */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap px-1">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search notes or mood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-6 py-1 text-xs rounded-full bg-white/60 dark:bg-black/30 border border-black/10 dark:border-white/15 outline-none font-mono-micro text-[#1F1A24] dark:text-white placeholder:text-neutral-400 focus:border-[#C6A67A] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter Toggle (Silhouette & Occasion) */}
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono-micro tracking-wider uppercase flex items-center gap-1.5 border transition-all cursor-pointer ${
                isFilterDrawerOpen || selectedGender !== 'All' || selectedTimeOfDay !== 'All'
                  ? 'bg-amber-100/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                  : 'glass-pill text-[#6B6475] dark:text-[#A79EB2] border-black/5 dark:border-white/10 hover:border-black/20'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filters</span>
              {(selectedGender !== 'All' || selectedTimeOfDay !== 'All') && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              )}
            </button>

            {/* Wishlist toggle */}
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`p-1.5 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                showWishlistOnly
                  ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                  : 'glass-pill text-neutral-500 dark:text-neutral-400 border-black/5 dark:border-white/10 hover:text-rose-500'
              }`}
              title="Show Wishlist only"
            >
              <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-white' : ''}`} />
            </button>

            {/* Sort selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="glass-pill px-2.5 py-1 text-[11px] font-mono-micro bg-transparent outline-none text-[#1F1A24] dark:text-white cursor-pointer border border-black/5 dark:border-white/10"
            >
              <option value="featured" className="bg-[#F7F3EE] dark:bg-[#1A1424]">Featured</option>
              <option value="price-low" className="bg-[#F7F3EE] dark:bg-[#1A1424]">Price: Low → High</option>
              <option value="price-high" className="bg-[#F7F3EE] dark:bg-[#1A1424]">Price: High → Low</option>
              <option value="rating" className="bg-[#F7F3EE] dark:bg-[#1A1424]">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Collapsible Secondary Facets */}
        {isFilterDrawerOpen && (
          <div className="liquid-glass rounded-2xl p-4 bg-white/60 dark:bg-white/5 border border-white/50 dark:border-white/10 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-mono-micro">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-neutral-400 uppercase text-[10px] tracking-wider">Silhouette:</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {genders.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                        selectedGender === g
                          ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-neutral-400 uppercase text-[10px] tracking-wider">Occasion:</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {timesOfDay.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTimeOfDay(t)}
                      className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                        selectedTimeOfDay === t
                          ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Micro Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between px-2 text-xs font-mono-micro">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-neutral-400 text-[11px]">Active:</span>
              {selectedFamily !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[11px]">
                  {selectedFamily}
                  <button onClick={() => setSelectedFamily('All')} className="hover:text-red-500 font-bold ml-0.5 cursor-pointer">×</button>
                </span>
              )}
              {selectedGender !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[11px]">
                  {selectedGender}
                  <button onClick={() => setSelectedGender('All')} className="hover:text-red-500 font-bold ml-0.5 cursor-pointer">×</button>
                </span>
              )}
              {selectedTimeOfDay !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[11px]">
                  {selectedTimeOfDay}
                  <button onClick={() => setSelectedTimeOfDay('All')} className="hover:text-red-500 font-bold ml-0.5 cursor-pointer">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[11px]">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-500 font-bold ml-0.5 cursor-pointer">×</button>
                </span>
              )}
              {showWishlistOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-[11px]">
                  Wishlist
                  <button onClick={() => setShowWishlistOnly(false)} className="hover:text-red-500 font-bold ml-0.5 cursor-pointer">×</button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-amber-800 dark:text-amber-300 underline underline-offset-2 ml-1 text-[11px] cursor-pointer"
              >
                Clear all
              </button>
            </div>
            <span className="text-neutral-400 text-[11px] whitespace-nowrap hidden sm:inline">
              Showing {filteredProducts.length} of {productsData.length} parfums
            </span>
          </div>
        )}
      </div>

      {/* Catalogue Status Header */}
      <div className="flex items-center justify-between text-xs font-mono-micro text-[#887F93] dark:text-[#A79EB2] px-1 pt-1 pb-2 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-[0.2em] text-[10px] text-[#A37D4E] dark:text-[#E8D3A8] font-bold">
            ARCHIVE INDEX
          </span>
          <span className="opacity-40">/</span>
          <span className="text-[#1F1A24] dark:text-white font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Creation' : 'Creations'} Available
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-amber-800 dark:text-amber-300 hover:underline uppercase text-[10px] tracking-wider cursor-pointer"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="liquid-glass rounded-[32px] p-12 text-center space-y-4">
          <h3 className="font-display text-3xl text-[#1F1A24] dark:text-white">
            No fragrances matched your criteria.
          </h3>
          <p className="text-xs text-[#6B6475] dark:text-[#A79EB2] max-w-sm mx-auto">
            Try adjusting your note keywords or reset filters to explore our full selection of Extrait parfums.
          </p>
          <button
            onClick={resetFilters}
            className="glass-btn-solid px-6 py-2.5 text-xs font-mono-micro uppercase tracking-wider cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-6 items-stretch">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod as any} />
          ))}
        </div>
      )}

      {/* Editorial Discovery Banner */}
      <div className="liquid-glass rounded-2xl p-6 sm:p-7 border border-white/60 dark:border-white/10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-sm">
        <div className="space-y-1 max-w-lg">
          <span className="text-[10px] font-mono-micro tracking-widest uppercase text-[#9E7743] dark:text-[#E8D3A8]">
            DIAGNOSTIC
          </span>
          <h3 className="font-display text-xl sm:text-2xl text-[#1F1A24] dark:text-white font-light">
            Uncertain which extrait suits your skin chemistry?
          </h3>
          <p className="text-xs text-[#6B6475] dark:text-[#A79EB2] leading-relaxed">
            Take our 45-second scent persona quiz or consult directly with our concierges.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/quiz"
            className="glass-btn-solid px-4 py-2 text-xs font-mono-micro uppercase tracking-wider"
          >
            Take Scent Quiz
          </Link>
          <Link
            href="/contact"
            className="glass-btn-outline px-4 py-2 text-xs font-mono-micro uppercase tracking-wider"
          >
            Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono-micro text-xs">Loading Wardrobe...</div>}>
      <ShopContent />
    </Suspense>
  );
}
