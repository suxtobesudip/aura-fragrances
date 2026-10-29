'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  const items = [
    'Festive edit: engrave a name on the bottle, 15% off with code FESTIVE15',
    'Pick any 3, the cheapest is on us',
    'Free express delivery on all orders over ₹599',
    'Complimentary discovery vials with every parfum',
  ];

  return (
    <aside aria-label="Announcements and special offers" className="w-full pt-3 px-4 flex justify-center relative z-40">
      <div className="glass-pill px-5 py-2 max-w-4xl w-full flex items-center justify-between text-xs tracking-wider font-mono-micro uppercase text-[#1F1A24] dark:text-[#E8E2EC] overflow-hidden group">
        <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-white/30 dark:border-white/10 hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#A58252] dark:text-[#E8D3A8]" />
          <span className="font-semibold text-[#1F1A24] dark:text-white">EDITION 2026</span>
        </div>

        {/* Scrolling ticker track */}
        <div className="overflow-hidden whitespace-nowrap relative flex-1 mx-2">
          <div className="inline-flex animate-marquee hover:pause gap-12 text-[11px] sm:text-xs text-[#4A4353] dark:text-[#C5BED0]">
            {items.concat(items).map((text, i) => (
              <span key={i} className="inline-flex items-center gap-4">
                <span>{text}</span>
                <span className="opacity-30">/</span>
              </span>
            ))}
          </div>
        </div>

        <Link
          href="/make-it-yours"
          className="shrink-0 pl-3 text-[11px] underline underline-offset-4 decoration-black/30 dark:decoration-white/30 hover:text-black dark:hover:text-white transition-colors hidden md:block"
        >
          Engrave Now →
        </Link>
      </div>
    </aside>
  );
}
