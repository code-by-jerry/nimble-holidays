import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { AyurvedaSection } from '@/components/AyurvedaSection';
import { WhatsAppEnquirySection } from '@/components/WhatsAppEnquirySection';
import { Sparkles, Heart, ShieldCheck, Check, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kerala Ayurveda & Wellness Retreats | Nimble Holidays',
  description:
    'Experience classical Kerala Ayurveda, Panchakarma detoxification, stress relief, and authentic rejuvenation courses under NABH-accredited medical supervision.',
};

export default function AyurvedaPage() {
  return (
    <>
      <PageHeader
        badge="Kerala Ayurveda & Wellness"
        badgeColor="#20a88a"
        breadcrumb="Ayurveda"
        title="Rest and renewal,"
        titleGradient="the authentic Kerala way."
        description="Kerala is the birthplace of classical Ayurveda. Experience personalized Vaidya consultations, warm medicated herbal oils, Satvik nutrition, and morning yoga beside quiet backwaters."
      />

      {/* Classical Principles Strip */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#20a88a] flex items-center justify-center font-bold mb-3">
                ✦
              </div>
              <h3 className="font-heading font-bold text-base text-[#182e5c] mb-1">
                Nadi Pariksha (Pulse Diagnosis)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Every stay begins with an extensive one-on-one pulse diagnosis with senior Ayurvedic Vaidyas to determine your unique Prakriti (body constitution) and imbalance (Vikriti).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#f89a2e] flex items-center justify-center font-bold mb-3">
                ✿
              </div>
              <h3 className="font-heading font-bold text-base text-[#182e5c] mb-1">
                Warm Medicated Herbal Oils
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Customized medicated oils boiled with authentic indigenous Kerala botanicals and roots (Kashayams and Thailams) for Abhyanga, Shirodhara, and Kizhi therapies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#318bc6] flex items-center justify-center font-bold mb-3">
                ☕
              </div>
              <h3 className="font-heading font-bold text-base text-[#182e5c] mb-1">
                Tailored Satvik Nutrition
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Fresh, organic vegetarian meals individually calibrated to your dosha, prepared with Kerala spices, red unpolished rice, coconut water, and herbal teas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main 4 Program Cards */}
      <AyurvedaSection />

      {/* Dynamic In-Page WhatsApp Enquiry Form (Appends Selected Ayurveda Programs) */}
      <WhatsAppEnquirySection
        sectionTitle="Ayurveda Wellness Consultation on WhatsApp"
        sectionSubtitle="Selected wellness programs are automatically appended below. Share your preferred dates, medical concerns, or room choices for a customized retreat quote via WhatsApp (+91 70929 36243)."
      />
    </>
  );
}
