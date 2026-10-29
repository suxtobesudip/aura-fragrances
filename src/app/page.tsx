'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import journalData from '@/data/journal.json';
import {
  ArrowRight,
  Compass,
  Star,
  CheckCircle2,
  ChevronRight,
  Clock,
  Shield,
  Droplets,
  FlaskConical,
  Feather,
  RotateCcw,
  Disc,
  X,
} from 'lucide-react';

export default function HomePage() {
  const { brandName } = useStore();
  const [readingArticle, setReadingArticle] = useState<(typeof journalData)[0] | null>(null);

  // Haute Parfumerie Flacons Carousel
  const flaconSlides = [
    {
      id: 'lumina',
      name: 'AURA LUMINA',
      tagline: 'Solar Amber',
      image: '/images/hero-flacon-lumina.png',
      alt: 'AURA LUMINA Solar Amber Crystal Flacon',
      glow: 'from-amber-500/35 via-orange-400/25 to-rose-400/25 dark:from-amber-500/20 dark:via-rose-500/10 dark:to-yellow-500/15',
    },
    {
      id: 'nocturne',
      name: 'AURA NOCTURNE',
      tagline: 'Midnight Velvet',
      image: '/images/hero-flacon-nocturne.png',
      alt: 'AURA NOCTURNE Midnight Velvet Crystal Flacon',
      glow: 'from-purple-700/35 via-rose-500/25 to-indigo-800/30 dark:from-purple-500/25 dark:via-rose-600/15 dark:to-indigo-600/20',
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Lock body scroll on mobile touch screens when reading journal article
  useEffect(() => {
    if (readingArticle) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [readingArticle]);

  useEffect(() => {
    // Display each perfume bottle for 6 seconds
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % flaconSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [flaconSlides.length]);

  const activeFlacon = flaconSlides[currentSlideIndex];

  return (
    <div className="space-y-12 sm:space-y-20 lg:space-y-28 pb-16 sm:pb-24">
      {/* ────────────────────────────────────────────────────────
          A. HERO (FULL VIEWPORT) WITH INTERACTIVE FLACON
          ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-0 lg:min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 max-w-7xl mx-auto pt-3 sm:pt-6 lg:pt-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
          {/* Left: Giant Serif Headline & Subtitle */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-3 sm:space-y-6 z-10 max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Aesthetic Balanced Headline in Exactly Two Lines */}
            <h1 className="font-display text-[32px] xs:text-[38px] sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[74px] tracking-[-0.015em] leading-[1.08] text-[#1F1A24] dark:text-[#F7F3EE]">
              <span className="block sm:whitespace-nowrap">Smell like</span>
              <span className="block sm:whitespace-nowrap">
                <span className="font-serif-italic italic font-normal text-[#9E6F3A] dark:text-[#E8D3A8] mr-2 sm:mr-3.5 transition-colors">
                  your
                </span>
                best memory.
              </span>
            </h1>

            <p className="font-pinterest text-sm xs:text-base sm:text-xl lg:text-2xl text-[#554D60] dark:text-[#C5BED0] max-w-2xl font-light italic leading-relaxed tracking-wide text-pretty">
              Long-wear botanical extraits, blended in small batches and crafted to linger like an intimate personal signature.
            </p>

            {/* Desktop CTAs & Trust Indicators (Left Column on Desktop) */}
            <div className="hidden lg:flex flex-col gap-6 pt-3 w-full">
              <div className="flex items-center gap-4">
                <Link
                  href="/quiz"
                  className="glass-btn-solid px-8 py-4 text-xs font-mono-micro uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-xl active:scale-95 transition-all text-center"
                >
                  <Compass className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Find My Scent</span>
                </Link>

                <Link
                  href="/shop"
                  className="glass-btn-outline px-7 py-4 text-xs font-mono-micro uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/40 dark:hover:bg-white/10 active:scale-95 transition-all text-center"
                >
                  <span>Explore Wardrobe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Micro Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono-micro text-[#786F84] dark:text-[#9F96AA]">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-500">★★★★★</span>
                  <span className="font-semibold text-neutral-800 dark:text-white">4.9 / 5.0</span>
                  <span>(1,400+ reviews)</span>
                </div>
                <span className="opacity-40">/</span>
                <span>Clean Molecular Fixatives</span>
                <span className="opacity-40">/</span>
                <span>French Borosilicate Parfums</span>
              </div>
            </div>
          </div>

          {/* Haute Parfumerie Flacon Carousel (Centered between Header & CTAs on Mobile, Right Column on Desktop) */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex flex-col items-center justify-center w-full my-1 sm:my-3 lg:my-0">
            {/* Automatic Title Banner Above Flacon */}
            <div className="h-6 sm:h-8 flex items-center justify-center mb-1 sm:mb-2 overflow-hidden">
              <div
                key={activeFlacon.id}
                className="animate-editorial-fade flex items-center justify-center text-xs sm:text-xs font-mono-micro tracking-[0.2em] uppercase"
              >
                <span className="font-semibold text-[#8B7355] dark:text-[#E8D3A8]">
                  {activeFlacon.name}
                </span>
              </div>
            </div>

            {/* Stage Container */}
            <div
              className="relative w-full min-h-[250px] xs:min-h-[280px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center select-none"
            >
              {/* 1. Atmospheric Caustic Backlight Glow (morphs smoothly with active flacon) */}
              <div
                className={`absolute w-[220px] xs:w-[250px] sm:w-[380px] lg:w-[480px] h-[220px] xs:h-[250px] sm:h-[380px] lg:h-[480px] rounded-full bg-gradient-to-tr ${activeFlacon.glow} blur-xl sm:blur-3xl pointer-events-none transition-all duration-1000 ease-out`}
              />

              {/* 2. Soft Prismatic Conical Ambient Aura Halo */}
              <div
                className="absolute w-[190px] xs:w-[220px] sm:w-[340px] lg:w-[440px] h-[190px] xs:h-[220px] sm:h-[340px] lg:h-[440px] rounded-full pointer-events-none opacity-35 dark:opacity-20 bg-[radial-gradient(circle_at_center,_rgba(232,211,168,0.5)_0%,_rgba(242,201,208,0.2)_45%,_transparent_70%)] blur-lg sm:blur-2xl animate-halo-breathe"
              />

              {/* 4. Grounded Floor Contact Shadow (Synchronized Soft Breathing) */}
              <div
                className="absolute bottom-1 sm:bottom-6 lg:bottom-8 w-[130px] xs:w-[160px] sm:w-[220px] lg:w-[260px] h-[10px] xs:h-[12px] sm:h-[18px] rounded-full pointer-events-none blur-sm sm:blur-lg bg-gradient-to-r from-[#4A2D1B]/25 via-[#1A1009]/45 to-[#4A2D1B]/25 dark:from-black/60 dark:via-black/85 dark:to-black/60 animate-hero-shadow-breathe"
              />

              {/* 5. Ethereal Scent Dewdrop Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                <span
                  className="absolute top-[38%] left-[20%] w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-600/85 dark:bg-amber-200/75 shadow-[0_0_8px_rgba(217,119,6,0.55)] dark:shadow-none blur-[0.5px] animate-essence-drift"
                  style={{ animationDuration: '4.8s', animationDelay: '0s' }}
                />
                <span
                  className="absolute top-[52%] right-[18%] w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-600/80 dark:bg-rose-200/70 shadow-[0_0_8px_rgba(225,29,72,0.45)] dark:shadow-none blur-[0.5px] animate-essence-drift"
                  style={{ animationDuration: '5.8s', animationDelay: '1.4s' }}
                />
                <span
                  className="absolute top-[64%] left-[24%] w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-purple-700/80 dark:bg-purple-200/65 shadow-[0_0_8px_rgba(126,34,206,0.45)] dark:shadow-none blur-[0.5px] animate-essence-drift"
                  style={{ animationDuration: '5.2s', animationDelay: '2.6s' }}
                />
                <span
                  className="absolute top-[42%] right-[24%] w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#B45309]/90 dark:bg-amber-200/90 shadow-[0_0_8px_rgba(180,83,9,0.5)] dark:shadow-none blur-[0.5px] animate-essence-drift"
                  style={{ animationDuration: '5.5s', animationDelay: '0.8s' }}
                />
                <span
                  className="absolute top-[58%] left-[16%] w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#854D0E]/90 dark:bg-white/80 shadow-[0_0_8px_rgba(133,77,14,0.45)] dark:shadow-none blur-[0.5px] animate-essence-drift"
                  style={{ animationDuration: '6.4s', animationDelay: '3.5s' }}
                />
              </div>

              {/* Cross-fading Flacon Slides */}
              {flaconSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlideIndex
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div
                    className="relative w-[170px] xs:w-[200px] sm:w-[280px] lg:w-[390px] aspect-[3/4] animate-hero-flacon-float transform-gpu"
                    style={{
                      filter: 'drop-shadow(0 16px 28px rgba(30, 15, 45, 0.22))',
                      willChange: 'transform',
                    }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 210px, (max-width: 1024px) 280px, 390px"
                      className="object-contain pointer-events-none select-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Flacon Indicator Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-2 sm:mt-3">
              {flaconSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Show ${slide.name}`}
                  className={`h-1.5 rounded-full transition-all duration-300 touch-manipulation cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'w-6 bg-amber-700 dark:bg-[#E8D3A8]'
                      : 'w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile CTAs & Trust (Directly Underneath Bottle on Mobile, Hidden on lg+) */}
          <div className="flex lg:hidden flex-col items-center gap-3 w-full pt-1.5">
            <div className="flex flex-row items-center gap-2.5 xs:gap-3 w-full max-w-sm">
              <Link
                href="/quiz"
                className="glass-btn-solid flex-1 py-3 px-3.5 xs:px-4 text-[11px] xs:text-xs font-mono-micro uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl active:scale-95 transition-all text-center truncate"
              >
                <Compass className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                <span className="truncate">Find My Scent</span>
              </Link>

              <Link
                href="/shop"
                className="glass-btn-outline flex-1 py-3 px-3.5 xs:px-4 text-[11px] xs:text-xs font-mono-micro uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-white/40 dark:hover:bg-white/10 active:scale-95 transition-all text-center truncate"
              >
                <span className="truncate">Explore Wardrobe</span>
                <ArrowRight className="w-3 h-3 shrink-0" />
              </Link>
            </div>

            {/* Fast-Action Native Category Rail on Mobile */}
            <div className="w-full overflow-x-auto no-scrollbar mobile-touch-scroll py-1 -mx-3.5 xs:-mx-4 px-3.5 xs:px-4">
              <div className="flex items-center gap-1.5 min-w-max mx-auto justify-center">
                {[
                  { label: '✦ All', href: '/shop' },
                  { label: '🌸 Floral', href: '/floral' },
                  { label: '🌿 Fresh', href: '/fresh' },
                  { label: '🪵 Woody', href: '/woody' },
                  { label: '🧭 Quiz', href: '/quiz' },
                  { label: '🏛 Cities', href: '/city-collection' },
                  { label: '✍️ Custom', href: '/make-it-yours' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="glass-pill px-3 py-1 text-[11px] font-mono-micro uppercase tracking-wider text-[#1F1A24] dark:text-white bg-white/70 dark:bg-white/10 active:scale-95 transition-transform border border-black/5 dark:border-white/10 shadow-xs"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Micro Trust Indicators on Mobile */}
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 xs:gap-x-4 gap-y-1 text-xs font-mono-micro text-[#786F84] dark:text-[#9F96AA] text-center">
              <div className="flex items-center gap-1">
                <span className="text-amber-500">★★★★★</span>
                <span className="font-semibold text-neutral-800 dark:text-white">4.9 / 5.0</span>
                <span>(1,400+ reviews)</span>
              </div>
              <span className="opacity-40">•</span>
              <span>28% Extrait</span>
              <span className="opacity-40">•</span>
              <span>Borosilicate Glass</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          B. MINIMAL THIN HEADLINES RIBBON (NO EXTRA LABELS)
          ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-3 sm:py-5 border-y border-white/60 dark:border-white/10 bg-white/30 dark:bg-white/[0.03] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_12px_40px_rgba(20,15,35,0.06)] space-y-2 sm:space-y-3">
        {/* Soft edge fade masks for seamless ribbon entrance & exit */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#EFE7DA] dark:from-[#0E0B12] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#EFE7DA] dark:from-[#0E0B12] to-transparent z-10" />

        {/* Ribbon Track 1: Glassware & Noble Concentration (Flows Left) */}
        <div className="overflow-hidden whitespace-nowrap relative py-0.5">
          <div className="inline-flex animate-marquee gap-8 sm:gap-12 items-center">
            {[
              {
                icon: FlaskConical,
                headline: 'Borosilicate Glassware',
                accent: 'Hand-Blown Refraction',
                color: 'text-amber-600 dark:text-amber-300 bg-amber-500/10 border-amber-500/20',
              },
              {
                icon: Droplets,
                headline: '28% Extrait Concentration',
                accent: '14-Hour Luminous Sillage',
                color: 'text-rose-600 dark:text-rose-300 bg-rose-500/10 border-rose-500/20',
              },
              {
                icon: Disc,
                headline: 'Monolithic Magnetic Cap',
                accent: 'Weighted Hermetic Seal',
                color: 'text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/20',
              },
              {
                icon: Feather,
                headline: 'Grasse Natural Distillates',
                accent: 'Cold-Pressed Botanical Nectars',
                color: 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
              },
            ]
              .concat([
                {
                  icon: FlaskConical,
                  headline: 'Borosilicate Glassware',
                  accent: 'Hand-Blown Refraction',
                  color: 'text-amber-600 dark:text-amber-300 bg-amber-500/10 border-amber-500/20',
                },
                {
                  icon: Droplets,
                  headline: '28% Extrait Concentration',
                  accent: '14-Hour Luminous Sillage',
                  color: 'text-rose-600 dark:text-rose-300 bg-rose-500/10 border-rose-500/20',
                },
                {
                  icon: Disc,
                  headline: 'Monolithic Magnetic Cap',
                  accent: 'Weighted Hermetic Seal',
                  color: 'text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/20',
                },
                {
                  icon: Feather,
                  headline: 'Grasse Natural Distillates',
                  accent: 'Cold-Pressed Botanical Nectars',
                  color: 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
                },
              ])
              .map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="inline-flex items-center gap-6 sm:gap-10 shrink-0">
                    <div className="flex items-center gap-2.5 sm:gap-3 group/item cursor-default">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg liquid-glass flex items-center justify-center border ${item.color} shrink-0`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex items-baseline gap-2 sm:gap-2.5">
                        <span className="font-display font-light text-base sm:text-lg lg:text-xl tracking-wide text-[#1F1A24] dark:text-[#F7F3EE]">
                          {item.headline}
                        </span>
                        <span className="text-xs sm:text-[13px] font-serif-italic font-light text-[#785E70] dark:text-[#E8D3A8]/80 hidden md:inline">
                          — {item.accent}
                        </span>
                      </div>
                    </div>
                    <span className="text-black/25 dark:text-white/25 text-xs font-mono-micro px-1">/</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Ribbon Track 2: Formulation & Slow Craft Pillars (Flows Right / Reverse) */}
        <div className="overflow-hidden whitespace-nowrap relative py-0.5 border-t border-black/5 dark:border-white/5 pt-2.5 sm:pt-3 hidden sm:block">
          <div className="inline-flex animate-marquee-reverse gap-8 sm:gap-12 items-center">
            {[
              {
                icon: Clock,
                headline: '60-Day Amphora Ageing',
                accent: 'Unhurried Slow Maceration',
                color: 'text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
              },
              {
                icon: Shield,
                headline: 'Clean Molecular Alchemy',
                accent: 'Zero Phthalates or Synthetics',
                color: 'text-teal-600 dark:text-teal-300 bg-teal-500/10 border-teal-500/20',
              },
              {
                icon: RotateCcw,
                headline: 'Refillable Glass Keepsake',
                accent: 'Vessels Built for Generations',
                color: 'text-rose-600 dark:text-rose-300 bg-rose-500/10 border-rose-500/20',
              },
              {
                icon: CheckCircle2,
                headline: 'Numbered Artisanal Batches',
                accent: 'Hand-Inspected & Certified',
                color: 'text-amber-600 dark:text-amber-300 bg-amber-500/10 border-amber-500/20',
              },
            ]
              .concat([
                {
                  icon: Clock,
                  headline: '60-Day Amphora Ageing',
                  accent: 'Unhurried Slow Maceration',
                  color: 'text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
                },
                {
                  icon: Shield,
                  headline: 'Clean Molecular Alchemy',
                  accent: 'Zero Phthalates or Synthetics',
                  color: 'text-teal-600 dark:text-teal-300 bg-teal-500/10 border-teal-500/20',
                },
                {
                  icon: RotateCcw,
                  headline: 'Refillable Glass Keepsake',
                  accent: 'Vessels Built for Generations',
                  color: 'text-rose-600 dark:text-rose-300 bg-rose-500/10 border-rose-500/20',
                },
                {
                  icon: CheckCircle2,
                  headline: 'Numbered Artisanal Batches',
                  accent: 'Hand-Inspected & Certified',
                  color: 'text-amber-600 dark:text-amber-300 bg-amber-500/10 border-amber-500/20',
                },
              ])
              .map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="inline-flex items-center gap-6 sm:gap-10 shrink-0">
                    <div className="flex items-center gap-2.5 sm:gap-3 group/item cursor-default">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg liquid-glass flex items-center justify-center border ${item.color} shrink-0`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex items-baseline gap-2 sm:gap-2.5">
                        <span className="font-display font-light text-base sm:text-lg lg:text-xl tracking-wide text-[#1F1A24] dark:text-[#F7F3EE]">
                          {item.headline}
                        </span>
                        <span className="text-xs sm:text-[13px] font-serif-italic font-light text-[#785E70] dark:text-[#E8D3A8]/80 hidden md:inline">
                          — {item.accent}
                        </span>
                      </div>
                    </div>
                    <span className="text-black/25 dark:text-white/25 text-xs font-mono-micro px-1">/</span>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          C. "FIND YOUR FAMILY" (THE THREE ARCHETYPES)
          ──────────────────────────────────────────────────────── */}
      <section id="families" className="px-3.5 xs:px-4 sm:px-6 max-w-7xl mx-auto space-y-5 sm:space-y-8 scroll-mt-28 sm:scroll-mt-32">
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-[#1F1A24] dark:text-[#F7F3EE]">
            Find your olfactory family.
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-[#6B6475] dark:text-[#A79EB2]">
            Every person has an innate olfactory home. Discover the three distinct botanical worlds that define our collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Fresh */}
          <div className="liquid-glass-card rounded-[24px] sm:rounded-[32px] p-5 xs:p-6 sm:p-8 glow-fresh relative group min-h-[280px] sm:min-h-[380px] flex flex-col justify-between border border-teal-200/40 dark:border-teal-500/20">
            <div>
              <Link href="/fresh" className="inline-block text-xs font-mono-micro uppercase text-teal-800 dark:text-teal-300 tracking-widest mb-1.5 sm:mb-2 hover:underline">
                FAMILY 01
              </Link>
              <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl text-[#1F1A24] dark:text-white mb-1.5 sm:mb-2">
                <Link href="/fresh" className="hover:opacity-80 transition-opacity">
                  Fresh
                </Link>
              </h3>
              <p className="text-base xs:text-lg italic text-[#4F6357] dark:text-[#B5CCC0] font-serif">
                &ldquo;Crisp. Bright. Awake.&rdquo;
              </p>
              <p className="text-xs xs:text-sm text-[#526359] dark:text-[#A2B8AC] mt-2.5 sm:mt-3 leading-relaxed">
                Saline morning breezes, crushed Mediterranean fig leaves, cold-pressed bergamot, and sun-bleached coastal driftwood.
              </p>
            </div>

            <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-teal-800/10 dark:border-teal-300/10">
              <span className="text-[10px] sm:text-xs font-mono-micro uppercase tracking-wider text-neutral-500 block mb-2">
                PRIMARY NOTES
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 group-hover:translate-y-[-2px] transition-transform">
                {['Calabrian Bergamot', 'Aegean Sea Salt', 'Green Fig Leaf', 'Neroli Petals', 'White Cedar'].map(
                  (note) => (
                    <span
                      key={note}
                      className="glass-pill px-2.5 sm:px-3 py-1 text-xs text-teal-950 dark:text-teal-200 bg-white/60 dark:bg-teal-950/40 font-medium"
                    >
                      {note}
                    </span>
                  )
                )}
              </div>
              <Link
                href="/fresh"
                className="inline-flex items-center gap-1.5 mt-4 sm:mt-6 text-xs sm:text-sm font-mono-micro uppercase tracking-wider text-teal-900 dark:text-teal-300 font-bold hover:underline"
              >
                <span>Shop Fresh Parfums</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Floral */}
          <div className="liquid-glass-card rounded-[24px] sm:rounded-[32px] p-5 xs:p-6 sm:p-8 glow-floral relative group min-h-[280px] sm:min-h-[380px] flex flex-col justify-between border border-rose-200/40 dark:border-rose-500/20">
            <div>
              <Link href="/floral" className="inline-block text-xs font-mono-micro uppercase text-rose-800 dark:text-rose-300 tracking-widest mb-1.5 sm:mb-2 hover:underline">
                FAMILY 02
              </Link>
              <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl text-[#1F1A24] dark:text-white mb-1.5 sm:mb-2">
                <Link href="/floral" className="hover:opacity-80 transition-opacity">
                  Floral
                </Link>
              </h3>
              <p className="text-base xs:text-lg italic text-[#774A52] dark:text-[#E2B7BF] font-serif">
                &ldquo;Soft. Juicy. In bloom.&rdquo;
              </p>
              <p className="text-xs xs:text-sm text-[#6F4E55] dark:text-[#C5A5AC] mt-2.5 sm:mt-3 leading-relaxed">
                White peony steeped in cold rainwater, nocturnal orchid petals, dewy May rose, and intoxicating pink peppercorn.
              </p>
            </div>

            <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-rose-800/10 dark:border-rose-300/10">
              <span className="text-[10px] sm:text-xs font-mono-micro uppercase tracking-wider text-neutral-500 block mb-2">
                PRIMARY NOTES
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 group-hover:translate-y-[-2px] transition-transform">
                {['Damask Rose', 'White Peony', 'Jasmine Sambac', 'Pink Pepper', 'Cashmere Musk'].map(
                  (note) => (
                    <span
                      key={note}
                      className="glass-pill px-2.5 sm:px-3 py-1 text-xs text-rose-950 dark:text-rose-200 bg-white/60 dark:bg-rose-950/40 font-medium"
                    >
                      {note}
                    </span>
                  )
                )}
              </div>
              <Link
                href="/floral"
                className="inline-flex items-center gap-1.5 mt-4 sm:mt-6 text-xs sm:text-sm font-mono-micro uppercase tracking-wider text-rose-900 dark:text-rose-300 font-bold hover:underline"
              >
                <span>Shop Floral Parfums</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Woody */}
          <div className="liquid-glass-card rounded-[24px] sm:rounded-[32px] p-5 xs:p-6 sm:p-8 glow-woody relative group min-h-[280px] sm:min-h-[380px] flex flex-col justify-between border border-amber-200/40 dark:border-amber-500/20">
            <div>
              <Link href="/woody" className="inline-block text-xs font-mono-micro uppercase text-amber-800 dark:text-amber-300 tracking-widest mb-1.5 sm:mb-2 hover:underline">
                FAMILY 03
              </Link>
              <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl text-[#1F1A24] dark:text-white mb-1.5 sm:mb-2">
                <Link href="/woody" className="hover:opacity-80 transition-opacity">
                  Woody
                </Link>
              </h3>
              <p className="text-base xs:text-lg italic text-[#6E5536] dark:text-[#E2C9A6] font-serif">
                &ldquo;Warm. Deep. Magnetic.&rdquo;
              </p>
              <p className="text-xs xs:text-sm text-[#63513B] dark:text-[#C5B39A] mt-2.5 sm:mt-3 leading-relaxed">
                Smoldering Baltic amber crystals, ancient Japanese cedar shavings, dark rum, and bourbon vanilla pod.
              </p>
            </div>

            <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-800/10 dark:border-amber-300/10">
              <span className="text-[10px] sm:text-xs font-mono-micro uppercase tracking-wider text-neutral-500 block mb-2">
                PRIMARY NOTES
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 group-hover:translate-y-[-2px] transition-transform">
                {['Baltic Amber Resin', 'Atlas Cedar', 'Bourbon Vanilla', 'Smoked Birch', 'Cardamom Pod'].map(
                  (note) => (
                    <span
                      key={note}
                      className="glass-pill px-2.5 sm:px-3 py-1 text-xs text-amber-950 dark:text-amber-200 bg-white/60 dark:bg-amber-950/40 font-medium"
                    >
                      {note}
                    </span>
                  )
                )}
              </div>
              <Link
                href="/woody"
                className="inline-flex items-center gap-1.5 mt-4 sm:mt-6 text-xs sm:text-sm font-mono-micro uppercase tracking-wider text-amber-900 dark:text-amber-300 font-bold hover:underline"
              >
                <span>Shop Woody Parfums</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          D. SIGNATURE BESTSELLERS (SHOP SECTION)
          ──────────────────────────────────────────────────────── */}
      <section id="shop" className="px-3.5 xs:px-4 sm:px-6 max-w-7xl mx-auto space-y-4 sm:space-y-8 scroll-mt-28 sm:scroll-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-[#1F1A24] dark:text-[#F7F3EE]">
              Signature Bestsellers
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6475] dark:text-[#A79EB2] mt-0.5 sm:mt-1">
              Eight invented formulas, hand-poured in numbered small batches.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-[11px] sm:text-xs font-mono-micro uppercase tracking-wider text-[#1F1A24] dark:text-white underline underline-offset-8 decoration-black/20 hover:decoration-black flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View Full Wardrobe (All 8)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsive 2-Column Mobile Grid / 4-Column Desktop Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-6 pt-2 items-stretch">
          {productsData.map((prod) => (
            <ProductCard key={prod.id} product={prod as any} />
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          E. SCENT QUIZ TEASER (INTERACTIVE DISCOVERY BREAK)
          ──────────────────────────────────────────────────────── */}
      <section className="px-3.5 xs:px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="liquid-glass rounded-[24px] sm:rounded-[32px] p-5 xs:p-6 sm:p-10 bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8 relative overflow-hidden">
          {/* Accent glow orb */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#CFC3F0]/25 to-[#F2C9D0]/25 blur-2xl pointer-events-none" />

          <div className="space-y-2 sm:space-y-3 z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-micro uppercase text-purple-700 dark:text-purple-300 font-medium">
              <Compass className="w-3.5 h-3.5" />
              <span>THE OLFACTORY COMPASS</span>
            </div>
            <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl text-[#1F1A24] dark:text-[#F7F3EE]">
              Not sure where to start? Answer 4 quick questions.
            </h3>
            <p className="text-xs xs:text-sm sm:text-base text-[#6B6475] dark:text-[#A79EB2] leading-relaxed">
              We map your sensory intuition against raw natural isolates, climate habits, and cherished memories to calculate your exact 98% match.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-2 pt-0.5 sm:pt-1">
              <span className="text-xs font-mono-micro text-neutral-500 uppercase tracking-wider">
                Takes 90 seconds
              </span>
            </div>
          </div>

          <div className="z-10 shrink-0 w-full md:w-auto">
            <Link
              href="/quiz"
              className="glass-btn-solid px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-mono-micro uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-transform w-full md:w-auto text-center"
            >
              <span>Take the Scent Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          F. SHOP BY PERSON (BROUGHT DOWN & PERFECTLY ALIGNED)
          ──────────────────────────────────────────────────────── */}
      <section id="personas" className="px-3.5 xs:px-4 sm:px-6 max-w-7xl mx-auto space-y-4 sm:space-y-8 scroll-mt-28 sm:scroll-mt-32">
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-[#1F1A24] dark:text-[#F7F3EE]">
            Shop by person.
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-[#6B6475] dark:text-[#A79EB2]">
            Fragrance knows no gender, but these silhouettes celebrate distinct personal moods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-0.5 sm:pt-2">
          {/* For Him */}
          <Link
            href="/for-him"
            className="group relative rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[290px] xs:min-h-[320px] sm:min-h-[400px] liquid-glass border border-white/60 dark:border-white/10 hover:border-amber-300/80 dark:hover:border-amber-400/80 flex flex-col justify-end p-5 xs:p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(217,119,6,0.32)]"
          >
            {/* Background Image with Zoom & Luminance */}
            <Image
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80"
              alt="Cedar, cypress and smoked wood flacon for him"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:brightness-105"
            />
            {/* Base Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-500" />

            {/* Ambient Persona Glow Wash on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/70 via-amber-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Glass Sheen Streak on Hover */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col justify-end h-full text-white space-y-2 sm:space-y-3 transform transition-transform duration-500 group-hover:-translate-y-1">
              <div>
                <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono-micro uppercase tracking-widest text-[#E8D3A8] bg-black/45 backdrop-blur-md border border-white/15 transition-all duration-300 group-hover:border-amber-300/40 group-hover:bg-amber-950/50">
                  SMOKED CEDAR
                </span>
              </div>
              <h3 className="font-display text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-light text-white transition-colors duration-300">
                For Him
              </h3>
              <p className="text-xs xs:text-sm text-neutral-300 group-hover:text-neutral-100 leading-relaxed transition-colors duration-300">
                Quiet authority, tactile dry woods, charred resin, and crisp cold mountain pine.
              </p>
              <div className="pt-0.5 sm:pt-2">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono-micro uppercase tracking-wider text-white bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:bg-[#E8D3A8] group-hover:text-[#1F1A24] group-hover:border-[#E8D3A8] group-hover:shadow-[0_4px_16px_rgba(232,211,168,0.4)]">
                  <span>View 3 Blends</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>

          {/* For Her */}
          <Link
            href="/for-her"
            className="group relative rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[290px] xs:min-h-[320px] sm:min-h-[400px] liquid-glass border border-white/60 dark:border-white/10 hover:border-rose-300/80 dark:hover:border-rose-400/80 flex flex-col justify-end p-5 xs:p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(244,63,94,0.32)]"
          >
            {/* Background Image with Zoom & Luminance */}
            <Image
              src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1000&q=80"
              alt="Velvet peony and dewy rose petals for her"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:brightness-105"
            />
            {/* Base Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-500" />

            {/* Ambient Persona Glow Wash on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/70 via-pink-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Glass Sheen Streak on Hover */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col justify-end h-full text-white space-y-2 sm:space-y-3 transform transition-transform duration-500 group-hover:-translate-y-1">
              <div>
                <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono-micro uppercase tracking-widest text-[#F2C9D0] bg-black/45 backdrop-blur-md border border-white/15 transition-all duration-300 group-hover:border-rose-300/40 group-hover:bg-rose-950/50">
                  WHITE PEONY
                </span>
              </div>
              <h3 className="font-display text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-light text-white transition-colors duration-300">
                For Her
              </h3>
              <p className="text-xs xs:text-sm text-neutral-300 group-hover:text-neutral-100 leading-relaxed transition-colors duration-300">
                Juicy blossoms steeped in morning rain, spiced dark plum, and comforting skin musks.
              </p>
              <div className="pt-0.5 sm:pt-2">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono-micro uppercase tracking-wider text-white bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:bg-[#F2C9D0] group-hover:text-[#1F1A24] group-hover:border-[#F2C9D0] group-hover:shadow-[0_4px_16px_rgba(242,201,208,0.4)]">
                  <span>View 4 Blends</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>

          {/* For Everyone (Unisex) */}
          <Link
            href="/unisex"
            className="group relative rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[290px] xs:min-h-[320px] sm:min-h-[400px] liquid-glass border border-white/60 dark:border-white/10 hover:border-teal-300/80 dark:hover:border-teal-400/80 flex flex-col justify-end p-5 xs:p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(20,184,166,0.32)]"
          >
            {/* Background Image with Zoom & Luminance */}
            <Image
              src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80"
              alt="Aegean sea salt and coastal fig flacon for everyone"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:brightness-105"
            />
            {/* Base Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-500" />

            {/* Ambient Persona Glow Wash on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-950/70 via-emerald-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Glass Sheen Streak on Hover */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col justify-end h-full text-white space-y-2 sm:space-y-3 transform transition-transform duration-500 group-hover:-translate-y-1">
              <div>
                <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono-micro uppercase tracking-widest text-[#CFE0D4] bg-black/45 backdrop-blur-md border border-white/15 transition-all duration-300 group-hover:border-teal-300/40 group-hover:bg-teal-950/50">
                  COASTAL SALT
                </span>
              </div>
              <h3 className="font-display text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-light text-white transition-colors duration-300">
                For Everyone
              </h3>
              <p className="text-xs xs:text-sm text-neutral-300 group-hover:text-neutral-100 leading-relaxed transition-colors duration-300">
                Pure olfactory geometry. Crystalline salt, green botanicals, and magnetic skin aura.
              </p>
              <div className="pt-0.5 sm:pt-2">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono-micro uppercase tracking-wider text-white bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:bg-[#CFE0D4] group-hover:text-[#1F1A24] group-hover:border-[#CFE0D4] group-hover:shadow-[0_4px_16px_rgba(207,224,212,0.4)]">
                  <span>View All 8 Unisex</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          H. OUR CRAFT ETHOS (ABOUT SECTION)
          ──────────────────────────────────────────────────────── */}
      <section id="about" className="px-3.5 xs:px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-28 sm:scroll-mt-32">
        <div className="liquid-glass rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
            {/* Left: Botanical Distillation Photo */}
            <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-full min-h-[200px] xs:min-h-[240px] sm:min-h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80"
                alt="Natural botanical distillation in soft morning studio light"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            </div>

            {/* Right: Large Pull-Quote in Serif Italic & Story Copy */}
            <div className="lg:col-span-6 p-5 xs:p-6 sm:p-8 lg:p-12 space-y-3 sm:space-y-6">
              <blockquote className="font-display text-lg xs:text-xl sm:text-2xl lg:text-3xl italic text-[#1F1A24] dark:text-[#F7F3EE] leading-snug">
                &ldquo;A fragrance should never announce you before you enter the room, but it should linger like an intimate whisper long after you have gone.&rdquo;
              </blockquote>

              <div className="space-y-2.5 sm:space-y-3 text-xs xs:text-sm text-[#524B5D] dark:text-[#B6ADC3] leading-relaxed">
                <p>
                  Most commercial perfumes dilute their oils to 10–12%, relying on harsh synthetic solvents that flash off within two hours in tropical humidity.
                </p>
                <p>
                  At {brandName}, our master blenders formulate every parfum at a generous 28% Extrait de Parfum concentration in small batches of 300 bottles. We combine rare natural botanical isolates with skin-adaptive fixatives to produce an unbroken 12-hour aura that survives hot Indian summers and monsoon downpours alike.
                </p>
              </div>

              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono-micro text-[#1F1A24] dark:text-white">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" />
                  <span>28% Extrait Concentration</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                  <span>Clean & Vegan Formula</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          I. THE OLFACTORY JOURNAL (JOURNAL SECTION)
          ──────────────────────────────────────────────────────── */}
      <section id="journal" className="px-3.5 xs:px-4 sm:px-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 scroll-mt-28 sm:scroll-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-[#1F1A24] dark:text-[#F7F3EE]">
              The Olfactory Journal
            </h2>
            <p className="text-xs xs:text-sm sm:text-base text-[#6B6475] dark:text-[#A79EB2] mt-0.5 sm:mt-1">
              Reflections on memory, raw naturals, and the architecture of scent.
            </p>
          </div>

          <div className="glass-pill px-3 py-1 text-xs font-mono-micro uppercase tracking-wider text-[#6B6475] dark:text-[#A79EB2] self-start sm:self-auto">
            4 Curated Editions
          </div>
        </div>

        {/* 2x2 Grid with Interactive Essay Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
          {journalData.map((article) => (
            <div
              key={article.id}
              onClick={() => setReadingArticle(article)}
              className="liquid-glass-card rounded-[20px] sm:rounded-[22px] p-4 xs:p-5 sm:p-5 bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 group flex flex-col justify-between hover:bg-white/70 dark:hover:bg-white/[0.08] transition-all cursor-pointer hover:shadow-lg active:scale-[0.99]"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-white/20">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 glass-pill px-2.5 py-0.5 text-[10px] font-mono-micro text-[#1F1A24] dark:text-white bg-white/80 dark:bg-black/60">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono-micro text-neutral-500">
                  <span>{article.date}</span>
                  <span className="opacity-40">/</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display font-light text-lg sm:text-xl lg:text-2xl text-[#1F1A24] dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors leading-tight">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B6475] dark:text-[#A79EB2] line-clamp-2 leading-relaxed">
                  {article.subtitle}
                </p>
              </div>

              <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-mono-micro uppercase tracking-wider text-[#1F1A24] dark:text-white">
                <span className="text-[10px] sm:text-[11px] text-neutral-400">By {article.author}</span>
                <span className="font-bold underline underline-offset-4 group-hover:translate-x-1 transition-transform text-xs text-[#1F1A24] dark:text-[#E8D3A8]">
                  Read Essay →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inline Liquid-Glass Journal Article Reader Modal */}
      {readingArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setReadingArticle(null)}
        >
          <div
            className="liquid-glass rounded-[32px] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 pb-safe bg-white/95 dark:bg-[#1A1424]/95 border border-white/60 dark:border-white/15 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 relative mobile-touch-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="glass-pill px-3 py-1 text-xs font-mono-micro text-purple-700 dark:text-purple-300">
                  {readingArticle.category}
                </span>
                <span className="text-xs font-mono-micro text-neutral-400">
                  {readingArticle.readTime}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl text-[#1F1A24] dark:text-[#F7F3EE] leading-tight">
                {readingArticle.title}
              </h2>

              <p className="font-serif italic text-base text-[#6B6475] dark:text-[#C5BED0]">
                {readingArticle.subtitle}
              </p>

              <div className="flex items-center gap-3 text-xs font-mono-micro text-neutral-500 pt-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span>By {readingArticle.author}</span>
                <span className="opacity-40">•</span>
                <span>{readingArticle.date}</span>
              </div>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-md">
              <Image
                src={readingArticle.image}
                alt={readingArticle.title}
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className="object-cover"
              />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#4A4254] dark:text-[#D5CEDB] leading-relaxed font-light">
              {readingArticle.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center text-xs font-mono-micro">
              <span className="text-neutral-400">AURA Parfums Editorial</span>
              <button
                onClick={() => setReadingArticle(null)}
                className="glass-btn-solid px-5 py-2 uppercase tracking-wider"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
