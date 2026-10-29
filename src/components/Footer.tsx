'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import {
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Mail,
} from 'lucide-react';

export default function Footer() {
  const { brandName } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative pt-12 sm:pt-20 pb-10 sm:pb-12 overflow-hidden border-t border-black/5 dark:border-white/10 z-10">
      {/* Giant Faded Brand Wordmark in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[15vw] font-display uppercase tracking-widest text-black/[0.025] dark:text-white/[0.03] leading-none whitespace-nowrap z-0">
        {brandName}
      </div>

      <div className="max-w-6xl mx-auto px-3.5 xs:px-4 sm:px-6 relative z-10">
        {/* Trust Row: 3 Glass Icon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-16">
          <div className="liquid-glass rounded-[20px] sm:rounded-[24px] p-4 xs:p-5 sm:p-6 flex items-center gap-3.5 sm:gap-4 bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 hover:-translate-y-1 hover:border-[#C6A67A]/60 dark:hover:border-white/25 hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-pill flex items-center justify-center shrink-0 text-[#1F1A24] dark:text-white">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.4]" />
            </div>
            <div>
              <h4 className="font-display text-base sm:text-lg text-[#1F1A24] dark:text-white">
                Free Express Delivery
              </h4>
              <p className="text-xs text-[#6B6475] dark:text-[#A79EB2] mt-0.5">
                Complimentary insured courier on all parfums over ₹599.
              </p>
            </div>
          </div>

          <div className="liquid-glass rounded-[20px] sm:rounded-[24px] p-4 xs:p-5 sm:p-6 flex items-center gap-3.5 sm:gap-4 bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 hover:-translate-y-1 hover:border-[#C6A67A]/60 dark:hover:border-white/25 hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-pill flex items-center justify-center shrink-0 text-[#1F1A24] dark:text-white">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.4]" />
            </div>
            <div>
              <h4 className="font-display text-base sm:text-lg text-[#1F1A24] dark:text-white">
                Sample-First Guarantee
              </h4>
              <p className="text-xs text-[#6B6475] dark:text-[#A79EB2] mt-0.5">
                Test the included 2ml vial before unsealing the full bottle.
              </p>
            </div>
          </div>

          <div className="liquid-glass rounded-[20px] sm:rounded-[24px] p-4 xs:p-5 sm:p-6 flex items-center gap-3.5 sm:gap-4 bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 hover:-translate-y-1 hover:border-[#C6A67A]/60 dark:hover:border-white/25 hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-pill flex items-center justify-center shrink-0 text-[#1F1A24] dark:text-white">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.4]" />
            </div>
            <div>
              <h4 className="font-display text-base sm:text-lg text-[#1F1A24] dark:text-white">
                Artisanal Small-Batch
              </h4>
              <p className="text-xs text-[#6B6475] dark:text-[#A79EB2] mt-0.5">
                Hand-poured Extrait concentration with 28% noble perfume oils.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter & Main Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-black/5 dark:border-white/10">
          {/* Newsletter Glass Box (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl uppercase tracking-wider text-[#1F1A24] dark:text-white">
                {brandName}
              </span>
              <span className="text-[10px] font-mono-micro tracking-widest text-[#8A8195]">
                PARFUMS
              </span>
            </div>
            <p className="text-xs text-[#6B6475] dark:text-[#A79EB2] max-w-sm leading-relaxed">
              We compose long-wear extraits blended in small batches, housed in hand-finished liquid glass. Sign up for early access to private seasonal drops.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="relative max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-28 py-3 text-xs rounded-full bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/15 outline-none placeholder:text-neutral-400 font-mono-micro text-[#1F1A24] dark:text-white backdrop-blur-md shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 glass-btn-solid px-4 text-[11px] font-mono-micro uppercase tracking-wider flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {subscribed && (
                <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-mono-micro flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>You have been added to the private salon list.</span>
                </div>
              )}
            </form>
          </div>

          {/* Links Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Fragrances */}
            <div>
              <div className="font-mono-micro uppercase text-[#887F93] tracking-widest mb-4">
                Wardrobe
              </div>
              <ul className="space-y-2.5 text-[#544C5E] dark:text-[#C5BED0]">
                <li>
                  <Link href="/shop" className="hover:text-black dark:hover:text-white transition-colors">
                    All Fragrances
                  </Link>
                </li>
                <li>
                  <Link href="/#families" className="hover:text-black dark:hover:text-white transition-colors">
                    Scent Families (Fresh · Floral · Woody)
                  </Link>
                </li>
                <li>
                  <Link href="/#personas" className="hover:text-black dark:hover:text-white transition-colors">
                    Curated Personas (Him · Her · Everyone)
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="hover:text-black dark:hover:text-white transition-colors">
                    Find My Scent
                  </Link>
                </li>
              </ul>
            </div>

            {/* Maison & Stories */}
            <div>
              <div className="font-mono-micro uppercase text-[#887F93] tracking-widest mb-4">
                Maison
              </div>
              <ul className="space-y-2.5 text-[#544C5E] dark:text-[#C5BED0]">
                <li>
                  <Link href="/#about" className="hover:text-black dark:hover:text-white transition-colors">
                    Our Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="hover:text-black dark:hover:text-white transition-colors">
                    Scent Finder Quiz
                  </Link>
                </li>
                <li>
                  <Link href="/#journal" className="hover:text-black dark:hover:text-white transition-colors">
                    The Olfactory Journal
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
                    Bespoke Concierge
                  </Link>
                </li>
              </ul>
            </div>

            {/* Client Care */}
            <div className="col-span-2 sm:col-span-1 pt-4 sm:pt-0 border-t border-black/5 dark:border-white/5 sm:border-none">
              <div className="font-mono-micro uppercase text-[#887F93] tracking-widest mb-4">
                Care & Legal
              </div>
              <ul className="space-y-2.5 text-[#544C5E] dark:text-[#C5BED0]">
                <li>
                  <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/contact#faq" className="hover:text-black dark:hover:text-white transition-colors">
                    Exchange Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
                    Corporate Gifting
                  </Link>
                </li>
                <li>
                  <span className="text-neutral-400">Privacy & Terms</span>
                </li>
                <li>
                  <span className="text-neutral-400">Parfum Recycling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-micro text-[#887F93] text-center sm:text-left">
          <div>
            © 2026 {brandName} Parfums. All rights reserved. Liquid Glass™ design system.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <span>Mumbai, Paris, Kyoto, London</span>
            <span>✦</span>
            <span>All-day 28% Extrait</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
