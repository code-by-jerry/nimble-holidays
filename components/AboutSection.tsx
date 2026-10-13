'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart, Shield, Users, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-us" className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Image & Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85"
                alt="Kerala Onattukara and Munnar misty mountain tea estates"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1e3e]/90 via-transparent to-transparent" />

              {/* Bottom Image Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#42bfd8] block mb-1">
                  Rooted in God’s Own Country
                </span>
                <h4 className="font-heading font-extrabold text-lg sm:text-xl leading-snug">
                  From Onattukara, Mavelikkara to the world.
                </h4>
              </div>
            </div>

            {/* Floating Founded Badge */}
            <div className="absolute -top-3 -right-2 sm:-top-5 sm:-right-5 bg-white p-3 sm:p-4 md:p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#182e5c] text-white flex items-center justify-center font-heading font-extrabold text-lg sm:text-xl">
                14+
              </div>
              <div>
                <span className="text-xs font-bold text-[#182e5c] block leading-tight">Years of Trust</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500">Established 2010</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Vision */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#182e5c] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#f89a2e]" />
              <span>Our Story & Vision</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#182e5c] tracking-tight leading-tight mb-6">
              The World Is <br />
              <span className="spectrum-text-gradient italic font-serif font-light">for everyone.</span>
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                <strong>Nimble Holidays</strong> began its journey in 2010 in the small, culturally rich
                village of <strong>Onattukara, Mavelikkara, Kerala</strong>. Built on the conviction that travel
                should be accessible to every person, our founding vision was to dissolve barriers and make exploring
                new destinations, cultures, and traditions genuine and transparent.
              </p>
              <p>
                Over the past 14+ years, we have grown from our Kerala roots into a trusted partner for travellers
                across India and the GCC countries (Saudi Arabia, UAE, Qatar, Kuwait, Oman, and Bahrain).
                Whether welcoming GCC families home to Kerala backwaters, arranging rejuvenating Ayurvedic wellness courses,
                or planning international holidays, our guiding principle remains simple:
                <em> travel planned with human warmth and zero rigid constraints.</em>
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 mb-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#318bc6]/15 text-[#318bc6] flex items-center justify-center font-bold mb-2.5">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c] mb-1">
                  Accessibility
                </h4>
                <p className="text-xs text-slate-500 leading-normal">
                  Travel planned without intimidation, complicated fees, or rigid booking engines.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#20a88a]/15 text-[#20a88a] flex items-center justify-center font-bold mb-2.5">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c] mb-1">
                  Authenticity
                </h4>
                <p className="text-xs text-slate-500 leading-normal">
                  Native Kerala insight, certified Vaidyas, and hand-inspected family accommodations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#f89a2e]/15 text-[#f89a2e] flex items-center justify-center font-bold mb-2.5">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c] mb-1">
                  GCC Care
                </h4>
                <p className="text-xs text-slate-500 leading-normal">
                  Specialized flight ticketing, airport fleet, and halal & family hospitality.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#182e5c] hover:text-[#318bc6] group transition-colors"
              >
                <span>Read our full Onattukara story & values</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
