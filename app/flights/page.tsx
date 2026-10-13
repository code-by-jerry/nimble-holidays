import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { FlightBookingSection } from '@/components/FlightBookingSection';
import { Plane, ShieldCheck, Luggage, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Flight Booking Assistance | GCC to Kerala & India | Nimble Holidays',
  description:
    'Dedicated flight assistance for travelers from Saudi Arabia, UAE, Qatar, and the GCC. Compare routes, seat selections, and receive instant fare options on WhatsApp.',
};

export default function FlightsPage() {
  return (
    <>
      <PageHeader
        badge="Flight Ticketing Desk"
        badgeColor="#318bc6"
        breadcrumb="Flights"
        title="Need a ticket?"
        titleGradient="Let’s get you there."
        description="Direct airline fares, seat selection, extra baggage allowances, and convenient flight timings between Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain, and all major Indian airports."
      />

      {/* Flight Highlights Strip */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#318bc6] flex items-center justify-center flex-shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Direct GCC Routes</h4>
                <p className="text-xs text-slate-500 mt-0.5">Riyadh, Jeddah, Dubai, Dammam, Doha to Kochi & Trivandrum.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#f89a2e] flex items-center justify-center flex-shrink-0">
                <Luggage className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">30kg–40kg Baggage</h4>
                <p className="text-xs text-slate-500 mt-0.5">Assistance with family luggage allowances & excess baggage pre-booking.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#20a88a] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Fast Fare Quotes</h4>
                <p className="text-xs text-slate-500 mt-0.5">Direct quotes delivered straight to your WhatsApp within minutes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Date Change Support</h4>
                <p className="text-xs text-slate-500 mt-0.5">Human assistance for flight re-scheduling without confusing call centers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Booking Section Form */}
      <FlightBookingSection />
    </>
  );
}
