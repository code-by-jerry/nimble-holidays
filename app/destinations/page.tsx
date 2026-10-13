import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { DestinationCatalog } from '@/components/DestinationCatalog';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

import { WhatsAppEnquirySection } from '@/components/WhatsAppEnquirySection';

export const metadata: Metadata = {
  title: 'Destinations & Experiences | Nimble Holidays',
  description:
    'Browse destinations like shopping online. Pick Kerala backwaters, misty high ranges, royal palaces, or international escapes, and assemble your dream trip list.',
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        badge="E-Commerce Discovery"
        badgeColor="#318bc6"
        breadcrumb="Destinations"
        title="Places worth"
        titleGradient="getting lost in."
        description="Browse Kerala, India, and handpicked international getaways. Tap '+ Add to Trip' on any destination or experience to build your personalized itinerary list."
      />

      <DestinationCatalog />

      {/* Dynamic In-Page WhatsApp Enquiry Form (Appends Selected Destinations) */}
      <WhatsAppEnquirySection
        sectionTitle="Enquire Destinations on WhatsApp"
        sectionSubtitle="Selected destinations are automatically appended below. Complete your group details and receive a transparent quotation on WhatsApp (+91 70929 36243)."
      />

      {/* Next Step Banner */}
      <section className="bg-[#182e5c] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#42bfd8] block mb-1">
              Ready with your list?
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Turn your selected places into a handcrafted itinerary
            </h3>
            <p className="text-sm text-slate-300 font-light mt-1">
              Share dates and budget preferences to receive a transparent quotation on WhatsApp.
            </p>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-white text-[#182e5c] hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#f89a2e]" />
            <span>Explore Ready Packages</span>
            <ArrowRight className="w-4 h-4 text-[#318bc6]" />
          </Link>
        </div>
      </section>
    </>
  );
}
