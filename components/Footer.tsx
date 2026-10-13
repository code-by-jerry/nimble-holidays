'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, Heart, Shield, ArrowUp } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO, getWhatsAppLink } from '@/data/contact';

export const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappHref = getWhatsAppLink(
    'Hello Nimble Holidays! I am contacting you from your website.'
  );

  return (
    <footer className="bg-[#09152b] text-white relative">
      {/* Spectrum Bar on Footer Top */}
      <div className="spectrum-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white p-1.5 shadow-lg flex-shrink-0 border border-white/20">
                <Image
                  src="/logo.jpg"
                  alt="Nimble Holidays Logo"
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white leading-tight">
                  NIMBLE <span className="text-[#318bc6]">HOLIDAYS</span>
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#83d6e8] font-bold block mt-1">
                  The World Is For Everyone
                </span>
                <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                  Since 2010 · Onattukara, Kerala
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light">
              Born in 2010 in Onattukara, Mavelikkara, Kerala. We enable travellers from India and the GCC
              to discover destinations, assemble custom trip lists, and receive bespoke quotations with human care.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#42bfd8] flex-shrink-0 mt-0.5" />
                <span>Onattukara, Mavelikkara, Alappuzha District, Kerala 690101, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#20a88a] flex-shrink-0" />
                <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-[#34d399] font-medium"
                >
                  WhatsApp: {CONTACT_INFO.whatsappDisplay} (24/7 Desk)
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Destinations */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 text-[#83d6e8]">
              Featured Destinations
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Alleppey Backwaters & Houseboats
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Munnar Tea Hills & Kolukkumalai
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Varkala Cliff & Sunset Beaches
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Thekkady & Periyar Wildlife Safari
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Kashmir Valley & Snowfields
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Dubai Skyline & Desert Safaris
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-[#83d6e8] hover:underline font-bold pt-1 block">
                  Browse All Destinations (12+) →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services & GCC */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 text-[#f5d64c]">
              Specialized Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/ayurveda" className="hover:text-white transition-colors">
                  Kerala Ayurveda Rejuvenation
                </Link>
              </li>
              <li>
                <Link href="/flights" className="hover:text-white transition-colors">
                  Saudi Arabia & GCC Flight Assistance
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition-colors">
                  Curated Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Chauffeur Fleet & Vehicle Rentals
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Visas, Stays & Forex Assistance
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How Booking With Us Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Timings */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 text-[#f89a2e]">
              Service Desks
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <strong className="text-white block">Kerala Head Office</strong>
                <span className="text-slate-400">9:00 AM – 7:30 PM IST (Mon–Sat)</span>
              </div>
              <div>
                <strong className="text-white block">GCC Client Desk</strong>
                <span className="text-slate-400">Available on WhatsApp 24/7</span>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 text-xs text-[#83d6e8] hover:text-white font-bold transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to top</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} <strong>Nimble Holidays</strong>. All rights reserved. Registered in Kerala, India.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Our Story & Vision
            </Link>
            <Link href="/how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
