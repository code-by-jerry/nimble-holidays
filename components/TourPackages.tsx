'use client';

import React from 'react';
import Image from 'next/image';
import { TOUR_PACKAGES, TourPackage } from '@/data/packages';
import { useTrip } from '@/context/TripContext';
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const TourPackages: React.FC = () => {
  const { loadPackageIntoTrip, formatPrice, addEnquiryItem } = useTrip();

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#182e5c] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#f89a2e]" />
              <span>Curated Tour Packages · Ready Starting Points</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#182e5c] tracking-tight leading-tight">
              Good trips start <br />
              <span className="text-[#318bc6] italic font-serif font-light">with a feeling.</span>
            </h2>
          </div>

          <p className="max-w-md text-slate-600 text-sm sm:text-base leading-relaxed">
            Need inspiration or prefer a tried-and-tested route? Browse our curated itineraries.
            Tap <strong>Customise This Package</strong> to load its destinations into your trip list
            and adjust the hotels, nights, or activities to your liking.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TOUR_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Image Header with Route & Duration */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between">
                    <span className="bg-[#182e5c]/90 backdrop-blur-xs text-white text-[10.5px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md">
                      {pkg.category}
                    </span>
                    <span className="bg-[#f5d64c] text-[#111e33] text-[10.5px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-xs">
                      {pkg.durationNights}N / {pkg.durationDays}D
                    </span>
                  </div>

                  {/* Price Tag (Converted by selected currency) */}
                  <div className="absolute bottom-3 left-3 sm:left-3.5 text-white">
                    <span className="text-[10px] uppercase font-bold text-slate-300 block">
                      Indicative Quote From
                    </span>
                    <span className="font-heading font-extrabold text-lg sm:text-xl text-white">
                      {formatPrice(pkg.startingPriceINR)}
                      <span className="text-xs font-normal text-slate-300"> / person</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Route Bar */}
                  <div className="text-[11px] font-bold text-[#318bc6] bg-slate-50 border border-slate-100 rounded-lg p-2.5 mb-3 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#f89a2e] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{pkg.route}</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#182e5c] mb-2 leading-snug group-hover:text-[#318bc6] transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  {/* Inclusions */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Key Inclusions
                    </span>
                    {pkg.inclusions.slice(0, 3).map((inc) => (
                      <div
                        key={inc}
                        className="flex items-start gap-2 text-xs text-slate-600"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#20a88a] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Customise + Direct WhatsApp Enquiry */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => loadPackageIntoTrip(pkg)}
                    className="py-3 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    title="Customize hotels & stays for this package"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#f89a2e]" />
                    <span>Customise</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      addEnquiryItem({
                        id: pkg.id,
                        title: `${pkg.title} (${pkg.durationNights}N / ${pkg.durationDays}D)`,
                        category: 'package',
                        subtitle: pkg.route,
                      })
                    }
                    className="py-3 px-2 bg-[#20a88a] hover:bg-[#198a71] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    title="Enquire about this package on WhatsApp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
