import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { TourPackages } from '@/components/TourPackages';
import Link from 'next/link';
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

import { WhatsAppEnquirySection } from '@/components/WhatsAppEnquirySection';
import { CONTACT_INFO, getWhatsAppLink } from '@/data/contact';

export const metadata: Metadata = {
  title: 'Curated Tour Packages | Nimble Holidays',
  description:
    'Explore curated holiday itineraries across Kerala, Royal Rajasthan, and international escapes. Load any package into your trip planner and personalize every stay.',
};

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        badge="Ready Starting Points"
        badgeColor="#f89a2e"
        breadcrumb="Tour Packages"
        title="Good trips start"
        titleGradient="with a feeling."
        description="Need inspiration or prefer a tried-and-tested route? Browse our curated itineraries. Tap 'Customise This Package' to load its destinations into your trip list and adjust hotels, nights, or activities."
      />

      <TourPackages />

      {/* Dynamic In-Page WhatsApp Enquiry Form (Appends Selected Packages) */}
      <WhatsAppEnquirySection
        sectionTitle="Enquire Tour Packages on WhatsApp"
        sectionSubtitle="Selected holiday packages and custom destinations are automatically appended below. Complete your group details and receive a transparent quotation on WhatsApp (+91 70929 36243)."
      />

      {/* Package Customization Banner */}
      <section className="bg-[#0b1a36] text-white py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-[#13264b] border border-white/10 p-8 sm:p-10 rounded-3xl">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5d64c] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Flexible Travel</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3">
                Want a route that isn&apos;t listed here?
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                Tell our travel team your wishlist destinations, family group requirements, and preferred hotel tiers. We assemble day-wise custom itineraries with private chauffeur vehicles.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 bg-white text-[#182e5c] hover:bg-slate-100 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all"
                >
                  <span>Build From Scratch</span>
                  <ArrowRight className="w-4 h-4 text-[#318bc6]" />
                </Link>
                <a
                  href={getWhatsAppLink('Hello Nimble Holidays, I would like to customize a tour package.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-semibold px-4 py-3 text-xs sm:text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with an Itinerary Specialist (+91 70929 36243) ↗</span>
                </a>
              </div>
            </div>

            <div className="space-y-3.5 bg-white/5 border border-white/10 p-6 rounded-2xl text-xs text-slate-300">
              <div className="flex items-center gap-2.5 font-bold text-white text-sm pb-2 border-b border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#20a88a]" />
                <span>Why Travelers Love Our Packages</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#42bfd8] font-bold">✓</span>
                <span>Private dedicated air-conditioned vehicles (Innova Crysta, Tempo Travellers)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#20a88a] font-bold">✓</span>
                <span>Verified family-safe hotels, traditional backwater houseboats & tea estate cottages</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#f5d64c] font-bold">✓</span>
                <span>Dedicated on-trip human coordinator via direct WhatsApp 24/7</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#f89a2e] font-bold">✓</span>
                <span>Zero rigid cancellation intimidation — flexible reschedule policies</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
