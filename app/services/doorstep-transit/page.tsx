import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { DoorstepTransitSection } from '@/components/DoorstepTransitSection';
import { WhatsAppEnquirySection } from '@/components/WhatsAppEnquirySection';
import { CONTACT_INFO, getWhatsAppLink } from '@/data/contact';
import Link from 'next/link';
import {
  Home,
  Plane,
  Car,
  Users,
  ShieldCheck,
  HeartHandshake,
  Luggage,
  MapPin,
  Clock,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Doorstep-to-Doorstep Transit Care | Fly & Ride Home Safely | Nimble Holidays',
  description:
    'Complete end-to-end journey care from your origin abroad or outstation directly to your home doorstep. Flights, airport reception with placard, luggage support, and private chauffeur AC drop across Coimbatore, Kerala, and South India.',
};

const TRANSIT_FAQS = [
  {
    q: 'How does the Doorstep-to-Doorstep service work?',
    a: 'We coordinate your journey end-to-end. We can arrange your origin departure flight tickets (e.g. from Dubai, Abu Dhabi, Doha, Muscat, Singapore, etc.), track flight timing in real-time, have our representative wait at the arrival airport (Coimbatore, Cochin, Calicut, Trivandrum) with a name placard and luggage porter, and seat you directly into a private AC Innova Crysta or Sedan dedicated solely to drive you to your front gate.',
  },
  {
    q: 'Can this service be booked for elderly parents travelling alone?',
    a: 'Yes, this is one of our most requested arrangements. We coordinate wheelchair assistance at both departure and arrival airports, our team helps with trolley baggage, and our verified chauffeur drives gently and ensures your parents are safely welcomed inside their home before concluding the service. Relatives receive step-by-step WhatsApp updates throughout.',
  },
  {
    q: 'Which airports and home destinations do you cover?',
    a: 'We cover all major arrival hubs in South India including Coimbatore (CJB), Cochin (COK), Calicut (CCJ), Trivandrum (TRV), Kannur (CNN), Madurai (IXM), Trichy (TRZ), and Chennai (MAA). We drop passengers at homes throughout Tamil Nadu (Coimbatore, Tirupur, Erode, Pollachi) and Kerala (Palakkad, Thrissur, Mavelikkara, Ernakulam, Kottayam, Kollam, etc.).',
  },
  {
    q: 'Can I book only the airport chauffeur-to-home leg if I already have flight tickets?',
    a: 'Absolutely! If you have already booked your own airline tickets, you can customize the combo to include our Airport Meet & Greet + Private Chauffeur Vehicle directly to your home doorstep.',
  },
  {
    q: 'What vehicles are used for the home transfer?',
    a: 'For families and groups with international luggage (large trolley bags), we primarily use Toyota Innova Crystas and Force Urbania / Tempo Travellers. For solo travellers and couples, comfortable sanitized sedans and SUVs are available.',
  },
];

export default function DoorstepTransitPage() {
  return (
    <>
      <PageHeader
        badge="Flagship Combo Pack"
        badgeColor="#20a88a"
        breadcrumb="Services > Doorstep Transit"
        title="From Origin to Your"
        titleGradient="Home Doorstep."
        description="Whether travelling from Dubai to Coimbatore, or Riyadh to Mavelikkara, eliminate every travel friction. We handle your flights, arrival terminal greeting, luggage portering, and private chauffeur drop right to your home gate."
      />

      {/* Feature Highlights Grid */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#318bc6] flex items-center justify-center flex-shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Coordinated Flights</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light">
                  Direct & optimal GCC connections with verified 30kg-40kg luggage allowances.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#f89a2e] flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Terminal Reception</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light">
                  Name placard greeting right at the arrivals gate with trolley & porter support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#20a88a] flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Private Chauffeur Fleet</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light">
                  AC Innova Crysta or sedan exclusively for your family. Zero taxi queuing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#182e5c]">Front Gate Drop</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light">
                  Driver assists in unloading heavy suitcases right onto your home veranda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Configurator & Lead Submission Section */}
      <DoorstepTransitSection />

      {/* Target Audiences / Use Cases */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#20a88a] block mb-2">
              Tailored For Every Traveller
            </span>
            <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#182e5c]">
              Built to make long-distance transit effortless
            </h3>
            <p className="text-sm text-slate-600 mt-3 font-light leading-relaxed">
              International and outstation journeys are tiring. Our doorstep transit removes the anxiety of intermediate transfers so you arrive relaxed and safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#318bc6]/10 text-[#318bc6] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#182e5c] mb-2">
                  Expat Families with Children
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Managing multiple large suitcases, strollers, and tired children after a 4-hour flight is hard. Our Innova Crysta is pre-parked and ready at the curb with plenty of trunk space.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-[#20a88a] font-bold">
                ✓ Boot space for 4–6 international bags
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#20a88a]/10 text-[#20a88a] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#182e5c] mb-2">
                  Senior Citizens & Parents Alone
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  When parents travel alone to visit hometowns, we give sons and daughters complete peace of mind. Wheelchair assistance, porter loading, and patient drivers who carry bags right to the porch.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-[#20a88a] font-bold">
                ✓ Wheelchair & personal assistance
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#f89a2e]/10 text-[#f89a2e] flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#182e5c] mb-2">
                  Solo & Night Arrivals
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Many flights from the Gulf touch down between midnight and 4:00 AM. Avoid wandering through dark taxi ranks. Our vetted driver is waiting at the exit gate with full GPS tracking.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-[#20a88a] font-bold">
                ✓ 24/7 Verified night transfers
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#182e5c] mb-2">
                  Couples & Vacationers
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Heading directly from the airport to your private villa or ancestral estate? Enjoy cold mineral water, clean AC comfort, and smooth highway driving without stopping for tickets.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-[#20a88a] font-bold">
                ✓ Executive comfort & privacy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#182e5c] block mb-2">
              Got Questions?
            </span>
            <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#182e5c]">
              Doorstep Transit FAQs
            </h3>
          </div>

          <div className="space-y-4">
            {TRANSIT_FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <h4 className="font-heading font-bold text-base text-[#182e5c] mb-2 flex items-start gap-2">
                  <span className="text-[#20a88a] font-bold">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic WhatsApp Enquiry Tray */}
      <WhatsAppEnquirySection
        sectionTitle="Book Your Doorstep-to-Doorstep Journey on WhatsApp"
        sectionSubtitle="Chat directly with our Onattukara & Kerala desk at +91 70929 36243 for quick route pricing, flight options, and vehicle confirmations."
        defaultCategory="doorstep-transit"
      />
    </>
  );
}
