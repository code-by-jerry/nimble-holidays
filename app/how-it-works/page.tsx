'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { HowItWorks } from '@/components/HowItWorks';
import Link from 'next/link';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  PhoneCall,
  Clock,
  HeartHandshake,
} from 'lucide-react';
import { getWhatsAppLink } from '@/data/contact';

const FAQS = [
  {
    q: 'How does the "Add to Trip" e-commerce concept work?',
    a: 'Just like shopping online! While exploring destinations or ready packages, click the "+ Add to Trip" button. Your chosen places collect in your trip drawer. When ready, tell us your dates, group size, and stay preferences, and we generate a personalized itinerary quotation.',
  },
  {
    q: 'How quickly will I receive my custom quotation?',
    a: 'Most quotations for Kerala and India are sent to your WhatsApp within 2 to 4 hours during working hours. For complex international or multi-city GCC itineraries, our travel team prepares day-wise options within 12 to 24 hours.',
  },
  {
    q: 'Can I swap hotels, change vehicle types, or adjust nights?',
    a: 'Yes, 100%! We believe "The World Is for Everyone" without rigid package constraints. You can upgrade to a private pool villa in Munnar, choose a 2-bedroom luxury houseboat in Alleppey, or switch from an Innova to an Urbania van at any stage.',
  },
  {
    q: 'What if our travel dates change after booking?',
    a: 'We understand that work and family schedules in India and the GCC can shift. We work closely with our contracted properties and fleet to accommodate date adjustments smoothly without predatory cancellation penalties.',
  },
  {
    q: 'Is there a real human coordinator assisting us during the trip?',
    a: 'Always. Unlike impersonal automated booking websites, you are connected directly with a senior Nimble Holidays trip coordinator. From your airport arrival name placard to daily check-ins, our team is available 24/7 on WhatsApp and phone call.',
  },
  {
    q: 'How are payments handled securely?',
    a: 'We provide clear, itemized GST invoices and accept official bank transfers, UPI, and international wire payments with formal booking receipts. We usually require a modest booking advance with balanced stages, giving you peace of mind.',
  },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <PageHeader
        badge="Simple & Transparent"
        badgeColor="#42bfd8"
        breadcrumb="How It Works"
        title="Travel planned around you,"
        titleGradient="not the other way around."
        description="No rigid group buses, no confusing booking engines. Pick the destinations that excite you, share a few preferences, and let our Kerala destination specialists craft your personalized vacation."
      />

      {/* The 4-Step Interactive Process */}
      <HowItWorks />

      {/* Trust & Peace of Mind Pillars */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#20a88a] block mb-2">
              Why Travellers Trust Nimble
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#182e5c]">
              Built on 14+ years of real hospitality
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
              Founded in Onattukara, Kerala in 2010. We treat your family trip with the same care we would give our own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#318bc6] flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#182e5c] mb-2">
                Real-Time WhatsApp Access
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                No long automated IVR queues or endless support tickets. Chat directly with the human specialists managing your itinerary before, during, and after your holiday.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#20a88a] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#182e5c] mb-2">
                Inspected Stays & Vehicles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                We refuse to book generic blind-inventory hotels. Every resort, heritage villa, backwater houseboat, and chauffeur vehicle is vetted for pristine cleanliness.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#f89a2e] flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#182e5c] mb-2">
                Fair & Transparent Pricing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                We present honest, itemized quotations with zero hidden surprises at checkout. Direct contractor rates passed on directly to your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#182e5c] mb-2">
              <HelpCircle className="w-4 h-4 text-[#318bc6]" />
              <span>Got Questions?</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#182e5c]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
              Everything you need to know about planning and confirming your trip with Nimble Holidays.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-[#182e5c] hover:text-[#318bc6] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#318bc6]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Box */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-heading font-bold text-sm text-[#182e5c]">
                Have a unique question not answered here?
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Our Onattukara travel desk is available for immediate consultation.
              </p>
            </div>
            <a
              href={getWhatsAppLink('Hello Nimble Holidays, I have a question about booking a trip.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#20a88a] hover:bg-[#198a71] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp (+91 70929 36243)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Ready to Begin Banner */}
      <section className="bg-[#182e5c] text-white py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#42bfd8] block mb-1">
              Start Now
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Ready to pick your dream destinations?
            </h3>
            <p className="text-sm text-slate-300 font-light mt-1">
              Explore 12+ iconic Kerala, Indian, and international getaways.
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-white text-[#182e5c] hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#f89a2e]" />
            <span>Browse Destinations Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#318bc6]" />
          </Link>
        </div>
      </section>
    </>
  );
}
