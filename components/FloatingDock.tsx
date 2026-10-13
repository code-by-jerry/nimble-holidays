'use client';

import React from 'react';
import { useTrip } from '@/context/TripContext';
import { ShoppingBag } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getWhatsAppLink } from '@/data/contact';

export const FloatingDock: React.FC = () => {
  const { selectedIds, setIsDrawerOpen } = useTrip();

  const whatsappHref = getWhatsAppLink(
    'Hello Nimble Holidays! I am on your website and would like help planning a trip.'
  );

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2.5 sm:gap-3.5 pointer-events-none">
      {/* Trip List Badge Pill (Visible when 1 or more places selected) */}
      {selectedIds.length > 0 && (
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="pointer-events-auto inline-flex items-center gap-2 sm:gap-2.5 bg-[#182e5c] hover:bg-[#203a78] text-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-105 border border-white/20 animate-in slide-in-from-bottom duration-300 cursor-pointer touch-manipulation"
          aria-label="View current trip list"
        >
          <span className="w-5 h-5 rounded-full bg-[#f89a2e] text-[#111e33] flex items-center justify-center text-xs font-extrabold flex-shrink-0">
            {selectedIds.length}
          </span>
          <span className="hidden sm:inline">Places Selected</span>
          <span className="sm:hidden">Trip</span>
          <span className="text-[#42bfd8]">· View</span>
        </button>
      )}

      {/* Floating WhatsApp Action Button - Only Icon, No Text */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto relative w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white hover:bg-slate-50 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-200/80 group cursor-pointer touch-manipulation flex-shrink-0"
        aria-label="Contact Nimble Holidays on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#67C15E]/20 animate-ping opacity-75 pointer-events-none" />
        <WhatsAppIcon className="w-8 h-8 sm:w-10 sm:h-10 relative z-10 transition-transform duration-300 group-hover:scale-105" />
      </a>
    </div>
  );
};
