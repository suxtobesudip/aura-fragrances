'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore, Product } from '@/context/StoreContext';
import productsData from '@/data/products.json';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShoppingBag,
  CheckCircle2,
  Star,
  Eye,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    title: string;
    description: string;
    family: string;
    icon: string;
  }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Where does your mind wander when you seek peace?',
    subtitle: 'Close your eyes. Let your instinctive memory lead.',
    options: [
      {
        title: 'Misty Kyoto bamboo & wet slate stones',
        description: 'Cold rain, fresh cedar, crushed tea leaves and quiet temple bells.',
        family: 'Fresh',
        icon: '🎋',
      },
      {
        title: 'Sun-drenched Aegean fig cliffs',
        description: 'Sea salt crystals on skin, warm limestone, and green milky fig leaves.',
        family: 'Fresh',
        icon: '🌊',
      },
      {
        title: 'Blooming English garden at daybreak',
        description: 'Dewy white peony petals, damask rose, and sparkling pink peppercorn.',
        family: 'Floral',
        icon: '🌸',
      },
      {
        title: 'Cozy mahogany hearth with amber embers',
        description: 'Charred cedarwood, melted Baltic resin, and dark bourbon vanilla.',
        family: 'Woody',
        icon: '🔥',
      },
    ],
  },
  {
    id: 2,
    question: 'What sensory texture feels most like you?',
    subtitle: 'Think of how a fabric feels against your skin in the morning.',
    options: [
      {
        title: 'Crisp, washed organic linen',
        description: 'Transparent, breezy, sparkling clean and instantly refreshing.',
        family: 'Fresh',
        icon: '🍃',
      },
      {
        title: 'Heavy washed silk & crushed velvet',
        description: 'Sensual, intoxicating, delicate yet unforgettable.',
        family: 'Floral',
        icon: '🌺',
      },
      {
        title: 'Thick cashmere & aged leather',
        description: 'Warm, magnetic, enveloping like a protective aura.',
        family: 'Woody',
        icon: '🪵',
      },
      {
        title: 'Warm spun amber & molten sugar',
        description: 'Dark, intoxicating, boozy and unhurried.',
        family: 'Woody',
        icon: '✨',
      },
    ],
  },
  {
    id: 3,
    question: 'When will this fragrance accompany you?',
    subtitle: 'Every hour demands its own emotional frequency.',
    options: [
      {
        title: 'Morning glow & daily ritual',
        description: 'A crisp focus that clears the mind and stays with you until twilight.',
        family: 'Fresh',
        icon: '☀️',
      },
      {
        title: 'Golden hour & intimate dinners',
        description: 'Soft candlelight, shared glances, and romantic presence.',
        family: 'Floral',
        icon: '🌅',
      },
      {
        title: 'All-day versatile signature',
        description: 'Effortless elegance that shifts fluidly between boardrooms and balconies.',
        family: 'Fresh',
        icon: '⏳',
      },
      {
        title: 'Midnight allure & after-hours',
        description: 'Deep, smoky, mysterious trail that turns heads in the dark.',
        family: 'Woody',
        icon: '🌙',
      },
    ],
  },
  {
    id: 4,
    question: 'How do you want your sillage trail to speak?',
    subtitle: 'Fragrance is how you announce your invisible presence.',
    options: [
      {
        title: 'An intimate skin whisper',
        description: 'Only discovered when someone steps close to embrace you.',
        family: 'Fresh',
        icon: '🤍',
      },
      {
        title: 'Radiant & balanced breeze',
        description: 'Leaves a subtle, elegant memory as you walk past.',
        family: 'Floral',
        icon: '🕊️',
      },
      {
        title: 'Magnetic & commanding aura',
        description: 'Deep, memorable, and persists for twelve hours without fading.',
        family: 'Woody',
        icon: '👑',
      },
      {
        title: 'Electric & unconventional',
        description: 'Sparks curiosity: people ask what you are wearing everywhere you go.',
        family: 'Floral',
        icon: '⚡',
      },
    ],
  },
];

export default function ScentQuizPage() {
  const { addToCart, setQuickViewProduct } = useStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  const handleSelectOption = (family: string) => {
    const nextAnswers = [...answers, family];
    setAnswers(nextAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      setIsCalculating(true);
      setTimeout(() => {
        // Tally families
        const counts: Record<string, number> = { Fresh: 0, Floral: 0, Woody: 0 };
        nextAnswers.forEach((f) => {
          if (counts[f] !== undefined) counts[f]++;
        });

        const topFamily = Object.keys(counts).reduce((a, b) =>
          counts[a] >= counts[b] ? a : b
        );

        const candidates = productsData.filter((p) => p.family === topFamily);
        const match = candidates.length > 0 ? candidates[0] : productsData[0];
        setMatchedProduct(match as any);
        setIsCalculating(false);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F2C9D0', '#CFC3F0', '#E8D3A8', '#CFE0D4'],
          });
        } catch {}
      }, 1400);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setMatchedProduct(null);
  };

  const currentQ = quizQuestions[currentStep];

  return (
    <div className="max-w-4xl mx-auto px-3.5 xs:px-4 sm:px-6 py-4 sm:py-16 space-y-6 sm:space-y-12">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#1F1A24] dark:text-[#F7F3EE]">
          The Scent Finder Quiz
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5467] dark:text-[#B6ADC2] max-w-sm sm:max-w-lg mx-auto">
          Four instinctive questions. We map your subconscious memories to calculate your ideal fragrance counterpart.
        </p>
      </div>

      {/* Progress Dots */}
      {!matchedProduct && !isCalculating && (
        <div className="max-w-xs mx-auto space-y-1.5 sm:space-y-2">
          <div className="flex justify-between text-[10px] sm:text-[11px] font-mono-micro text-neutral-500">
            <span>QUESTION 0{currentStep + 1}</span>
            <span>0{quizQuestions.length}</span>
          </div>
          <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1F1A24] dark:bg-white rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Calculation Loading State */}
      {isCalculating && (
        <div className="liquid-glass rounded-[24px] sm:rounded-[32px] p-8 sm:p-16 text-center space-y-4 sm:space-y-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#1F1A24] dark:border-white border-t-transparent animate-spin mx-auto" />
          <h2 className="font-display text-2xl sm:text-4xl text-[#1F1A24] dark:text-white">
            Harmonizing your olfactory aura...
          </h2>
          <p className="text-xs font-mono-micro text-neutral-500">
            Mapping botanical isolates, volatile evaporation curves, and memory vectors.
          </p>
        </div>
      )}

      {/* Quiz Questions */}
      {!matchedProduct && !isCalculating && (
        <div className="liquid-glass rounded-[22px] sm:rounded-[36px] p-4 xs:p-6 sm:p-10 bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-2xl space-y-5 sm:space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-[11px] font-mono-micro uppercase text-[#887F93] tracking-widest">
              QUERY NO. 0{currentQ.id}
            </span>
            <h2 className="font-display text-xl xs:text-2xl sm:text-4xl text-[#1F1A24] dark:text-white">
              {currentQ.question}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6475] dark:text-[#A79EB2] font-serif italic">
              &ldquo;{currentQ.subtitle}&rdquo;
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt.family)}
                className="liquid-glass-card rounded-[18px] sm:rounded-[24px] p-3.5 xs:p-4 sm:p-6 text-left border border-white/60 dark:border-white/10 group cursor-pointer hover:scale-[1.01] active:scale-95 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{opt.icon}</div>
                  <h3 className="font-display text-base xs:text-lg sm:text-2xl text-[#1F1A24] dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors leading-tight">
                    {opt.title}
                  </h3>
                  <p className="text-[11px] xs:text-xs text-[#5C5467] dark:text-[#B6ADC2] leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 mt-1 sm:mt-2 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-micro text-[#887F93]">
                  <span>SELECT OPTION</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {currentStep > 0 && (
            <div className="pt-2 sm:pt-4 flex justify-between items-center text-xs font-mono-micro">
              <button
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  setAnswers(answers.slice(0, -1));
                }}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-black dark:hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous question</span>
              </button>
              <button
                onClick={handleReset}
                className="text-neutral-400 hover:text-black dark:hover:text-white"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quiz Match Results Card */}
      {matchedProduct && (
        <div className="liquid-glass rounded-[22px] sm:rounded-[36px] p-4 xs:p-6 sm:p-12 bg-white/80 dark:bg-[#1A1424]/90 border border-white/70 dark:border-white/15 shadow-2xl space-y-5 sm:space-y-8 animate-in zoom-in-95 duration-300">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 glass-pill px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono-micro text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>98% HARMONIC OLFACTORY MATCH</span>
            </div>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl text-[#1F1A24] dark:text-white">
              Your Signature Is {matchedProduct.name}
            </h2>
            <p className="text-xs sm:text-sm italic font-serif text-[#6B6475] dark:text-[#A79EB2] max-w-md mx-auto">
              &ldquo;{matchedProduct.moodLine}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-center">
            {/* Bottle Image */}
            <div className="md:col-span-5 relative aspect-[4/5] max-h-[280px] sm:max-h-none rounded-[18px] sm:rounded-[28px] overflow-hidden bg-neutral-900 border border-white/40 shadow-xl">
              <Image
                src={matchedProduct.images.primary}
                alt={matchedProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Rationale & Actions */}
            <div className="md:col-span-7 space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono-micro uppercase text-[#887F93]">
                  WHY THIS MATCHES YOUR SENSORY CODE:
                </span>
                <p className="text-sm text-[#4E4658] dark:text-[#CBC2D5] leading-relaxed">
                  Your choices reflect an inclination toward {matchedProduct.family.toLowerCase()} textures with an unhurried, magnetic dry-down. {matchedProduct.name} balances volatile top notes of {matchedProduct.notes.top.slice(0, 2).join(' and ')} with an anchoring foundation of {matchedProduct.notes.base.slice(0, 2).join(' and ')}.
                </p>
              </div>

              {/* Notes pill preview */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono-micro uppercase text-neutral-400">
                  KEY NOTES PYRAMID:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    ...matchedProduct.notes.top,
                    ...matchedProduct.notes.heart,
                    ...matchedProduct.notes.base,
                  ].map((n) => (
                    <span
                      key={n}
                      className="glass-pill px-3 py-1 text-xs text-neutral-800 dark:text-neutral-200"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono-micro">
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="text-neutral-400 block text-[10px]">LONGEVITY</span>
                  <span className="font-bold text-neutral-800 dark:text-white">
                    {matchedProduct.meters.longevityLabel}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="text-neutral-400 block text-[10px]">CONCENTRATION</span>
                  <span className="font-bold text-neutral-800 dark:text-white">
                    28% Extrait de Parfum
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => addToCart(matchedProduct, '50ml')}
                  className="flex-1 glass-btn-solid py-3.5 text-xs font-mono-micro uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire 50ml Parfum — ₹{matchedProduct.price}</span>
                </button>

                <Link
                  href={`/product/${matchedProduct.slug}`}
                  className="glass-btn-outline px-5 py-3.5 text-xs font-mono-micro uppercase tracking-wider flex items-center gap-1.5 hover:text-black dark:hover:text-white"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Story</span>
                </Link>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs font-mono-micro text-neutral-500">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 underline underline-offset-4 hover:text-black dark:hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Scent Quiz</span>
                </button>
                <span>✦ Includes 2 Complimentary 2ml Discovery Vials</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
