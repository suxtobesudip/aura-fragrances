'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const {
    brandName,
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
    amountToFreeShipping,
    appliedPromo,
    applyPromoCode,
    discountAmount,
    finalTotal,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    'Velvet Peony 2ml',
    'Cedar Hour 2ml',
  ]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Lock body scroll on mobile touch screens when cart drawer is open
  React.useEffect(() => {
    if (isCartOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const sampleOptions = [
    'Velvet Peony 2ml',
    'Smoked Amber 2ml',
    'Salt & Fig 2ml',
    'Midnight Orchid 2ml',
    'Citrus Haze 2ml',
    'Cedar Hour 2ml',
  ];

  const toggleSample = (sample: string) => {
    if (selectedSamples.includes(sample)) {
      setSelectedSamples(selectedSamples.filter((s) => s !== sample));
    } else {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, sample]);
      }
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoError(false);
      setPromoInput('');
    } else {
      setPromoError(true);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsOrderPlaced(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F2C9D0', '#CFC3F0', '#E8D3A8', '#CFE0D4'],
        });
      } catch {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Glass Slide Drawer */}
      <div className="relative w-full max-w-md h-full liquid-glass bg-white/95 dark:bg-[#181222]/95 border-l border-white/50 dark:border-white/10 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 mobile-touch-scroll">
        {/* Drawer Header */}
        <div className="p-4 xs:p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1F1A24] dark:text-white" />
            <h2 className="font-display text-xl xs:text-2xl text-[#1F1A24] dark:text-white">
              Your Wardrobe
            </h2>
            <span className="text-xs font-mono-micro px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 transition-colors touch-manipulation cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-6 py-4 bg-white/40 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-medium text-[#1F1A24] dark:text-neutral-200">
              {amountToFreeShipping === 0 ? (
                <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Free express shipping unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="font-mono-micro">₹{amountToFreeShipping}</strong> more for free express delivery
                </span>
              )}
            </span>
            <span className="font-mono-micro text-[11px] text-neutral-500">
              Threshold: ₹{freeShippingThreshold}
            </span>
          </div>
          <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#CFC3F0] via-[#E8D3A8] to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Order confirmation state */}
        {isOrderPlaced ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center mb-4 text-emerald-600">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-display text-3xl mb-2 text-[#1F1A24] dark:text-white">
              Anointing in motion.
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs mb-6">
              Thank you for commissioning your {brandName} fragrances. Your artisanal batch is being prepared, bottled, and engraved with utmost care.
            </p>
            <div className="glass-pill px-4 py-2 text-xs font-mono-micro text-neutral-500 mb-6">
              ORDER REF: #AU-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={() => {
                setIsOrderPlaced(false);
                setIsCartOpen(false);
              }}
              className="glass-btn-solid px-6 py-2.5 text-xs font-medium uppercase tracking-wider font-mono-micro"
            >
              Continue Exploring
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 flex items-center justify-center mb-4 text-neutral-400">
              <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
            </div>
            <h3 className="font-display text-2xl mb-1 text-[#1F1A24] dark:text-white">
              Your scent tray is quiet.
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mb-6">
              Discover small-batch extracts, city compositions, and personal engraved parfums.
            </p>
            <Link
              href="/shop"
              onClick={() => setIsCartOpen(false)}
              className="glass-btn-solid px-6 py-2.5 text-xs font-medium uppercase tracking-wider font-mono-micro"
            >
              Explore Fragrances →
            </Link>
          </div>
        ) : (
          /* Cart Items List */
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="liquid-glass rounded-2xl p-3.5 bg-white/60 dark:bg-white/5 border border-white/50 dark:border-white/10 flex gap-4 group"
              >
                {/* Bottle Image */}
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                  <Image
                    src={item.product.images.primary}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-display text-lg text-[#1F1A24] dark:text-white leading-tight">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-400 hover:text-rose-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono-micro text-neutral-500 mt-0.5">
                      {item.size} / {item.product.family}
                    </div>

                    {item.engravedText && (
                      <div className="mt-1.5 px-2.5 py-1 rounded-md bg-[#E8D3A8]/20 dark:bg-[#E8D3A8]/10 border border-[#E8D3A8]/40 text-[10px] font-mono-micro text-[#8A6A32] dark:text-[#E8D3A8] inline-flex items-center gap-1.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>
                          Engraved: &quot;<strong>{item.engravedText}</strong>&quot; ({item.engravedFont})
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 border border-black/10 dark:border-white/10 rounded-full px-2 py-0.5 bg-white/40 dark:bg-white/5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="text-neutral-500 hover:text-black dark:hover:text-white p-1 touch-manipulation min-w-[28px] min-h-[28px] flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono-micro font-semibold px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="text-neutral-500 hover:text-black dark:hover:text-white p-1 touch-manipulation min-w-[28px] min-h-[28px] flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-mono-micro font-semibold text-sm text-[#1F1A24] dark:text-white">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Complimentary Discovery Vials */}
            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono-micro uppercase text-[#887F93] tracking-wider">
                  Complimentary Samples (Pick 2)
                </span>
                <span className="text-[11px] font-mono-micro text-neutral-500">
                  {selectedSamples.length}/2 selected
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {sampleOptions.map((sample) => {
                  const isChecked = selectedSamples.includes(sample);
                  return (
                    <button
                      key={sample}
                      onClick={() => toggleSample(sample)}
                      className={`text-left p-2 rounded-xl border text-[11px] transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#CFC3F0] bg-[#CFC3F0]/15 text-[#1F1A24] dark:text-white font-medium'
                          : 'border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/5 text-neutral-500 hover:border-black/20'
                      }`}
                    >
                      <span className="truncate">{sample}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#8872B8] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="pt-4 border-t border-black/5 dark:border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. FESTIVE15)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none uppercase font-mono-micro"
                />
                <button
                  type="submit"
                  className="glass-btn-solid px-4 py-2 text-xs uppercase tracking-wider font-mono-micro"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono-micro flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Promo {appliedPromo} applied (15% off)
                </div>
              )}
              {promoError && (
                <div className="mt-1.5 text-[11px] text-rose-500 font-mono-micro">
                  Invalid code. Try FESTIVE15 or AURA15.
                </div>
              )}
            </form>
          </div>
        )}

        {/* Drawer Footer Summary & Checkout */}
        {!isOrderPlaced && cart.length > 0 && (
          <div className="p-4 xs:p-6 pb-safe border-t border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#150F1D]/80 backdrop-blur-xl">
            <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-micro font-medium text-[#1F1A24] dark:text-white">
                  ₹{subtotal}
                </span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Festive 15% Savings</span>
                  <span className="font-mono-micro">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Insured Shipping</span>
                <span className="font-mono-micro font-medium text-[#1F1A24] dark:text-white">
                  {amountToFreeShipping === 0 ? 'FREE' : '₹120'}
                </span>
              </div>
              <div className="pt-2 border-t border-black/5 dark:border-white/10 flex justify-between text-base font-semibold text-[#1F1A24] dark:text-white">
                <span className="font-display">Total</span>
                <span className="font-mono-micro">
                  ₹{finalTotal + (amountToFreeShipping === 0 ? 0 : 120)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full glass-btn-solid py-3.5 xs:py-4 flex items-center justify-center gap-2 font-mono-micro text-xs uppercase tracking-wider group cursor-pointer active:scale-95 transition-all touch-manipulation min-h-[48px]"
            >
              {isCheckingOut ? (
                <span>Securing Your Order...</span>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-neutral-500 font-mono-micro">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Insured Delivery
              </span>
              <span className="opacity-40">/</span>
              <span>Easy 14-Day Exchanges</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
