'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TOUR_PACKAGES } from '@/data/packages';
import { useTrip } from '@/context/TripContext';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FeaturedPackagesPreview: React.FC = () => {
  const { loadPackageIntoTrip, formatPrice, addEnquiryItem } = useTrip();

  // Top 3 packages
  const previewPackages = TOUR_PACKAGES.slice(0, 3);

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#182e5c] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#f89a2e]" />
              <span>Curated Routes · Ready Starting Points</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#182e5c] tracking-tight leading-tight">
              Good trips start <br />
              <span className="text-[#318bc6] italic font-serif font-light">with a feeling.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-slate-600 text-xs sm:text-sm leading-relaxed">
              Prefer a tried-and-tested route? Tap <strong>Customise This Package</strong> to load its places into your trip list.
            </p>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 bg-[#182e5c] hover:bg-[#203a72] text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-sm whitespace-nowrap"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-4 h-4 text-[#42bfd8]" />
            </Link>
          </div>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {previewPackages.map((pkg) => (
            <article
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="bg-[#182e5c]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {pkg.category}
                    </span>
                    <span className="bg-[#f5d64c] text-[#111e33] text-xs font-extrabold px-2.5 py-1 rounded-full shadow-2xs">
                      {pkg.durationNights}N / {pkg.durationDays}D
                    </span>
                  </div>

                  {/* Indicative Price */}
                  <div className="absolute bottom-3 left-3.5 text-white">
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
                  {/* Route text */}
                  <div className="text-[11px] font-bold text-[#318bc6] bg-slate-50 border border-slate-100 rounded-lg p-2.5 mb-3 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#f89a2e] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{pkg.route}</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-[#182e5c] mb-1 group-hover:text-[#318bc6] transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3 font-medium">
                    {pkg.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-light">
                    {pkg.description}
                  </p>

                  {/* Inclusions */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-4">
                    {pkg.inclusions.slice(0, 3).map((inc) => (
                      <div key={inc} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#20a88a] flex-shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              {/* Bottom Action: Customise + Direct WhatsApp Enquiry */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => loadPackageIntoTrip(pkg)}
                    className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
                    className="py-2.5 px-2 bg-[#20a88a] hover:bg-[#198a71] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
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

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#182e5c] hover:text-[#318bc6] bg-white hover:bg-slate-50 border border-slate-200 px-6 py-3.5 rounded-xl transition-all shadow-2xs"
          >
            <Compass className="w-4 h-4 text-[#f89a2e]" />
            <span>Explore All Curated Holiday Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
