'use client';

import React from 'react';
import Image from 'next/image';
import { useTrip } from '@/context/TripContext';
import { X, Check, Plus, Clock, MapPin, Sparkles, Calendar, Users } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const DestinationModal: React.FC = () => {
  const {
    activeQuickView,
    setActiveQuickView,
    toggleDestination,
    isDestinationSelected,
    addEnquiryItem,
  } = useTrip();

  if (!activeQuickView) return null;

  const isSelected = isDestinationSelected(activeQuickView.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setActiveQuickView(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-slate-100 flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setActiveQuickView(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/85 text-white flex items-center justify-center transition-colors cursor-pointer touch-manipulation"
          aria-label="Close modal"
        >
          <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-100 flex-shrink-0">
          <Image
            src={activeQuickView.image}
            alt={activeQuickView.name}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-white">
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#42bfd8] block mb-0.5 sm:mb-1">
              {activeQuickView.regionLabel} · {activeQuickView.category}
            </span>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl">
              {activeQuickView.name}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 text-center text-[11px] sm:text-xs">
            <div>
              <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-0.5">
                Duration
              </span>
              <strong className="text-slate-800">{activeQuickView.duration}</strong>
            </div>
            <div>
              <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-0.5">
                Best Season
              </span>
              <strong className="text-slate-800">{activeQuickView.bestSeason}</strong>
            </div>
            <div>
              <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-0.5">
                Rating
              </span>
              <strong className="text-amber-500 font-bold">★ {activeQuickView.rating} / 5.0</strong>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#182e5c] uppercase tracking-wider mb-2">
              Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeQuickView.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#182e5c] uppercase tracking-wider mb-3">
              Key Experiences & Highlights
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {activeQuickView.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#20a88a] flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal For */}
          <div className="text-xs text-slate-500">
            Recommended for: <strong className="text-slate-800">{activeQuickView.idealFor}</strong>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setActiveQuickView(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleDestination(activeQuickView.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-[#182e5c] hover:bg-[#203a78] text-white shadow-xs'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4 text-[#20a88a]" />
                  <span>In Trip</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#42bfd8]" />
                  <span>+ Add to Trip</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                addEnquiryItem({
                  id: activeQuickView.id,
                  title: `${activeQuickView.name} (${activeQuickView.regionLabel})`,
                  category: 'destination',
                  subtitle: activeQuickView.category,
                });
                setActiveQuickView(null);
              }}
              className="px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 bg-[#20a88a] hover:bg-[#198a71] text-white shadow-sm transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
