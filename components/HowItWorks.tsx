'use client';

import React from 'react';
import Link from 'next/link';
import { MousePointerClick, CalendarCheck, FileText, MessageSquareQuote, ArrowUpRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose your places',
      description:
        'Browse Kerala backwaters, hill stations, royal palaces, or international islands. Tap "+ Add to Trip" just like adding items to a shopping cart.',
      icon: MousePointerClick,
      color: '#42bfd8',
      tag: 'E-Commerce Style',
    },
    {
      num: '02',
      title: 'Share the details',
      description:
        'Add your travel dates (or mark flexible), number of travellers (adults & children), stay preferences (3-star, 4-star, 5-star, houseboats), and budget.',
      icon: CalendarCheck,
      color: '#20a88a',
      tag: 'Zero Rigidity',
    },
    {
      num: '03',
      title: 'Get a trip made for you',
      description:
        'Our Kerala & GCC specialists craft a customized quotation and day-wise itinerary tailored to your group size and pace.',
      icon: FileText,
      color: '#f5d64c',
      tag: 'Handcrafted Plan',
    },
    {
      num: '04',
      title: 'Refine on WhatsApp',
      description:
        'Review the itinerary, adjust hotel categories, add flight options, and confirm with our friendly team over direct WhatsApp chat.',
      icon: MessageSquareQuote,
      color: '#f89a2e',
      tag: 'Instant Follow-up',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-28 bg-[#152c5b] text-white relative overflow-hidden">
      {/* Decorative Brand Watermark */}
      <div className="absolute right-[-40px] top-[-60px] text-white/[0.03] select-none pointer-events-none text-[320px] font-heading font-black leading-none">
        ✳
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column Overview */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#83d6e8] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#42bfd8]" />
              <span>Simple by Design</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.1] mb-5 sm:mb-6">
              Your trip. <br />
              <span className="text-[#83d6e8] italic font-serif font-light">Your choices.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              Think of it like building your own travel wishlist. Instead of being locked into
              rigid tour dates and pre-packaged bus tours, pick what moves you, share a few preferences,
              and let our team shape an itinerary that fits your family perfectly.
            </p>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xs mb-6 sm:mb-8">
              <div className="text-xs uppercase font-bold text-[#f5d64c] tracking-wider mb-1">
                The Nimble Difference
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                “We began in 2010 in Onattukara, Kerala, on the belief that travel must be accessible to everyone without barriers.
                No automated bot frustrates your booking—real human destination experts take care of every detail.”
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/destinations"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#182e5c] hover:bg-slate-100 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 text-center touch-manipulation"
              >
                <span>Start Exploring Places</span>
                <ArrowUpRight className="w-4 h-4 text-[#318bc6]" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all text-center"
              >
                <span>Full Process & FAQs</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column Step Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {steps.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl bg-[#1a366e]/70 border border-white/10 hover:border-white/25 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono-code font-bold text-xs text-slate-400">
                        STEP {step.num}
                      </span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${step.color}20`,
                          color: step.color,
                        }}
                      >
                        {step.tag}
                      </span>
                    </div>

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: `${step.color}25`,
                        color: step.color,
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white mb-2">
                      {step.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
