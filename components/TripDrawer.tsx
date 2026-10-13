'use client';

import React from 'react';
import Image from 'next/image';
import { useTrip } from '@/context/TripContext';
import { X, Trash2, ArrowRight, ShoppingBag, Plus } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const TripDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    selectedDestinations,
    removeDestination,
    clearTrip,
  } = useTrip();

  if (!isDrawerOpen) return null;

  const handleProceedToQuotation = () => {
    setIsDrawerOpen(false);
    const plannerEl =
      document.getElementById('whatsapp-enquiry') ||
      document.getElementById('trip-planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen sm:max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#182e5c] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#42bfd8]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#182e5c]">
                  Your Trip Wishlist
                </h3>
                <span className="text-xs text-slate-500">
                  {selectedDestinations.length}{' '}
                  {selectedDestinations.length === 1 ? 'destination' : 'destinations'} added
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors touch-manipulation"
              aria-label="Close trip drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
            {selectedDestinations.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-base text-slate-700 mb-1">
                  Your trip list is empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Browse destinations from Kerala, India, or International, and tap <strong>+ Add to Trip</strong>.
                </p>
                <a
                  href="#destinations"
                  onClick={() => setIsDrawerOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#182e5c] text-white text-xs font-bold hover:bg-[#203a78] transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#42bfd8]" />
                  <span>Browse Destinations</span>
                </a>
              </div>
            ) : (
              selectedDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-2xs transition-all"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#318bc6]">
                      {dest.regionLabel} · {dest.duration}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-[#182e5c] truncate">
                      {dest.name}
                    </h4>
                    <span className="text-xs text-slate-500 line-clamp-1">
                      {dest.category}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDestination(dest.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title={`Remove ${dest.name}`}
                    aria-label={`Remove ${dest.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {selectedDestinations.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Total Items</span>
                <span className="font-bold text-slate-800">
                  {selectedDestinations.length} places & experiences
                </span>
              </div>

              <button
                type="button"
                onClick={handleProceedToQuotation}
                className="w-full py-3.5 bg-[#20a88a] hover:bg-[#198a71] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Enquire on WhatsApp (+91 70929 36243)</span>
                <ArrowRight className="w-4 h-4 text-emerald-100" />
              </button>

              <button
                type="button"
                onClick={clearTrip}
                className="w-full text-center text-xs text-slate-400 hover:text-red-500 transition-colors py-1 cursor-pointer"
              >
                Clear all destinations
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
