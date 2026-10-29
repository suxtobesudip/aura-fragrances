'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import storesData from '@/data/stores.json';
import {
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Calendar,
  CheckCircle2,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StoresPage() {
  const [selectedCityId, setSelectedCityId] = useState(storesData[0].id);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-11-02');
  const [bookingTime, setBookingTime] = useState('03:00 PM');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const activeStore = storesData.find((s) => s.id === selectedCityId) || storesData[0];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingName.trim()) {
      setBookingSuccess(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F2C9D0', '#CFC3F0', '#E8D3A8', '#CFE0D4'],
        });
      } catch {}
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setBookingSuccess(false);
        setBookingName('');
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 py-4 sm:py-16 space-y-6 sm:space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
        <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl lg:text-7xl text-[#1F1A24] dark:text-[#F7F3EE]">
          Our Boutiques
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5467] dark:text-[#B6ADC2] leading-relaxed max-w-md mx-auto">
          Step off bustling streets into serene, climate-tempered parfum sanctuaries. Inhale cold vapor, hold hand-finished glass, and consult with our master olfactory advisors.
        </p>
      </div>

      {/* City Switcher Tabs */}
      <div className="flex justify-center -mx-3.5 xs:-mx-4 px-3.5 xs:px-4 overflow-x-auto no-scrollbar mobile-touch-scroll">
        <div className="glass-pill p-1 sm:p-1.5 flex items-center justify-center gap-1.5 sm:gap-2 bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-lg min-w-max">
          {storesData.map((store) => (
            <button
              key={store.id}
              onClick={() => setSelectedCityId(store.id)}
              className={`px-3.5 xs:px-6 py-1.5 xs:py-2 rounded-full text-xs font-mono-micro transition-all touch-manipulation cursor-pointer ${
                selectedCityId === store.id
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-md scale-105'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {store.city} ({store.type})
            </button>
          ))}
        </div>
      </div>

      {/* Active Store Feature Card */}
      <div className="liquid-glass rounded-[22px] sm:rounded-[36px] overflow-hidden bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[480px]">
          <Image
            src={activeStore.image}
            alt={activeStore.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
          <div className="absolute top-4 left-4 glass-pill px-3 py-1 text-xs font-mono-micro text-white bg-black/60">
            {activeStore.city.toUpperCase()}
          </div>
        </div>

        <div className="lg:col-span-5 p-5 xs:p-6 sm:p-12 space-y-4 sm:space-y-6">
          <div>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl text-[#1F1A24] dark:text-white">
              {activeStore.name}
            </h2>
          </div>

          <div className="space-y-2.5 sm:space-y-3 text-xs text-neutral-600 dark:text-neutral-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <span>{activeStore.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{activeStore.hours}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{activeStore.phone}</span>
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-black/5 dark:border-white/10 space-y-2">
            <span className="text-xs font-mono-micro uppercase text-[#887F93] block">
              Boutique Experiences & Amenities:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {activeStore.features.map((feat) => (
                <span
                  key={feat}
                  className="glass-pill px-2.5 sm:px-3 py-1 text-xs text-[#1F1A24] dark:text-white bg-white/60 dark:bg-white/10"
                >
                  ✦ {feat}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full glass-btn-solid py-3.5 text-xs font-mono-micro uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95 touch-manipulation"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Scent Consultation at {activeStore.city}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of All 4 Boutiques */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="font-display text-2xl xs:text-3xl text-[#1F1A24] dark:text-white">
          All Store Sanctuaries
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-6">
          {storesData.map((store) => (
            <div
              key={store.id}
              onClick={() => setSelectedCityId(store.id)}
              className={`liquid-glass-card rounded-[20px] sm:rounded-[28px] p-3.5 xs:p-4 sm:p-5 cursor-pointer border transition-all flex flex-col justify-between active:scale-[0.98] ${
                selectedCityId === store.id
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xl scale-[1.01]'
                  : 'bg-white/60 dark:bg-white/5 border-white/50 dark:border-white/10'
              }`}
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image src={store.image} alt={store.name} fill sizes="50vw" className="object-cover" />
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono-micro uppercase tracking-wider opacity-70">
                  {store.city}
                </div>
                <h4 className="font-display text-base xs:text-lg sm:text-2xl leading-tight truncate">{store.name}</h4>
                <p className="text-[11px] sm:text-xs opacity-80 leading-relaxed line-clamp-2">
                  {store.address}
                </p>
              </div>

              <div className="pt-3 sm:pt-4 mt-2 sm:mt-3 border-t border-black/10 dark:border-white/10 text-xs font-mono-micro underline underline-offset-2">
                Select →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Booking Modal / Native Mobile Bottom Sheet */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsBookingModalOpen(false)}
          />
          <div className="relative w-full max-w-md liquid-glass rounded-t-[28px] sm:rounded-[32px] p-6 sm:p-8 bg-white/95 dark:bg-[#1A1424]/95 border-t sm:border border-white/70 shadow-2xl z-10 space-y-5 sm:space-y-6 max-h-[90vh] overflow-y-auto mobile-touch-scroll animate-in slide-in-from-bottom sm:slide-in-from-none sm:zoom-in-95 duration-200">
            <div className="w-12 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 mx-auto mb-2 sm:hidden" />
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 hover:text-black dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-display text-3xl text-[#1F1A24] dark:text-white">
                  Consultation Reserved.
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Our {activeStore.city} scent concierge looks forward to welcoming you on {bookingDate} at {bookingTime}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono-micro uppercase text-neutral-400 block mb-1">
                    BESPOKE SCENT APPOINTMENT
                  </span>
                  <h3 className="font-display text-2xl text-[#1F1A24] dark:text-white">
                    {activeStore.name}
                  </h3>
                </div>

                <div>
                  <label className="text-xs font-mono-micro uppercase text-[#887F93] block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-full bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/15 outline-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono-micro uppercase text-[#887F93] block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-full bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/15 outline-none font-mono-micro"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono-micro uppercase text-[#887F93] block mb-1">
                      Time Slot
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-full bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/15 outline-none font-mono-micro"
                    >
                      <option>11:30 AM</option>
                      <option>02:00 PM</option>
                      <option>03:30 PM</option>
                      <option>05:00 PM</option>
                      <option>07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 font-mono-micro pt-1">
                  ✦ Includes complimentary private olfactory flight & 2 travel vials.
                </div>

                <button
                  type="submit"
                  className="w-full glass-btn-solid py-3 text-xs font-mono-micro uppercase tracking-wider"
                >
                  Confirm Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
