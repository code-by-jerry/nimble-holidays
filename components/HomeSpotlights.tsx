'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Plane,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Luggage,
  Home,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getWhatsAppLink } from '@/data/contact';

export const HomeSpotlights: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#182e5c] block mb-2">
            Signature Specialties
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#182e5c]">
            Kerala Wellness & GCC Travel Assistance
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
            Two distinct pillars where Nimble Holidays delivers deep expertise and personal attention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spotlight 1: Kerala Ayurveda */}
          <div className="bg-gradient-to-br from-[#0c2a22] to-[#12382e] rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-xl border border-emerald-900/40 group">
            {/* Background botanical subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                <Heart className="w-3.5 h-3.5" />
                <span>Kerala Ayurveda & Wellness</span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 leading-snug">
                Rest and renewal, <br />
                <span className="text-emerald-300 italic font-serif font-light">the authentic Kerala way.</span>
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/80 font-light leading-relaxed mb-6">
                NABH-accredited waterfront resorts, pulse diagnosis with senior Vaidyas, medicated herbal therapies, and dosha-calibrated Satvik dining.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-emerald-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Panchakarma Detox & Stress Relief Retreats</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Medicated herbal oils prepared with indigenous Kerala botanicals</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Daily morning pranayama yoga beside calm backwaters</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-emerald-800/60">
              <Link
                href="/ayurveda"
                className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-[#0c2a22] font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md group-hover:gap-3"
              >
                <span>Discover Ayurveda Programs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Spotlight 2: Flights & GCC Assistance */}
          <div className="bg-gradient-to-br from-[#0e1e3e] to-[#182e5c] rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-xl border border-blue-900/40 group">
            {/* Background cyan subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 text-[#83d6e8] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                <Plane className="w-3.5 h-3.5" />
                <span>Flight Ticketing Desk</span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 leading-snug">
                Direct airline fares, <br />
                <span className="text-[#83d6e8] italic font-serif font-light">Saudi Arabia & GCC routes.</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-200/80 font-light leading-relaxed mb-6">
                Direct routes connecting Riyadh, Jeddah, Dammam, Dubai, Doha, and Kuwait to Cochin, Calicut, and Trivandrum with generous family baggage allowances.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#42bfd8] flex-shrink-0" />
                  <span>Competitive group & family fare quotes delivered to WhatsApp</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#42bfd8] flex-shrink-0" />
                  <span>Assistance with 30kg–40kg checked luggage allocations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#42bfd8] flex-shrink-0" />
                  <span>Airport chauffeur pickup waiting at arrivals with name placard</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-700/60">
              <Link
                href="/flights"
                className="inline-flex items-center gap-2 bg-[#42bfd8] hover:bg-[#38b2ca] text-[#0e1e3e] font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md group-hover:gap-3"
              >
                <span>Request Flight Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Flagship Combo Spotlight: Doorstep-to-Doorstep Transit Care */}
        <div className="mt-10 bg-gradient-to-r from-[#102347] via-[#182e5c] to-[#0d1e3d] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#20a88a]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#20a88a]/20 text-emerald-300 border border-[#20a88a]/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Home className="w-3.5 h-3.5" />
                <span>New Flagship Combo Pack</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                Doorstep-to-Doorstep Transit Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-5">
                Travelling from Dubai, Doha, Riyadh or outstation to your home in Coimbatore or Kerala? We coordinate your flights, luggage allowance, airport reception with a name placard, and private chauffeur AC drop right to your home doorstep.
              </p>

              <div className="flex flex-wrap gap-2.5 text-xs text-slate-200">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Plane className="w-3.5 h-3.5 text-[#42bfd8]" />
                  <span>Flight Ticketing</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#20a88a]" />
                  <span>Terminal Meet & Greet</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Home className="w-3.5 h-3.5 text-[#f89a2e]" />
                  <span>Home Doorstep Drop</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <Link
                href="/services/doorstep-transit"
                className="inline-flex items-center justify-center gap-2 bg-[#20a88a] hover:bg-[#198a71] text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
              >
                <span>Plan Doorstep Route</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getWhatsAppLink('Hello Nimble Holidays, I would like details on Doorstep-to-Doorstep Transit Care.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-xs transition-colors border border-white/20"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
