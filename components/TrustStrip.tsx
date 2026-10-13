'use client';

import React from 'react';
import { ShieldCheck, Compass, HeartHandshake, MessageCircle } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustPoints = [
    {
      icon: ShieldCheck,
      title: 'Since 2010 in Kerala',
      subtitle: '14+ years of grounded experience in Onattukara, Mavelikkara.',
      color: '#318bc6',
    },
    {
      icon: Compass,
      title: 'Select Like Shopping',
      subtitle: 'Pick places & experiences into your trip cart at your pace.',
      color: '#20a88a',
    },
    {
      icon: HeartHandshake,
      title: 'GCC & Saudi Friendly',
      subtitle: 'Flight desks, spacious family fleet & personalized comforts.',
      color: '#f89a2e',
    },
    {
      icon: MessageCircle,
      title: 'Real Human Quotations',
      subtitle: 'No complex booking engines. Clear, fast quotes on WhatsApp.',
      color: '#ed373b',
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200/90 py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {trustPoints.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-3.5 p-2 sm:p-0 ${
                  idx !== 0 ? 'lg:border-l lg:border-slate-200 lg:pl-8' : ''
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#182e5c] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
