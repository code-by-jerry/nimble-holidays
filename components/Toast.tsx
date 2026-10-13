'use client';

import React from 'react';
import { useTrip } from '@/context/TripContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useTrip();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 -translate-x-1/2 bottom-20 sm:bottom-24 z-50 pointer-events-none"
    >
      <div className="bg-[#182e5c] text-white px-5 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-2xl border border-white/20 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <CheckCircle2 className="w-4 h-4 text-[#42bfd8] flex-shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
