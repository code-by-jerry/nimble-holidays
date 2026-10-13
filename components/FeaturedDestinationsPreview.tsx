'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DESTINATIONS, Destination } from '@/data/destinations';
import { useTrip } from '@/context/TripContext';
import {
  Plus,
  Check,
  Eye,
  Clock,
  Sparkles,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FeaturedDestinationsPreview: React.FC = () => {
  const {
    toggleDestination,
    isDestinationSelected,
    setActiveQuickView,
    setIsDrawerOpen,
    addEnquiryItem,
  } = useTrip();

  // Pick 6 top featured destinations across Kerala, India, and International
  const featuredList = DESTINATIONS.filter((d) => d.featured).slice(0, 6);

  return (
    <section id="destinations" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#182e5c] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#42bfd8]" />
              <span>E-Commerce Discovery · Pick & Plan</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#182e5c] tracking-tight leading-tight">
              Places worth <br />
              <span className="text-[#318bc6] italic font-serif font-light">getting lost in.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-slate-600 text-xs sm:text-sm leading-relaxed">
              Browse destinations like shopping online. Tap <strong>+ Add to Trip</strong> on any place to build your personal travel list.
            </p>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 bg-[#182e5c] hover:bg-[#203a72] text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-sm whitespace-nowrap"
            >
              <span>View All 12+ Places</span>
              <ArrowRight className="w-4 h-4 text-[#42bfd8]" />
            </Link>
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredList.map((dest) => {
            const isSelected = isDestinationSelected(dest.id);

            return (
              <article
                key={dest.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  isSelected
                    ? 'border-[#20a88a] ring-2 ring-[#20a88a]/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    {/* Region Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                      <span className="bg-white/90 backdrop-blur-xs text-[#182e5c] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                        {dest.regionLabel}
                      </span>
                    </div>

                    {/* Quick View Button */}
                    <button
                      type="button"
                      onClick={() => setActiveQuickView(dest)}
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-slate-700 hover:text-[#182e5c] backdrop-blur-xs flex items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-110 shadow-xs"
                      title="Quick preview details"
                      aria-label={`Quick view ${dest.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Bottom overlay: Duration & Category */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                      <span className="font-medium text-slate-200 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#42bfd8]" />
                        <span>{dest.duration}</span>
                      </span>
                      <span className="text-[11px] font-medium text-slate-300 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        {dest.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-heading font-extrabold text-xl text-[#182e5c] mb-1 group-hover:text-[#318bc6] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 font-medium line-clamp-1">
                      {dest.tagline}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-light">
                      {dest.description}
                    </p>

                    {/* Highlights Preview */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                      {dest.highlights.slice(0, 2).map((h) => (
                        <span
                          key={h}
                          className="text-[11px] bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100"
                        >
                          ✦ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action: Dual Actions (Wishlist + Direct WhatsApp Enquiry) */}
                <div className="p-5 sm:p-6 pt-0">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        toggleDestination(dest.id);
                        if (!isSelected) {
                          setIsDrawerOpen(true);
                        }
                      }}
                      className={`py-2.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#20a88a]/15 text-[#13745f] border border-[#20a88a]/30'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title={isSelected ? 'Remove from trip wishlist' : 'Add to trip wishlist'}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#20a88a]" />
                          <span>In Trip</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#318bc6]" />
                          <span>+ Add</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        addEnquiryItem({
                          id: dest.id,
                          title: `${dest.name} (${dest.regionLabel})`,
                          category: 'destination',
                          subtitle: dest.category,
                        })
                      }
                      className="py-2.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 bg-[#20a88a] hover:bg-[#198a71] text-white shadow-xs hover:shadow transition-all cursor-pointer"
                      title="Enquire about this destination on WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA to view full catalog */}
        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#182e5c] hover:text-[#318bc6] bg-slate-50 hover:bg-slate-100 border border-slate-200 px-6 py-3.5 rounded-xl transition-all"
          >
            <Compass className="w-4 h-4 text-[#318bc6]" />
            <span>Discover All 12+ Destinations & Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
