'use client';

import React from 'react';
import Image from 'next/image';
import { AYURVEDA_PROGRAMS, AyurvedaProgram } from '@/data/ayurveda';
import { useTrip } from '@/context/TripContext';
import { Sparkles, Check, Clock, Heart, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO, getWhatsAppLink } from '@/data/contact';

export const AyurvedaSection: React.FC = () => {
  const { toggleDestination, isDestinationSelected, setPlannerNotes, addEnquiryItem } = useTrip();

  const handleAddAyurveda = (prog: AyurvedaProgram) => {
    // Add to dynamic WhatsApp enquiry item list
    addEnquiryItem({
      id: prog.id,
      title: `${prog.name} (${prog.recommendedDuration})`,
      category: 'ayurveda',
      subtitle: prog.tagline,
    });
  };

  return (
    <section id="ayurveda" className="py-16 sm:py-20 lg:py-28 bg-[#0b1a36] text-white relative overflow-hidden">
      {/* Decorative Gold & Teal Glows */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-[#20a88a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-[#f5d64c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#20a88a] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#20a88a]" />
              <span>Kerala Ayurveda & Wellness · 5,000 Years of Healing</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
              Rest and renewal, <br />
              <span className="text-[#8be0e9] italic font-serif font-light">the authentic Kerala way.</span>
            </h2>
          </div>

          <p className="max-w-md text-slate-300 text-sm sm:text-base leading-relaxed">
            Kerala is the cradle of classical Ayurveda. Experience personalized Vaidya consultations,
            healing warm medicated oils, Satvik nutrition, and morning yoga beside quiet backwaters.
          </p>
        </div>

        {/* 4 Ayurveda Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {AYURVEDA_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="bg-[#12264a] border border-white/10 hover:border-white/20 rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Header Tag & Title */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="font-mono-code text-xs text-[#f5d64c] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {prog.sanskritName}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#8be0e9]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{prog.recommendedDuration}</span>
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-2">
                  {prog.name}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light">
                  {prog.description}
                </p>

                {/* Classical Therapies Included */}
                <div className="mb-5 sm:mb-6">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-2.5">
                    Signature Therapies
                  </span>
                  <ul className="space-y-2">
                    {prog.treatments.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <span className="text-[#20a88a] font-bold">✦</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/5 mb-5 sm:mb-6">
                  <span className="text-[11px] uppercase font-bold text-[#f5d64c] tracking-wider block mb-1.5">
                    Expected Health Benefits
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {prog.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#20a88a] flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <span className="text-xs text-slate-400">
                  Ideal for: <strong className="text-slate-200">{prog.idealFor}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => handleAddAyurveda(prog)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#20a88a] hover:bg-[#1a8e75] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shadow-sm touch-manipulation min-h-[44px]"
                  title="Enquire about this Ayurveda program on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Footer */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-white/[0.05] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f5d64c]/20 text-[#f5d64c] flex items-center justify-center font-bold flex-shrink-0">
              ✿
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                All Ayurveda retreats are NABH accredited & medically supervised
              </div>
              <div className="text-xs text-slate-400">
                Individual pulse diagnosis (Nadi Pariksha) by seasoned BAMS/MD Ayurvedic physicians on day 1.
              </div>
            </div>
          </div>
          <a
            href={getWhatsAppLink('Hello Nimble Holidays, I would like to consult about Kerala Ayurveda stays.')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#8be0e9] hover:underline whitespace-nowrap flex items-center gap-1.5"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Chat with Ayurveda desk on WhatsApp (+91 70929 36243) ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
