'use client';

import React from 'react';
import { TRAVEL_SERVICES, TravelService } from '@/data/services';
import {
  Plane,
  Building,
  Car,
  Sparkles,
  Compass,
  Users,
  ArrowRight,
  Check,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useTrip } from '@/context/TripContext';

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Plane,
  Building,
  Car,
  Sparkles,
  Compass,
  Users,
};

export const OtherServices: React.FC = () => {
  const { addEnquiryItem } = useTrip();

  const handleEnquireService = (svc: TravelService) => {
    addEnquiryItem({
      id: svc.id,
      title: svc.name,
      category: 'service',
      subtitle: svc.tagline,
    });
  };

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#182e5c] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#20a88a]" />
              <span>Comprehensive Travel Services · End-to-End Care</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#182e5c] tracking-tight leading-tight">
              We’ll help with <br />
              <span className="text-[#318bc6] italic font-serif font-light">the in-between.</span>
            </h2>
          </div>

          <p className="max-w-md text-slate-600 text-sm sm:text-base leading-relaxed">
            The little details shape the best journeys. Whether you need a standalone airport transfer,
            a private family tempo traveller across Kerala, or hotel reservations, we have you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TRAVEL_SERVICES.map((svc) => {
            const IconComp = ICON_MAP[svc.iconName] || Compass;
            return (
              <div
                key={svc.id}
                className={`bg-white rounded-3xl p-5 sm:p-7 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative ${
                  svc.badge
                    ? 'border-[#20a88a]/50 shadow-md hover:shadow-xl ring-1 ring-[#20a88a]/30'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${svc.color}15`,
                        color: svc.color,
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    {svc.badge && (
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#20a88a] bg-emerald-50 border border-[#20a88a]/30 px-2.5 py-1 rounded-full">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#182e5c] mb-2 group-hover:text-[#318bc6] transition-colors">
                    {svc.name}
                  </h3>

                  <p className="text-xs font-semibold text-slate-500 mb-3">
                    {svc.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-light">
                    {svc.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 pt-4 border-t border-slate-100 mb-6">
                    {svc.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#20a88a] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {svc.href ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={svc.href}
                        className="w-full py-2.5 bg-slate-100 hover:bg-[#182e5c] text-slate-800 hover:text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleEnquireService(svc)}
                        className="w-full py-2.5 bg-[#20a88a] hover:bg-[#198a71] text-white rounded-xl font-bold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        title={`Enquire about ${svc.name} on WhatsApp`}
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleEnquireService(svc)}
                      className="w-full py-3 bg-[#20a88a] hover:bg-[#198a71] text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                      title={`Enquire about ${svc.name} on WhatsApp`}
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Enquire on WhatsApp</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
