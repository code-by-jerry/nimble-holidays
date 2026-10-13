import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { TRAVEL_SERVICES } from '@/data/services';
import { CONTACT_INFO, getWhatsAppLink } from '@/data/contact';
import { WhatsAppEnquirySection } from '@/components/WhatsAppEnquirySection';
import { DoorstepTransitSection } from '@/components/DoorstepTransitSection';
import Link from 'next/link';
import {
  Plane,
  Building,
  Car,
  Sparkles,
  Compass,
  Users,
  CreditCard,
  FileCheck2,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageSquare,
  Clock,
  PhoneCall,
  Home,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Comprehensive Travel & Concierge Services | Nimble Holidays',
  description:
    'End-to-end travel services from Kerala since 2010. Flight bookings, private chauffeur fleet, verified luxury stays, Ayurveda wellness, visa guidance, and corporate group tours.',
};

const ADDITIONAL_SERVICES = [
  {
    id: 'svc-visas',
    name: 'Visa & Immigration Guidance',
    tagline: 'Streamlined tourist & visitor visa documentation',
    description:
      'Navigating embassy requirements, digital photo specifications, and documentation checks for UAE, Saudi Arabia, Schengen, UK, Singapore, Thailand, and Malaysia.',
    icon: FileCheck2,
    features: [
      'Document pre-scrutiny by specialists',
      'Fast-track UAE & GCC eVisa applications',
      'Appointment scheduling & fee payment assistance',
      'High approval success rate with zero guesswork',
    ],
    color: '#318bc6',
  },
  {
    id: 'svc-forex',
    name: 'Forex & Travel Insurance',
    tagline: 'Competitive foreign currency exchange & zero-deductible insurance',
    description:
      'Doorstep foreign currency notes, international multi-currency debit cards, and comprehensive cashless overseas travel medical insurance protecting against flight delays, loss of baggage, and health emergencies.',
    icon: CreditCard,
    features: [
      'Zero-markup rate consultation on major currencies',
      'Multi-currency contactless cards for GCC & Europe',
      'Cashless hospitalization coverage worldwide',
      'Compensation for flight cancellations & lost baggage',
    ],
    color: '#20a88a',
  },
];

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Plane,
  Building,
  Car,
  Sparkles,
  Compass,
  Users,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="End-to-End Concierge"
        badgeColor="#318bc6"
        breadcrumb="Services"
        title="We’ll help with"
        titleGradient="all the in-between."
        description="A great holiday is more than just destinations. From punctual airport chauffeurs and inspected heritage hotels to GCC flight ticketing and Vaidya-guided Ayurveda, we manage every layer with personal warmth."
      />

      {/* Services Value Proposition Bar */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#318bc6] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">24/7 Direct Coordination</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light">
                  A dedicated human coordinator assigned to your trip, reachable anytime via WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#20a88a] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Inspected Quality</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light">
                  Every hotel, houseboat, and vehicle is physically inspected to guarantee safety & cleanliness.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#f89a2e] flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Private Chauffeur Fleet</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light">
                  Polite, verified drivers with modern AC Innova Crystas, Fortuners, and Tempo Travellers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Transparent Quotations</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light">
                  No hidden platform charges or inflated surcharges. Clear, itemized WhatsApp quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Services Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#182e5c] block mb-2">
              Core Offerings
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#182e5c]">
              Tailored services for individual & family travellers
            </h2>
            <p className="text-sm text-slate-600 mt-3 font-light leading-relaxed">
              Whether you need a standalone service like airport pickup or a full turnkey vacation package, our team handles each requirement with utmost diligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TRAVEL_SERVICES.map((svc) => {
              const IconComp = ICON_MAP[svc.iconName] || Compass;
              const isDoorstep = svc.id === 'svc-doorstep-transit';
              const isFlights = svc.id === 'svc-flights';
              const isAyurveda = svc.id === 'svc-ayurveda';

              return (
                <div
                  key={svc.id}
                  className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative ${
                    isDoorstep
                      ? 'border-[#20a88a]/50 shadow-md hover:shadow-xl ring-2 ring-[#20a88a]/20'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${svc.color}15`,
                          color: svc.color,
                        }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      {svc.badge && (
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#20a88a] bg-emerald-50 border border-[#20a88a]/30 px-3 py-1 rounded-full">
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

                    {/* Features */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                      {svc.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-[#20a88a] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    {isDoorstep ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/services/doorstep-transit"
                          className="w-full py-3 bg-[#182e5c] hover:bg-[#203a72] text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span>Plan Route</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#42bfd8]" />
                        </Link>
                        <a
                          href={getWhatsAppLink('Hello Nimble Holidays, I would like a quote for Doorstep-to-Doorstep Transit Care.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-[#20a88a] hover:bg-[#198a71] text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    ) : isFlights ? (
                      <Link
                        href="/flights"
                        className="w-full py-3 bg-[#182e5c] hover:bg-[#203a72] text-white rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>Open Flight Ticketing Desk</span>
                        <ArrowRight className="w-4 h-4 text-[#42bfd8]" />
                      </Link>
                    ) : isAyurveda ? (
                      <Link
                        href="/ayurveda"
                        className="w-full py-3 bg-[#20a88a] hover:bg-[#198a71] text-white rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>Explore Ayurveda Retreats</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </Link>
                    ) : (
                      <a
                        href={getWhatsAppLink(`Hello Nimble Holidays, I would like to enquire about: ${svc.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-slate-100 hover:bg-[#182e5c] text-slate-700 hover:text-white rounded-xl font-bold text-xs sm:text-sm border border-slate-200 hover:border-[#182e5c] transition-all flex items-center justify-center gap-2 group-hover:border-[#182e5c]"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span>Enquire on WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Additional Services: Visas & Forex */}
            {ADDITIONAL_SERVICES.map((svc) => {
              const IconComp = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        backgroundColor: `${svc.color}15`,
                        color: svc.color,
                      }}
                    >
                      <IconComp className="w-6 h-6" />
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

                    {/* Features */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                      {svc.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-[#20a88a] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={getWhatsAppLink(`Hello Nimble Holidays, I would like guidance on: ${svc.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-slate-100 hover:bg-[#182e5c] text-slate-700 hover:text-white rounded-xl font-bold text-xs sm:text-sm border border-slate-200 hover:border-[#182e5c] transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Ask For Details</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doorstep-to-Doorstep Transit Care Flagship Combo Section */}
      <DoorstepTransitSection />

      {/* Fleet & Chauffeur Focus Strip */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#102347] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f5d64c] block mb-2">
                Kerala Airport & Outstation Fleet
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mb-4 leading-tight">
                Punctual Chauffeur Rentals Across South India
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-8">
                Arriving into Cochin (COK), Trivandrum (TRV), Calicut (CCJ), or Kannur (CNN)? Our courteous, experienced drivers wait at the arrivals gate with your personalized name placard. All vehicles are sanitised, air-conditioned, and maintained to the highest safety standards.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 text-xs text-slate-200">
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <div className="font-bold text-white text-sm mb-1">Toyota Innova Crysta</div>
                  <span>Ideal for families (4–6 pax)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <div className="font-bold text-white text-sm mb-1">Force Urbania & Tempo</div>
                  <span>Large groups (10–17 pax)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <div className="font-bold text-white text-sm mb-1">Sedans & SUVs</div>
                  <span>Couples & business executives</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={getWhatsAppLink('Hello Nimble Holidays, I would like to book a chauffeur vehicle transfer.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#20a88a] hover:bg-[#198a71] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reserve Vehicle on WhatsApp</span>
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold text-sm px-4 py-3"
                >
                  <PhoneCall className="w-4 h-4 text-[#42bfd8]" />
                  <span>Call Desk: {CONTACT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic In-Page WhatsApp Enquiry Form */}
      <WhatsAppEnquirySection
        sectionTitle="Enquire Services & Chauffeur Fleet on WhatsApp"
        sectionSubtitle="Need airport pickup, Innova Crysta rentals, hotel bookings, or visa guidance? Send your requirements directly to +91 70929 36243."
      />

      {/* Cross link to Planner */}
      <section className="bg-slate-900 text-white py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#42bfd8] block mb-1">
              Multi-Service Packages
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Bundle flights, stays & transport into one custom quote
            </h3>
            <p className="text-sm text-slate-300 font-light mt-1">
              Save time and avoid multiple vendors. Get an all-inclusive single quotation.
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-white text-[#182e5c] hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md whitespace-nowrap"
          >
            <span>Start Building Your Trip</span>
            <ArrowRight className="w-4 h-4 text-[#318bc6]" />
          </Link>
        </div>
      </section>
    </>
  );
}
