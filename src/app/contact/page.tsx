'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How does the Sample-First guarantee work?',
    answer:
      'Every 50ml or 100ml parfum you order arrives accompanied by a complimentary 2ml sample vial of the same blend. We invite you to spritz and wear the 2ml vial for 48 hours. If the fragrance does not entirely enchant you, return the unopened full parfum within 14 days for an immediate exchange or refund.',
  },
  {
    question: 'How do your fragrances survive intense tropical heat and humidity?',
    answer:
      'Traditional perfumes rely on high concentrations of volatile alcohol that evaporate within 60 minutes in hot weather. We formulate our perfumes as true Extraits de Parfum with a dense 28% oil concentration, anchored by skin-adaptive molecular fixatives (like Iso E Super and natural Ambergris isolates) that blossom slowly with body warmth rather than dissipating.',
  },
  {
    question: 'How does custom diamond-tip engraving work?',
    answer:
      'Our master lapidaries use non-destructive diamond-point laser engraving directly on the heavy French borosilicate glass base. You can personalize any parfum with up to 16 characters in Classic Serif, Modern Sans, or Monogram font. Personalization takes 24 hours before dispatch.',
  },
  {
    question: 'What is "The Rule of Three" bundle?',
    answer:
      'Curate any three 50ml or 100ml parfums across our collection — for instance, a fresh citrus for morning clarity, a floral for afternoon warmth, and a smoked amber for nocturnal intrigue. The lowest-priced parfum in your cart will automatically be made complimentary.',
  },
  {
    question: 'What are your delivery times and shipping costs?',
    answer:
      'We offer complimentary insured courier delivery across India on all orders exceeding ₹599. Orders within metro areas (Mumbai, Delhi NCR, Bengaluru, Hyderabad) arrive within 48–72 hours via temperature-controlled air freight.',
  },
];

export default function ContactPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Private Parfum Commission',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        name: '',
        email: '',
        topic: 'Private Parfum Commission',
        message: '',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-6 py-4 sm:py-16 space-y-8 sm:space-y-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
        <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl lg:text-7xl text-[#1F1A24] dark:text-[#F7F3EE]">
          Speak with our blenders.
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5467] dark:text-[#B6ADC2] leading-relaxed max-w-md mx-auto">
          Whether you need bespoke wedding gifting, corporate parfums, or personalized olfactory advice, our concierge is at your service.
        </p>
      </div>

      {/* Contact Form & Contact Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Contact Information & Concierge Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="liquid-glass rounded-[20px] sm:rounded-[28px] p-4 xs:p-6 sm:p-8 space-y-4 sm:space-y-6 border border-white/60 dark:border-white/10 shadow-xl">
            <h3 className="font-display text-xl sm:text-2xl text-[#1F1A24] dark:text-white">
              Direct Inquiries
            </h3>

            <div className="space-y-4 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full glass-pill flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <span className="font-mono-micro uppercase text-[10px] text-neutral-400 block">
                    EMAIL THE CONCIERGE
                  </span>
                  <a href="mailto:concierge@aurafragrances.com" className="font-semibold text-sm hover:underline">
                    concierge@aurafragrances.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full glass-pill flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <span className="font-mono-micro uppercase text-[10px] text-neutral-400 block">
                    CLIENT HELPLINE
                  </span>
                  <span className="font-semibold text-sm">+91 22 4982 7100</span>
                  <span className="block text-[10px] text-neutral-400">
                    Tue – Sun, 10:00 AM – 7:00 PM IST
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full glass-pill flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <span className="font-mono-micro uppercase text-[10px] text-neutral-400 block">
                    RESPONSE COMMITMENT
                  </span>
                  <span className="font-medium text-xs">
                    Inquiries answered within 4 business hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="liquid-glass rounded-[28px] p-6 bg-gradient-to-br from-[#E8D3A8]/20 to-[#CFC3F0]/20 border border-white/60 dark:border-white/10 space-y-2">
            <span className="text-[10px] font-mono-micro uppercase tracking-wider text-amber-900 dark:text-amber-200 block">
              CORPORATE & WEDDING PARFUMS
            </span>
            <h4 className="font-display text-xl text-[#1F1A24] dark:text-white">
              Planning a Grand Commission?
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              We create custom wax-sealed discovery sets, personalized laser monograms, and custom silk-box presentations for select celebratory occasions.
            </p>
          </div>
        </div>

        {/* Form (7 cols) */}
        <div className="lg:col-span-7 liquid-glass rounded-[24px] sm:rounded-[32px] p-5 xs:p-6 sm:p-10 bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-2xl">
          <h3 className="font-display text-2xl xs:text-3xl text-[#1F1A24] dark:text-white mb-2">
            Send an Inquiry
          </h3>
          <p className="text-xs text-neutral-500 mb-6">
            Share your inquiry with our blenders. We respond promptly.
          </p>

          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-display text-2xl text-[#1F1A24] dark:text-white">
                Message Received
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                Thank you for reaching out to our house. A fragrance advisor will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono-micro uppercase text-[#887F93] block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-full bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/15 outline-none font-sans min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono-micro uppercase text-[#887F93] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. liam@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-full bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/15 outline-none font-sans min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono-micro uppercase text-[#887F93] block mb-1">
                  Nature of Inquiry
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-full bg-white/70 dark:bg-[#1C1625] border border-black/10 dark:border-white/15 outline-none font-mono-micro text-[#1F1A24] dark:text-white cursor-pointer min-h-[44px]"
                >
                  <option>Private Parfum Commission</option>
                  <option>Custom Bottle Engraving Assistance</option>
                  <option>Order Status or Exchange</option>
                  <option>Fragrance Layering Recommendation</option>
                  <option>Boutique Consultation Booking</option>
                  <option>Corporate or Wedding Gifting</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono-micro uppercase text-[#887F93] block mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about the scent profile, recipient, or event..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/15 outline-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full glass-btn-solid py-3.5 text-xs font-mono-micro uppercase tracking-wider active:scale-95 transition-all touch-manipulation cursor-pointer"
              >
                Dispatch Message →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div id="faq" className="space-y-6 sm:space-y-8 pt-4 sm:pt-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl text-[#1F1A24] dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaqIndex === idx;
            return (
              <div
                key={idx}
                className="liquid-glass rounded-2xl overflow-hidden border border-white/60 dark:border-white/10 transition-all"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className="w-full px-4 xs:px-6 py-3.5 sm:py-4 text-left flex items-center justify-between gap-3 sm:gap-4 font-display text-base xs:text-lg sm:text-xl text-[#1F1A24] dark:text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-black dark:text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 xs:px-6 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[#524B5D] dark:text-[#B6ADC3] leading-relaxed border-t border-black/5 dark:border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
