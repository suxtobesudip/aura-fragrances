'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import productsData from '@/data/products.json';
import {
  ShoppingBag,
  Heart,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Compass,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    brandName,
    cartCount,
    setIsCartOpen,
    wishlist,
    isDarkMode,
    toggleDarkMode,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close search on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Smoothly scroll section into the exact vertical center of the screen
  const scrollToSectionMiddle = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const navbarHeight = 85;
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - navbarHeight;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let targetY;
    if (rect.height < availableHeight) {
      // Content fits in viewport: vertically center in available space below navbar
      const remainingSpace = availableHeight - rect.height;
      targetY = rect.top + scrollTop - navbarHeight - remainingSpace / 2;
    } else {
      // Content is taller than viewport: position comfortably below navbar so heading & cards are centered
      targetY = rect.top + scrollTop - navbarHeight - 20;
    }

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth',
    });
  };

  // Intercept anchor clicks on the same page
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('/#') || href.startsWith('#')) {
      const targetId = href.replace(/^\/?#/, '');
      if (pathname === '/' || pathname === '') {
        e.preventDefault();
        scrollToSectionMiddle(targetId);
        window.history.pushState(null, '', `/#${targetId}`);
      }
    }
  };

  // Scroll to hash target on initial load or route transition to homepage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkAndScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && (pathname === '/' || pathname === '')) {
        setTimeout(() => {
          scrollToSectionMiddle(hash);
        }, 120);
      }
    };

    checkAndScroll();

    const handleHashChange = () => {
      checkAndScroll();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pathname]);

  // Live instant matching products for search modal
  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return productsData
      .filter((p) => {
        const inName = p.name.toLowerCase().includes(q);
        const inFamily = p.family.toLowerCase().includes(q);
        const inGender = p.gender.toLowerCase().includes(q);
        const inTagline = p.tagline?.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inMood = p.moodLine?.toLowerCase().includes(q);
        const inNotes = [
          ...p.notes.top,
          ...p.notes.heart,
          ...p.notes.base,
        ].some((n) => n.toLowerCase().includes(q));
        return inName || inFamily || inGender || inTagline || inDesc || inMood || inNotes;
      })
      .slice(0, 4);
  }, [searchQuery]);

  // Handle scroll shrinking effect (rAF throttled for 120Hz/60Hz mobile smoothness)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 24;
          setIsScrolled((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsShopMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Lock body scroll on mobile when drawer or search modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  const navLinks = [
    { name: 'Shop', href: '/shop', hasMega: true },
    { name: 'Scent Families', href: '/#families' },
    { name: 'Personas', href: '/#personas' },
    { name: 'About', href: '/#about' },
    { name: 'Journal', href: '/#journal' },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 flex justify-center ${
          isScrolled ? 'top-2 sm:top-3' : 'top-3 sm:top-5'
        }`}
      >
        <div
          className={`liquid-glass rounded-full w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1440px] transition-all duration-300 flex items-center justify-between border border-white/60 dark:border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_16px_40px_rgba(20,15,35,0.08)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_16px_40px_rgba(0,0,0,0.45)] ${
            isScrolled
              ? 'py-2 sm:py-2.5 px-3.5 sm:px-8 lg:px-10 bg-white/60 dark:bg-[#181122]/75'
              : 'py-2.5 sm:py-3.5 px-4 sm:px-9 lg:px-11 bg-white/45 dark:bg-[#181122]/65'
          }`}
          style={{
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group select-none"
          >
            <span className="font-brand-aura text-xl sm:text-2xl tracking-[0.24em] sm:tracking-[0.28em] uppercase font-semibold text-[#1A1420] dark:text-[#FAF7F2] transition-all duration-300 group-hover:tracking-[0.32em] leading-none">
              {brandName}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-micro tracking-[0.22em] text-[#8A8195] dark:text-[#AFA6BD] uppercase hidden sm:inline pl-2 border-l border-black/15 dark:border-white/15">
              PARFUMS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10 text-[13px] tracking-wide font-medium text-[#383141] dark:text-[#D5CEDB]">
            <div
              className="relative"
              onMouseEnter={() => setIsShopMenuOpen(true)}
              onMouseLeave={() => setIsShopMenuOpen(false)}
            >
              <Link
                href="/#shop"
                onClick={(e) => {
                  handleAnchorClick(e, '/#shop');
                  setIsShopMenuOpen(false);
                }}
                className="flex items-center gap-1 hover:text-[#8C6D42] dark:hover:text-[#E8D3A8] transition-all py-1.5 px-1 relative group font-normal text-[#383141] dark:text-[#D5CEDB]"
              >
                <span>Shop</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isShopMenuOpen ? 'rotate-180 text-[#8C6D42] dark:text-[#E8D3A8]' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-1 right-1 h-[1.5px] bg-[#A37D4E] dark:bg-[#E8D3A8] transition-transform origin-left rounded-full ${
                    isShopMenuOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>

              {/* Mega Menu Dropdown */}
              {isShopMenuOpen && (
                <div className="absolute top-full -left-20 pt-3 w-[680px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div
                    className="rounded-[32px] p-7 bg-white/94 dark:bg-[#140F1D]/95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_32px_80px_rgba(20,15,35,0.28)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_32px_80px_rgba(0,0,0,0.8)] border border-white/80 dark:border-white/20"
                    style={{
                      backdropFilter: 'blur(54px) saturate(210%)',
                      WebkitBackdropFilter: 'blur(54px) saturate(210%)',
                    }}
                  >
                    <div className="mb-4">
                      <div className="text-xs font-mono-micro uppercase text-[#736A7E] dark:text-[#B6ADC2] tracking-widest font-medium">
                        Explore By Olfactory Family
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {/* Fresh */}
                      <Link
                        href="/fresh"
                        onClick={() => setIsShopMenuOpen(false)}
                        className="group relative rounded-2xl overflow-hidden p-4 border border-black/5 dark:border-white/15 hover:border-black/15 dark:hover:border-white/35 transition-all glow-fresh bg-white/80 dark:bg-white/[0.08] hover:bg-white dark:hover:bg-white/[0.16] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        style={{
                          backdropFilter: 'blur(28px)',
                          WebkitBackdropFilter: 'blur(28px)',
                        }}
                      >
                        <div className="text-xs font-mono-micro text-teal-800 dark:text-teal-300 mb-1 font-medium">
                          CRISP
                        </div>
                        <div className="font-display text-xl text-[#1F1A24] dark:text-white mb-1 group-hover:translate-x-1 transition-transform">
                          Fresh
                        </div>
                        <div className="text-[11px] text-[#554D60] dark:text-[#C4BACF] line-clamp-2 leading-relaxed">
                          Bergamot, coastal salt & green fig leaves.
                        </div>
                      </Link>

                      {/* Floral */}
                      <Link
                        href="/floral"
                        onClick={() => setIsShopMenuOpen(false)}
                        className="group relative rounded-2xl overflow-hidden p-4 border border-black/5 dark:border-white/15 hover:border-black/15 dark:hover:border-white/35 transition-all glow-floral bg-white/80 dark:bg-white/[0.08] hover:bg-white dark:hover:bg-white/[0.16] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        style={{
                          backdropFilter: 'blur(28px)',
                          WebkitBackdropFilter: 'blur(28px)',
                        }}
                      >
                        <div className="text-xs font-mono-micro text-rose-800 dark:text-rose-300 mb-1 font-medium">
                          SOFT
                        </div>
                        <div className="font-display text-xl text-[#1F1A24] dark:text-white mb-1 group-hover:translate-x-1 transition-transform">
                          Floral
                        </div>
                        <div className="text-[11px] text-[#554D60] dark:text-[#C4BACF] line-clamp-2 leading-relaxed">
                          Dewy peony, damask rose & nocturnal orchid.
                        </div>
                      </Link>

                      {/* Woody */}
                      <Link
                        href="/woody"
                        onClick={() => setIsShopMenuOpen(false)}
                        className="group relative rounded-2xl overflow-hidden p-4 border border-black/5 dark:border-white/15 hover:border-black/15 dark:hover:border-white/35 transition-all glow-woody bg-white/80 dark:bg-white/[0.08] hover:bg-white dark:hover:bg-white/[0.16] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        style={{
                          backdropFilter: 'blur(28px)',
                          WebkitBackdropFilter: 'blur(28px)',
                        }}
                      >
                        <div className="text-xs font-mono-micro text-amber-800 dark:text-amber-300 mb-1 font-medium">
                          WARM
                        </div>
                        <div className="font-display text-xl text-[#1F1A24] dark:text-white mb-1 group-hover:translate-x-1 transition-transform">
                          Woody
                        </div>
                        <div className="text-[11px] text-[#554D60] dark:text-[#C4BACF] line-clamp-2 leading-relaxed">
                          Smoked amber resin, cedarwood & vanilla.
                        </div>
                      </Link>
                    </div>

                    <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-[10px] font-mono-micro uppercase text-[#736A7E] dark:text-[#B6ADC2] tracking-widest font-medium pr-1">
                          Personas:
                        </span>
                        <Link
                          href="/for-him"
                          onClick={() => setIsShopMenuOpen(false)}
                          className="px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#383141] dark:text-[#E2DBE8] hover:text-black dark:hover:text-white font-medium transition-all"
                        >
                          For Him
                        </Link>
                        <Link
                          href="/for-her"
                          onClick={() => setIsShopMenuOpen(false)}
                          className="px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#383141] dark:text-[#E2DBE8] hover:text-black dark:hover:text-white font-medium transition-all"
                        >
                          For Her
                        </Link>
                        <Link
                          href="/unisex"
                          onClick={() => setIsShopMenuOpen(false)}
                          className="px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#383141] dark:text-[#E2DBE8] hover:text-black dark:hover:text-white font-medium transition-all"
                        >
                          For Everyone
                        </Link>
                      </div>
                      <Link
                        href="/shop"
                        onClick={() => setIsShopMenuOpen(false)}
                        className="font-medium text-[#1F1A24] dark:text-white underline underline-offset-4 hover:opacity-80 transition-opacity pl-2"
                      >
                        View All Parfums →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#families"
              onClick={(e) => handleAnchorClick(e, '/#families')}
              className="hover:text-[#8C6D42] dark:hover:text-[#E8D3A8] transition-all py-1.5 px-1 relative group"
            >
              <span>Scent Families</span>
              <span className="absolute bottom-0 left-1 right-1 h-[1.5px] bg-[#A37D4E] dark:bg-[#E8D3A8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </Link>

            <Link
              href="/#personas"
              onClick={(e) => handleAnchorClick(e, '/#personas')}
              className="hover:text-[#8C6D42] dark:hover:text-[#E8D3A8] transition-all py-1.5 px-1 relative group"
            >
              <span>Personas</span>
              <span className="absolute bottom-0 left-1 right-1 h-[1.5px] bg-[#A37D4E] dark:bg-[#E8D3A8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </Link>

            <Link
              href="/#about"
              onClick={(e) => handleAnchorClick(e, '/#about')}
              className="hover:text-[#8C6D42] dark:hover:text-[#E8D3A8] transition-all py-1.5 px-1 relative group"
            >
              <span>About</span>
              <span className="absolute bottom-0 left-1 right-1 h-[1.5px] bg-[#A37D4E] dark:bg-[#E8D3A8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </Link>

            <Link
              href="/#journal"
              onClick={(e) => handleAnchorClick(e, '/#journal')}
              className="hover:text-[#8C6D42] dark:hover:text-[#E8D3A8] transition-all py-1.5 px-1 relative group"
            >
              <span>Journal</span>
              <span className="absolute bottom-0 left-1 right-1 h-[1.5px] bg-[#A37D4E] dark:bg-[#E8D3A8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search fragrances"
              className="p-2 sm:p-2.5 rounded-full hover:bg-white/60 dark:hover:bg-white/10 text-[#2B2433] dark:text-[#E2DBE8] transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 sm:p-2.5 rounded-full hover:bg-white/60 dark:hover:bg-white/10 text-[#2B2433] dark:text-[#E2DBE8] transition-transform active:scale-95 hidden sm:flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-[#E8D3A8]" />
              ) : (
                <Moon className="w-4 h-4 text-[#5A4F6B]" />
              )}
            </button>

            {/* Wishlist Link with counter */}
            <Link
              href="/shop?filter=wishlist"
              aria-label="View wishlist"
              className="p-2 sm:p-2.5 rounded-full hover:bg-white/60 dark:hover:bg-white/10 text-[#2B2433] dark:text-[#E2DBE8] transition-colors relative hidden sm:flex items-center justify-center"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-mono-micro flex items-center justify-center font-bold shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className="relative flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-full bg-white/70 dark:bg-white/15 border border-white/70 dark:border-white/20 hover:bg-white/95 dark:hover:bg-white/25 transition-all text-[#1F1A24] dark:text-white shadow-sm hover:shadow touch-manipulation min-h-[36px] sm:min-h-[38px]"
            >
              <ShoppingBag className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span className="text-xs font-mono-micro font-semibold">{cartCount}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 text-[#2B2433] dark:text-[#E2DBE8] lg:hidden touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xl lg:hidden flex flex-col justify-end">
          <div className="liquid-glass rounded-t-[36px] p-6 pb-safe bg-white/95 dark:bg-[#1A1424]/95 border-t border-white/40 dark:border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto mobile-touch-scroll">
            <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10 mb-6">
              <span className="font-brand-aura text-2xl uppercase tracking-[0.24em] font-semibold text-[#1A1420] dark:text-[#FAF7F2]">
                {brandName}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 text-lg font-display">
              <Link
                href="/#shop"
                onClick={(e) => {
                  handleAnchorClick(e, '/#shop');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 border-b border-black/5 dark:border-white/10 flex justify-between items-center"
              >
                <span>Shop Fragrances</span>
                <span className="text-xs font-mono-micro text-neutral-500">Bestsellers</span>
              </Link>
              <Link
                href="/#families"
                onClick={(e) => {
                  handleAnchorClick(e, '/#families');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 border-b border-black/5 dark:border-white/10 flex justify-between items-center"
              >
                <span>Scent Families</span>
                <span className="text-xs font-mono-micro text-neutral-500">Fresh · Floral · Woody</span>
              </Link>
              <Link
                href="/#personas"
                onClick={(e) => {
                  handleAnchorClick(e, '/#personas');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 border-b border-black/5 dark:border-white/10 flex justify-between items-center"
              >
                <span>Curated Personas</span>
                <span className="text-xs font-mono-micro text-neutral-500">Him · Her · Everyone</span>
              </Link>
              <Link
                href="/shop?filter=wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-black/5 dark:border-white/10 flex justify-between items-center"
              >
                <span className="flex items-center gap-2">
                  <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>Saved Wishlist</span>
                </span>
                <span className="text-xs font-mono-micro text-neutral-500">{wishlist.length} saved</span>
              </Link>
              <Link
                href="/#about"
                onClick={(e) => {
                  handleAnchorClick(e, '/#about');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 border-b border-black/5 dark:border-white/10 flex justify-between items-center"
              >
                <span>The Brand & Story</span>
              </Link>
              <Link
                href="/#journal"
                onClick={(e) => {
                  handleAnchorClick(e, '/#journal');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 border-b border-black/5 dark:border-white/10 flex justify-between items-center"
              >
                <span>The Journal</span>
                <span className="text-xs font-mono-micro text-neutral-500">Editorial</span>
              </Link>
            </nav>

            <div className="mt-8 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleDarkMode}
                  className="px-4 py-2 rounded-full glass-pill text-xs font-medium flex items-center gap-2"
                >
                  {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDarkMode ? 'Light Canvas' : 'Aubergine Night'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="glass-btn-solid px-5 py-2.5 text-xs font-medium"
              >
                Cart ({cartCount})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instant Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto mobile-touch-scroll"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="liquid-glass rounded-[28px] max-w-xl w-full p-6 sm:p-7 bg-white/95 dark:bg-[#1A1322]/95 border border-white/60 dark:border-white/15 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 gap-3">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-[#8C6D42] dark:text-[#E8D3A8]" />
                <input
                  type="text"
                  placeholder="Search notes (e.g. peony, cedar, amber, fig, woody)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-none outline-none text-[#1F1A24] dark:text-white placeholder:text-[#887F93] text-base"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                  title="Clear query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Results or Suggestions */}
            <div className="mt-4 space-y-4">
              {searchQuery.trim() ? (
                <>
                  <div className="flex items-center justify-between text-[11px] font-mono-micro text-[#887F93] uppercase tracking-wider">
                    <span>Matches ({liveSearchResults.length})</span>
                    <span className="text-[10px]">Instant Olfactory Lookup</span>
                  </div>

                  {liveSearchResults.length > 0 ? (
                    <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                      {liveSearchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/product/${prod.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent hover:border-black/10 dark:hover:border-white/15 transition-all group"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shrink-0">
                              <Image
                                src={prod.images.primary}
                                alt={prod.name}
                                fill
                                sizes="48px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-display text-base text-[#1F1A24] dark:text-white group-hover:text-[#9E7743] dark:group-hover:text-[#E8D3A8] transition-colors">
                                  {prod.name}
                                </h4>
                                <span className="text-[9px] font-mono-micro px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 uppercase tracking-wider text-[#6B6475] dark:text-[#A79EB2]">
                                  {prod.family}
                                </span>
                              </div>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                                {prod.moodLine || prod.notes.top.join(', ')}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 pl-2">
                            <span className="text-xs font-mono-micro font-bold text-[#1F1A24] dark:text-white">
                              ₹{prod.price}
                            </span>
                            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-[#1F1A24] dark:group-hover:text-white transition-all" />
                          </div>
                        </Link>
                      ))}

                      <div className="pt-2">
                        <Link
                          href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="glass-btn-solid w-full block text-center py-2.5 text-xs uppercase tracking-wider font-mono-micro"
                        >
                          View all results in Wardrobe →
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center space-y-2">
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        No olfactory matches for &ldquo;{searchQuery}&rdquo;
                      </p>
                      <p className="text-xs text-neutral-400">
                        Try searching by notes (e.g. Amber, Peony, Cedar), families, or silhouettes.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* Empty query: Popular Searches & Olfactory Family shortcuts */
                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-mono-micro uppercase text-[#887F93] tracking-wider mb-2">
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Velvet Peony', 'Smoked Amber', 'Salt & Fig', 'Vanilla', 'Woody', 'Fresh', 'Engraved Parfums'].map(
                        (term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="glass-pill px-3 py-1 text-xs text-[#4F4658] dark:text-[#D1C9DA] hover:text-black dark:hover:text-white cursor-pointer"
                          >
                            {term}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/5 dark:border-white/10">
                    <div className="text-[11px] font-mono-micro uppercase text-[#887F93] tracking-wider mb-2">
                      Explore By Family
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: 'Fresh', href: '/fresh', desc: 'Citrus & Sea Salt' },
                        { name: 'Floral', href: '/floral', desc: 'Velvet Petals' },
                        { name: 'Woody', href: '/woody', desc: 'Cedar & Charred Resin' },
                      ].map((fam) => (
                        <Link
                          key={fam.name}
                          href={fam.href}
                          onClick={() => setIsSearchOpen(false)}
                          className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-left transition-all group"
                        >
                          <div className="text-xs font-display text-[#1F1A24] dark:text-white group-hover:text-[#9E7743] dark:group-hover:text-[#E8D3A8]">
                            {fam.name}
                          </div>
                          <div className="text-[10px] text-neutral-400 line-clamp-1">
                            {fam.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          NATIVE MOBILE APP FLOATING BOTTOM TAB BAR
          ──────────────────────────────────────────────────────── */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-2.5 inset-x-3 z-40 lg:hidden pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto liquid-glass rounded-full px-3 xs:px-4 py-2 bg-white/85 dark:bg-[#161020]/90 border border-white/60 dark:border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex items-center justify-between backdrop-blur-2xl">
          {/* Home Tab */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-0.5 px-2 xs:px-3 rounded-full transition-all active:scale-90 touch-manipulation ${
              pathname === '/'
                ? 'text-[#9E6F3A] dark:text-[#E8D3A8] font-bold'
                : 'text-[#6B6475] dark:text-[#9F96AA]'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span className="text-[9px] xs:text-[10px] font-mono-micro uppercase tracking-wider">Home</span>
          </Link>

          {/* Wardrobe Tab */}
          <Link
            href="/shop"
            className={`flex flex-col items-center justify-center py-0.5 px-2 xs:px-3 rounded-full transition-all active:scale-90 touch-manipulation ${
              pathname === '/shop'
                ? 'text-[#9E6F3A] dark:text-[#E8D3A8] font-bold'
                : 'text-[#6B6475] dark:text-[#9F96AA]'
            }`}
          >
            <Compass className="w-4 h-4 mb-0.5" />
            <span className="text-[9px] xs:text-[10px] font-mono-micro uppercase tracking-wider">Wardrobe</span>
          </Link>

          {/* Quiz Tab */}
          <Link
            href="/quiz"
            className={`flex flex-col items-center justify-center py-0.5 px-2 xs:px-3 rounded-full transition-all active:scale-90 touch-manipulation ${
              pathname === '/quiz'
                ? 'text-[#9E6F3A] dark:text-[#E8D3A8] font-bold'
                : 'text-[#6B6475] dark:text-[#9F96AA]'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span className="text-[9px] xs:text-[10px] font-mono-micro uppercase tracking-wider">Quiz</span>
          </Link>

          {/* Saved Tab */}
          <Link
            href="/shop?filter=wishlist"
            className={`flex flex-col items-center justify-center py-0.5 px-2 xs:px-3 rounded-full transition-all active:scale-90 touch-manipulation relative ${
              pathname === '/shop' && typeof window !== 'undefined' && window.location.search.includes('wishlist')
                ? 'text-[#9E6F3A] dark:text-[#E8D3A8] font-bold'
                : 'text-[#6B6475] dark:text-[#9F96AA]'
            }`}
          >
            <div className="relative">
              <Heart
                className={`w-4 h-4 mb-0.5 ${
                  wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-mono-micro flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-[9px] xs:text-[10px] font-mono-micro uppercase tracking-wider">Saved</span>
          </Link>

          {/* Bag Tab */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center justify-center py-0.5 px-2 xs:px-3 rounded-full transition-all active:scale-90 touch-manipulation relative text-[#6B6475] dark:text-[#9F96AA]"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 mb-0.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2.5 px-1 min-w-[15px] h-3.5 rounded-full bg-amber-600 dark:bg-amber-500 text-white text-[8px] font-mono-micro flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[9px] xs:text-[10px] font-mono-micro uppercase tracking-wider">Bag</span>
          </button>
        </div>
      </nav>
    </>
  );
}
