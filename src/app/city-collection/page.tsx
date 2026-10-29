'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import citiesData from '@/data/cities.json';
import {
  MapPin,
  Sparkles,
  ShoppingBag,
  Volume2,
  VolumeX,
  Layers,
  ThermometerSun,
  ArrowRight,
} from 'lucide-react';

export default function CityCollectionPage() {
  const { addToCart } = useStore();
  const [activeCityId, setActiveCityId] = useState(citiesData[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeCity = citiesData.find((c) => c.id === activeCityId) || citiesData[0];

  const handleAddCityToCart = (cityItem: typeof activeCity) => {
    // Map to a cartable product structure
    const syntheticProduct = {
      id: cityItem.id,
      slug: cityItem.slug,
      name: cityItem.name,
      family: cityItem.family,
      tagline: cityItem.tagline,
      gender: 'For Everyone',
      timeOfDay: 'Day & Night',
      price: cityItem.price,
      price100ml: cityItem.price,
      engravedPrice: cityItem.price + 400,
      rating: cityItem.rating,
      reviewsCount: 84,
      moodLine: cityItem.moodLine,
      shortDescription: cityItem.quote,
      description: cityItem.quote,
      concentration: 'Extrait de Parfum (28% perfume oils)',
      notes: cityItem.notes,
      meters: {
        longevity: 10,
        longevityLabel: '12–14 Hours',
        sillage: 'Radiant',
        sillagePercent: 88,
      },
      images: {
        primary: cityItem.bottleImage,
        secondary: cityItem.image,
        macro: cityItem.image,
      },
    };

    addToCart(syntheticProduct as any, '100ml');
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 py-4 sm:py-16 space-y-6 sm:space-y-16">
      {/* Editorial Prologue */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-4">
        <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl lg:text-7xl text-[#1F1A24] dark:text-[#F7F3EE]">
          Scents from somewhere else.
        </h1>

        <p className="text-xs sm:text-base text-[#595163] dark:text-[#B6ADC2] leading-relaxed font-light max-w-xl mx-auto">
          We traveled to four sensory crossroads of the world. In each, our perfumers extracted the precise volatile signature of morning mist, sunbaked terracotta, river air, and midnight neon.
        </p>
      </div>

      {/* City Navigation Selector Tabs */}
      <div className="flex justify-center -mx-3.5 xs:-mx-4 px-3.5 xs:px-4 overflow-x-auto no-scrollbar mobile-touch-scroll">
        <div className="glass-pill p-1 sm:p-1.5 flex items-center justify-center gap-1.5 sm:gap-2 bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-lg min-w-max">
          {citiesData.map((city) => (
            <button
              key={city.id}
              onClick={() => setActiveCityId(city.id)}
              className={`px-3.5 xs:px-5 py-1.5 xs:py-2 rounded-full text-xs font-mono-micro transition-all touch-manipulation cursor-pointer ${
                activeCityId === city.id
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-md scale-105'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {city.city} ({city.name})
            </button>
          ))}
        </div>
      </div>

      {/* Featured City Immersive Showcase */}
      <div className="liquid-glass rounded-[22px] sm:rounded-[36px] overflow-hidden bg-[#1E1728] text-white border border-white/20 shadow-2xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
          {/* Left: Atmospheric Visual & Bottle with Soundscape Toggle (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[260px] xs:min-h-[300px] sm:min-h-[540px]">
            <Image
              src={activeCity.image}
              alt={activeCity.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1728] via-[#1E1728]/30 to-transparent" />

            {/* Overlaid Flacon Preview */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between z-10 gap-2">
              <div className="liquid-glass rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-black/60 backdrop-blur-xl border border-white/20 max-w-sm">
                <span className="text-[9px] sm:text-[10px] font-mono-micro text-[#CFC3F0] uppercase tracking-wider block mb-0.5 sm:mb-1">
                  COORDINATES
                </span>
                <span className="text-[11px] sm:text-xs font-mono-micro text-white block">
                  {activeCity.coordinates}
                </span>
                <p className="text-[11px] sm:text-xs italic text-neutral-300 font-serif mt-1 sm:mt-2 line-clamp-2">
                  &ldquo;{activeCity.moodLine}&rdquo;
                </p>
              </div>

              {/* Soundscape ambience trigger */}
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="liquid-glass p-2.5 sm:p-3 rounded-full bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 text-xs font-mono-micro touch-manipulation shrink-0"
                title="Toggle ambient soundscape"
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    <span className="hidden sm:inline">Ambience On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-300" />
                    <span className="hidden sm:inline">Play Ambience</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: City Details, Fragrance Pyramid & Purchase (5 cols) */}
          <div className="lg:col-span-5 p-5 xs:p-6 sm:p-12 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div>
              <div className="text-xs font-mono-micro uppercase text-[#CFC3F0] tracking-widest mb-1">
                {activeCity.tagline}
              </div>
              <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl text-white">
                {activeCity.name}
              </h2>
              <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2 text-xs font-mono-micro text-neutral-400">
                <span className="text-[#E8D3A8]">★★★★★ {activeCity.rating}</span>
                <span className="opacity-40">/</span>
                <span>{activeCity.family}</span>
              </div>

              <blockquote className="font-display text-base xs:text-lg sm:text-2xl italic text-neutral-200 mt-3 sm:mt-4 leading-relaxed font-serif">
                &ldquo;{activeCity.quote}&rdquo;
              </blockquote>

              {/* Climate performance feature */}
              <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-xs flex items-start gap-2.5 sm:gap-3">
                <ThermometerSun className="w-4 h-4 text-[#E8D3A8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono-micro text-[10px] uppercase text-[#E8D3A8] block">
                    CLIMATE PERFORMANCE
                  </span>
                  <p className="text-neutral-300 mt-0.5 leading-relaxed">{activeCity.weatherPerformance}</p>
                </div>
              </div>

              {/* Full Notes Breakdown */}
              <div className="mt-4 sm:mt-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-mono-micro text-[10px] uppercase text-neutral-400">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Pyramid Composition</span>
                </div>
                <div className="text-neutral-300">
                  <strong className="text-[#CFC3F0] font-mono-micro text-[11px]">Top:</strong>{' '}
                  {activeCity.notes.top.join(', ')}
                </div>
                <div className="text-neutral-300">
                  <strong className="text-[#F2C9D0] font-mono-micro text-[11px]">Heart:</strong>{' '}
                  {activeCity.notes.heart.join(', ')}
                </div>
                <div className="text-neutral-300">
                  <strong className="text-[#CFE0D4] font-mono-micro text-[11px]">Base:</strong>{' '}
                  {activeCity.notes.base.join(', ')}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono-micro uppercase text-neutral-400 block">
                  100ML EXTRAIT PARFUM
                </span>
                <span className="text-xl sm:text-2xl font-mono-micro font-bold text-white">
                  ₹{activeCity.price}
                </span>
              </div>

              <button
                onClick={() => handleAddCityToCart(activeCity)}
                className="glass-btn-solid px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-mono-micro uppercase tracking-wider text-black bg-white hover:bg-neutral-200 active:scale-95 transition-all flex items-center gap-2 touch-manipulation cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Parfum</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All 4 Cities Grid Cards */}
      <div className="space-y-4 sm:space-y-6">
        <div>
          <span className="text-xs font-mono-micro uppercase text-[#887F93] tracking-widest">
            THE COMPLETE ATLAS
          </span>
          <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl text-[#1F1A24] dark:text-white mt-1">
            Explore All Geographic Extraits
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-6">
          {citiesData.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveCityId(c.id)}
              className={`liquid-glass-card rounded-[20px] sm:rounded-[28px] p-3.5 xs:p-4 sm:p-5 cursor-pointer border transition-all active:scale-[0.98] ${
                activeCityId === c.id
                  ? 'bg-[#2A2038] text-white border-white/30 shadow-2xl scale-[1.01]'
                  : 'bg-white/60 dark:bg-white/5 border-white/50 dark:border-white/10'
              }`}
            >
              <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-3">
                <Image src={c.image} alt={c.name} fill sizes="50vw" className="object-cover" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono-micro uppercase text-neutral-500 block mb-0.5 sm:mb-1 truncate">
                {c.coordinates}
              </span>
              <h4 className="font-display text-base xs:text-lg sm:text-2xl leading-tight truncate">{c.name}</h4>
              <p className="text-[11px] sm:text-xs italic text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                &ldquo;{c.moodLine}&rdquo;
              </p>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-black/5 dark:border-white/10 flex justify-between items-center text-xs font-mono-micro">
                <span className="font-bold">₹{c.price}</span>
                <span className="underline underline-offset-2">View →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
