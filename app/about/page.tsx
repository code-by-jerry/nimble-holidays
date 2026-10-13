import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Heart,
  Shield,
  Users,
  Award,
  Sparkles,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  MessageSquare,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { CONTACT_INFO, getWhatsAppLink } from '@/data/contact';

export const metadata: Metadata = {
  title: 'Our Story & Heritage | Nimble Holidays Since 2010',
  description:
    'Learn how Nimble Holidays began in 2010 in Onattukara, Mavelikkara, Kerala, with the founding conviction that "The World Is for Everyone" — serving India and the GCC.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="Established 2010 · Onattukara, Kerala"
        badgeColor="#f89a2e"
        breadcrumb="Our Story"
        title="The world is"
        titleGradient="for everyone."
        description="Founded in the culturally historic heart of Onattukara, Mavelikkara, Kerala. Over 14+ years, we have guided thousands of travellers across India and the GCC with deep native hospitality and authentic human care."
      />

      {/* Main Narrative & Story Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] sm:aspect-[16/11] bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85"
                  alt="Kerala backwaters and Munnar tea estate mist"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09152b]/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#42bfd8] block mb-1">
                    God’s Own Country
                  </span>
                  <h4 className="font-heading font-extrabold text-lg sm:text-xl leading-tight">
                    Onattukara, Mavelikkara to the World
                  </h4>
                </div>
              </div>

              {/* Milestone Mini-Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-heading font-extrabold text-2xl text-[#182e5c]">2010</div>
                  <span className="text-[11px] text-slate-500 font-medium">Founded Year</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-heading font-extrabold text-2xl text-[#20a88a]">10k+</div>
                  <span className="text-[11px] text-slate-500 font-medium">Happy Travelers</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-heading font-extrabold text-2xl text-[#f89a2e]">100%</div>
                  <span className="text-[11px] text-slate-500 font-medium">Bespoke Plans</span>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-[#182e5c] block mb-2">
                Our Genesis & Philosophy
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#182e5c] tracking-tight leading-tight mb-6">
                Travel without intimidation, hidden costs, or rigid packages.
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-8">
                <p>
                  <strong>Nimble Holidays</strong> was conceived in 2010 in <strong>Onattukara, Mavelikkara, Kerala</strong> — a region renowned for its ancient chettikulangara traditions, agricultural fertility, and hospitable warmth.
                </p>
                <p>
                  When we began, travel planning was dominated by two extremes: expensive corporate tour operators locking families into rigid 40-person coach itineraries, or complex online engines that left travellers with zero support when flights were delayed or rooms fell short of photos.
                </p>
                <p>
                  We set out with an unshakeable belief:{' '}
                  <strong className="text-[#182e5c]">“The World Is for Everyone.”</strong> We built a personalized model where travellers can pick destinations like choosing items from a boutique shelf, receive human-crafted day-wise itineraries, and communicate directly with real destination experts on WhatsApp.
                </p>
                <p>
                  Today, we are honored to serve thousands of travelers annually, with a special bond serving the Malayali diaspora and expatriate families residing in Saudi Arabia, UAE, Qatar, Kuwait, Oman, and Bahrain who look forward to returning home to Kerala in supreme comfort.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 bg-[#182e5c] hover:bg-[#203a72] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#f89a2e]" />
                  <span>Explore Our Destinations</span>
                  <ArrowRight className="w-4 h-4 text-[#42bfd8]" />
                </Link>
                <a
                  href={getWhatsAppLink('Hello Nimble Holidays, I would like to know more about your services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#20a88a] hover:text-[#198a71] font-semibold text-sm px-4 py-3"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect With Our Team (+91 70929 36243) ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Guiding Pillars */}
      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#182e5c] block mb-2">
              Our Principles
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#182e5c]">
              What We Stand For
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
              Every decision at Nimble Holidays is anchored by four fundamental commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#318bc6] flex items-center justify-center font-bold mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#182e5c] mb-2">
                1. Universal Accessibility
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Travel should never feel elitist or overwhelming. We build options for budget backpackers, multigenerational families, and luxury seekers alike.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#20a88a] flex items-center justify-center font-bold mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#182e5c] mb-2">
                2. Authentic Native Insight
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                We aren&apos;t sitting in a faraway call center. We live and breathe Kerala, knowing the best quiet backwater canals, village tea stalls, and seasonal weather windows.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#f89a2e] flex items-center justify-center font-bold mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#182e5c] mb-2">
                3. GCC Family Empathy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                We understand flight timings, excess luggage needs, halal dining preferences, and family vehicle comfort required by travellers originating from Saudi Arabia & the UAE.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#182e5c] mb-2">
                4. Human Hospitality
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                No automated conversational loops or unanswered emails. A real travel partner holds your hand from quote generation until you arrive safely home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kerala Headquarters & Contact Desk */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#122448] text-white rounded-3xl p-8 sm:p-12 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#42bfd8] block mb-2">
                  Visit or Contact Our Head Office
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-4">
                  Onattukara Travel Desk
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                  Planning a vacation or returning home to God’s Own Country? Drop into our Mavelikkara desk or connect directly with our travel consultants.
                </p>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#42bfd8] flex-shrink-0 mt-0.5" />
                    <span>Nimble Holidays, Onattukara, Mavelikkara, Alappuzha District, Kerala 690101, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#20a88a] flex-shrink-0" />
                    <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#f5d64c] flex-shrink-0" />
                    <a href="mailto:info@nimbleholidays.com" className="hover:text-white transition-colors">
                      info@nimbleholidays.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#f89a2e] flex-shrink-0" />
                    <span>Monday – Saturday: 9:00 AM – 8:00 PM IST (WhatsApp 24/7)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-bold text-lg text-white mb-2">
                    Direct WhatsApp Helpline
                  </h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                    Connect directly with an itinerary specialist for instant quotation requests, customized hotel upgrades, or flight inquiries.
                  </p>
                </div>

                <a
                  href={getWhatsAppLink('Hello Nimble Holidays, I am contacting you from your About page.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#20a88a] hover:bg-[#198a71] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Start Chat on WhatsApp (+91 70929 36243)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
