'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown, Sparkles, MapPin, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const Hero: React.FC = () => {
  const { selectedIds, setIsDrawerOpen } = useTrip();

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-[#0d1e3d] text-white overflow-hidden">
      {/* Background Photography with Luxury Shading */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2200&q=90')`,
          backgroundPosition: 'center 48%',
        }}
        role="img"
        aria-label="Traditional thatched houseboat cruising Kerala backwaters surrounded by swaying coconut palms"
      />

      {/* Dual Gradient Overlay for Editorial Depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07152b]/95 via-[#0c2242]/80 to-[#07152b]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#091830] via-transparent to-transparent opacity-85" />

      {/* Spectrum Line Accent Across Top */}
      <div className="absolute top-0 left-0 right-0 spectrum-bar-thin opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10.5px] sm:text-xs font-bold tracking-widest uppercase text-[#83d6e8] mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#42bfd8] via-[#f5d64c] to-[#ed373b] animate-pulse" />
            <span>Since 2010 · Onattukara, Mavelikkara, Kerala</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6">
            The world is <br />
            <span className="spectrum-text-gradient italic font-serif font-light">for everyone.</span>
          </h1>

          {/* Concept Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200/95 leading-relaxed mb-6 sm:mb-8 max-w-2xl font-light">
            Not just another rigid package. A journey shaped completely around you.
            Browse destinations like shopping online, add what you love to your trip list,
            and receive a handcrafted quotation from our Kerala and GCC travel specialists.
          </p>

          {/* Action CTAs: Compact & Clean UI */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-8 sm:mb-10">
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#182e5c] hover:bg-slate-100 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-center whitespace-nowrap"
            >
              <span>Select Destinations</span>
              <ArrowUpRight className="w-4 h-4 text-[#318bc6]" />
            </Link>

            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 backdrop-blur-xs px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 text-center whitespace-nowrap"
            >
              <span>Explore Packages</span>
              <ArrowDown className="w-4 h-4 text-[#42bfd8]" />
            </Link>
          </div>

          {/* Trust Value Points */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-200/90 font-medium pt-4 border-t border-white/15">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#42bfd8] flex-shrink-0" />
              <span>100% Customized Itineraries</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#20a88a] flex-shrink-0" />
              <span>Dedicated GCC & Saudi Desk</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#f5d64c] flex-shrink-0" />
              <span>Flights, Stays & Ayurveda</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#f89a2e] flex-shrink-0" />
              <span>Zero Live Booking Engine Stress</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Floating Vintage Compass Stamp (Desktop) */}
      <div className="hidden xl:flex absolute right-16 bottom-16 w-36 h-36 rounded-full border border-white/30 backdrop-blur-md flex-col items-center justify-center text-center p-3 transform rotate-6 hover:rotate-0 transition-transform">
        <span className="text-[9px] uppercase tracking-widest text-[#42bfd8] font-bold">
          YOUR JOURNEY
        </span>
        <span className="font-heading font-extrabold text-sm text-white tracking-wider my-0.5">
          YOUR WAY
        </span>
        <span className="text-xs text-[#f5d64c]">✦</span>
        <span className="text-[8.5px] uppercase tracking-wider text-slate-300">
          SINCE 2010
        </span>
      </div>
    </section>
  );
};
