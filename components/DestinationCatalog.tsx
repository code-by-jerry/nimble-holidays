'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { DESTINATIONS, Destination } from '@/data/destinations';
import { useTrip } from '@/context/TripContext';
import {
  Search,
  Check,
  Plus,
  Clock,
  Sparkles,
  Eye,
  MapPin,
  Compass,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const DestinationCatalog: React.FC = () => {
  const {
    selectedIds,
    toggleDestination,
    isDestinationSelected,
    setActiveQuickView,
    setIsDrawerOpen,
    addEnquiryItem,
  } = useTrip();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Destinations', count: DESTINATIONS.length },
    {
      id: 'kerala',
      label: 'Kerala',
      count: DESTINATIONS.filter((d) => d.region === 'kerala').length,
    },
    {
      id: 'india',
      label: 'Rest of India',
      count: DESTINATIONS.filter((d) => d.region === 'india').length,
    },
    {
      id: 'international',
      label: 'International',
      count: DESTINATIONS.filter((d) => d.region === 'international').length,
    },
    {
      id: 'experiences',
      label: 'Experiences & Activities',
      count: DESTINATIONS.filter((d) => d.region === 'experiences').length,
    },
  ];

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesCategory =
        activeFilter === 'all' || dest.region === activeFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dest.name.toLowerCase().includes(q) ||
        dest.category.toLowerCase().includes(q) ||
        dest.regionLabel.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q) ||
        dest.highlights.some((h) => h.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="destinations" className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#182e5c] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#318bc6]" />
              <span>Select Your Destination · E-Commerce Discovery</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#182e5c] tracking-tight leading-tight">
              Places worth <br />
              <span className="text-[#318bc6] italic font-serif font-light">getting lost in.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              From tranquil Kerala backwaters and misty high ranges to royal palaces and turquoise island lagoons.
              Tap <strong>+ Add to Trip</strong> to assemble your dream wishlist.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#20a88a]" />
                <span>{selectedIds.length} {selectedIds.length === 1 ? 'place' : 'places'} in your trip</span>
              </span>
              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="text-xs font-bold text-[#182e5c] hover:text-[#318bc6] underline transition-colors"
                >
                  Review trip list ↗
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-8 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 scroll-smooth snap-x snap-mandatory">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`snap-start whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 touch-manipulation flex-shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-[#182e5c] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10.5px] sm:text-[11px] px-1.5 py-0.2 rounded-full ${
                    activeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, activities, hills..."
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] focus:ring-2 focus:ring-[#318bc6]/20 transition-all text-slate-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-slate-700 mb-1">
              No destinations found
            </h3>
            <p className="text-sm text-slate-500 mb-4 max-w-sm mx-auto">
              We couldn’t find matches for &ldquo;{searchQuery}&rdquo;. Try clearing your search or tell our team what you have in mind!
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-4 py-2.5 bg-[#182e5c] text-white rounded-xl text-xs font-bold hover:bg-[#203a78] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {filteredDestinations.map((dest) => {
              const isSelected = isDestinationSelected(dest.id);
              return (
                <article
                  key={dest.id}
                  className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#20a88a] ring-2 ring-[#20a88a]/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {/* Image Container with Badges */}
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={dest.image}
                        alt={`${dest.name}, ${dest.regionLabel}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-106"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80" />

                      {/* Category Tag */}
                      <span className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 bg-white/95 backdrop-blur-xs text-[#182e5c] text-[10.5px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#318bc6]" />
                        <span>{dest.category}</span>
                      </span>

                      {/* Duration Tag */}
                      <span className="absolute bottom-3 left-3 sm:left-3.5 bg-black/60 backdrop-blur-xs text-white text-[10.5px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#f5d64c]" />
                        <span>{dest.duration}</span>
                      </span>

                      {/* Quick View Button */}
                      <button
                        type="button"
                        onClick={() => setActiveQuickView(dest)}
                        className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-800 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-transform hover:scale-105 flex items-center gap-1.5 touch-manipulation"
                        aria-label={`View details of ${dest.name}`}
                      >
                        <Eye className="w-3.5 h-3.5 text-[#318bc6]" />
                        <span>Details</span>
                      </button>

                      {/* Quick Add Toggle Icon (Top Right) */}
                      <button
                        type="button"
                        onClick={() => toggleDestination(dest.id)}
                        className={`absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-9.5 h-9.5 rounded-full flex items-center justify-center font-bold transition-all shadow-md cursor-pointer touch-manipulation ${
                          isSelected
                            ? 'bg-[#20a88a] text-white scale-105 hover:bg-red-500 hover:text-white'
                            : 'bg-white/95 text-[#182e5c] hover:bg-white hover:scale-110'
                        }`}
                        aria-label={isSelected ? `Remove ${dest.name}` : `Add ${dest.name}`}
                        title={isSelected ? 'Remove from trip' : 'Add to trip'}
                      >
                        {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#42bfd8]" />
                          <span>{dest.regionLabel}</span>
                        </span>
                        <span className="text-amber-500 font-bold">★ {dest.rating}</span>
                      </div>

                      <h3 className="font-heading font-extrabold text-xl text-[#182e5c] tracking-tight mb-2 group-hover:text-[#318bc6] transition-colors">
                        {dest.name}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                        {dest.tagline}
                      </p>

                      {/* Highlights Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {dest.highlights.slice(0, 2).map((h) => (
                          <span
                            key={h}
                            className="bg-slate-100 text-slate-600 text-[10.5px] font-medium px-2 py-0.5 rounded-md"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions: Dual Actions (Wishlist + Direct WhatsApp Enquiry) */}
                  <div className="px-5 pb-5 pt-0">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => toggleDestination(dest.id)}
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
        )}

        {/* Bottom Banner Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h4 className="font-heading font-bold text-base text-[#182e5c]">
              Have a destination not listed here?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              We arrange customized itineraries worldwide. Tell us the destination or theme in your notes!
            </p>
          </div>
          <a
            href="#trip-planner"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#182e5c] font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            <span>Plan Something Different</span>
            <ArrowRight className="w-4 h-4 text-[#318bc6]" />
          </a>
        </div>
      </div>
    </section>
  );
};
