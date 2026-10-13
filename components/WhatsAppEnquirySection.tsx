'use client';

import React, { useState, useEffect } from 'react';
import { useTrip, EnquiryItem } from '@/context/TripContext';
import { CONTACT_INFO, getWhatsAppLink } from '@/data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Send,
  Calendar,
  Users,
  CheckCircle2,
  Trash2,
  Copy,
  Check,
  Building,
  Sparkles,
  ShieldCheck,
  X,
  Plus,
  MessageSquare,
  Clock,
  Compass,
} from 'lucide-react';

const COUNTRY_DIAL_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
];

interface WhatsAppEnquirySectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  defaultCategory?: string;
}

export const WhatsAppEnquirySection: React.FC<WhatsAppEnquirySectionProps> = ({
  sectionTitle = 'Enquire on WhatsApp',
  sectionSubtitle = 'Send your chosen services & travel preferences directly to our team at +91 70929 36243 for an immediate handcrafted quotation.',
  defaultCategory,
}) => {
  const {
    enquiryItems,
    removeEnquiryItem,
    clearEnquiryItems,
    lastAddedNotification,
    clearNotification,
    selectedDestinations,
  } = useTrip();

  // Form Fields
  const [name, setName] = useState('');
  const [dialCode, setDialCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFlexible, setIsFlexible] = useState(false);
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [accommodation, setAccommodation] = useState('Premium 4-Star');
  const [notes, setNotes] = useState('');

  // Status & Success state (In-page dynamic render, NO popup modal)
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto-fill selected destinations into enquiry items if enquiry items are empty but user has destinations
  const allEnquiredTitles = [
    ...enquiryItems.map((i) => i.title),
    ...selectedDestinations
      .filter((d) => !enquiryItems.some((ei) => ei.id === d.id))
      .map((d) => d.name),
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Please enter your name so our travel coordinator can address you.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 6) {
      setFormError('Please enter a valid WhatsApp or contact number.');
      return;
    }

    const ref = `NH-WA-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    const fullPhone = `${dialCode} ${phone.trim()}`;

    const datesText = isFlexible
      ? startDate
        ? `Flexible (Around ${startDate})`
        : 'Dates are Flexible'
      : startDate && endDate
      ? `${startDate} to ${endDate}`
      : startDate
      ? `Starting ${startDate}`
      : 'Dates to be finalized';

    const itemsSummary =
      allEnquiredTitles.length > 0
        ? allEnquiredTitles.map((t) => `  • ${t}`).join('\n')
        : '  • General Custom Trip Consultation';

    const messageLines = [
      `🌴 *Nimble Holidays WhatsApp Enquiry* (${ref})`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*Selected Services / Packages / Places:*`,
      itemsSummary,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*Traveller Details:*`,
      `• *Lead Traveller:* ${name.trim()}`,
      `• *WhatsApp / Phone:* ${fullPhone}`,
      `• *Travel Dates:* ${datesText}`,
      `• *Group Size:* ${adults} Adult(s)${Number(children) > 0 ? `, ${children} Child(ren)` : ''}`,
      `• *Stay Category:* ${accommodation}`,
      notes.trim() ? `• *Special Notes / Requests:*\n  ${notes.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Official Nimble Holidays Desk: +91 70929 36243_`,
      `_Please prepare our transparent quotation & itinerary._`,
    ]
      .filter(Boolean)
      .join('\n');

    setSubmittedMessage(messageLines);

    // Asynchronously log lead to API (ready for Google Sheets & email lead tracking)
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        phone: fullPhone,
        serviceCategory: defaultCategory || (allEnquiredTitles.length > 0 ? 'custom-trip' : 'general'),
        serviceTitle: allEnquiredTitles.join(', ') || 'Custom Vacation Request',
        adults,
        children,
        travelDate: datesText,
        accommodationTier: accommodation,
        notes: notes.trim(),
        channel: 'whatsapp',
      }),
    }).catch((err) => console.warn('Lead capture async error:', err));

    // Generate WhatsApp direct URL
    const waUrl = getWhatsAppLink(messageLines);

    // Open WhatsApp in new tab/window
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    if (!submittedMessage) return;
    navigator.clipboard.writeText(submittedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="whatsapp-enquiry" className="py-16 sm:py-20 lg:py-24 bg-[#10234a] text-white relative">
      <div id="trip-planner" className="scroll-mt-28" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#42bfd8] mb-3">
            <WhatsAppIcon className="w-4 h-4 text-[#20a88a]" />
            <span>Direct WhatsApp Quotation Desk · +91 70929 36243</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Dynamic In-Page Notification (NO popup modal! Renders smoothly in-page) */}
        {lastAddedNotification && (
          <div className="bg-gradient-to-r from-[#20a88a]/20 via-[#182e5c]/80 to-[#20a88a]/20 border-2 border-[#20a88a] rounded-2xl p-4 sm:p-5 mb-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#20a88a] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Added to Enquiry List
                  </span>
                  <span className="text-xs text-slate-300">Desk: +91 70929 36243</span>
                </div>
                <h4 className="font-heading font-extrabold text-base sm:text-lg text-white mt-0.5">
                  {lastAddedNotification.title}
                </h4>
                <p className="text-xs text-slate-200 font-light mt-0.5">
                  Appended into your enquiry below. Review your selections, fill your details, and submit to send directly to WhatsApp.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => clearNotification()}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors self-end sm:self-center cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-7 bg-[#142c5c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Items Tray */}
              <div className="bg-[#0b1a38] border border-white/10 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-[#42bfd8] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#f5d64c]" />
                    <span>Selected Services / Places ({allEnquiredTitles.length})</span>
                  </span>
                  {allEnquiredTitles.length > 0 && (
                    <button
                      type="button"
                      onClick={() => clearEnquiryItems()}
                      className="text-[11px] text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {allEnquiredTitles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {enquiryItems.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1.5 text-xs bg-[#20a88a]/20 border border-[#20a88a]/50 text-emerald-200 px-3 py-1.5 rounded-xl font-medium"
                      >
                        <span>{item.title}</span>
                        <button
                          type="button"
                          onClick={() => removeEnquiryItem(item.id)}
                          className="hover:text-white transition-colors"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    {selectedDestinations
                      .filter((d) => !enquiryItems.some((ei) => ei.id === d.id))
                      .map((dest) => (
                        <span
                          key={dest.id}
                          className="inline-flex items-center gap-1.5 text-xs bg-[#42bfd8]/20 border border-[#42bfd8]/50 text-sky-200 px-3 py-1.5 rounded-xl font-medium"
                        >
                          <span>{dest.name}</span>
                        </span>
                      ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 font-light flex items-center gap-2 py-1">
                    <Compass className="w-4 h-4 text-slate-500" />
                    <span>No specific card picked yet. Click &quot;Enquire on WhatsApp&quot; on any card above or describe your needs below.</span>
                  </div>
                )}
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Full Name <span className="text-[#ed373b]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Menon / Mohammed Al-Harbi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0b1a38] border border-white/15 focus:border-[#42bfd8] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    WhatsApp Number <span className="text-[#ed373b]">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={dialCode}
                      onChange={(e) => setDialCode(e.target.value)}
                      className="bg-[#0b1a38] border border-white/15 text-white text-xs rounded-xl px-2.5 py-3 focus:outline-none focus:border-[#42bfd8]"
                    >
                      {COUNTRY_DIAL_CODES.map((d) => (
                        <option key={d.code} value={d.code} className="bg-[#10234a] text-white">
                          {d.flag} {d.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder="70929 36243"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-[#0b1a38] border border-white/15 focus:border-[#42bfd8] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Travel Dates
                  </label>
                  <input
                    type="date"
                    disabled={isFlexible}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#0b1a38] border border-white/15 focus:border-[#42bfd8] rounded-xl px-4 py-3 text-sm text-white disabled:opacity-40 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer bg-[#0b1a38] border border-white/15 px-4 py-3 rounded-xl hover:border-white/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={isFlexible}
                      onChange={(e) => setIsFlexible(e.target.checked)}
                      className="w-4 h-4 rounded text-[#20a88a] focus:ring-0"
                    />
                    <span className="text-xs font-medium text-slate-300">My Travel Dates Are Flexible</span>
                  </label>
                </div>
              </div>

              {/* Group Size & Stay Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Travellers
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      className="bg-[#0b1a38] border border-white/15 text-white text-xs rounded-xl px-3 py-3 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, '12+'].map((n) => (
                        <option key={n} value={n} className="bg-[#10234a]">
                          {n} Adult{n !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    <select
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      className="bg-[#0b1a38] border border-white/15 text-white text-xs rounded-xl px-3 py-3 focus:outline-none"
                    >
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n} className="bg-[#10234a]">
                          {n} Child{n !== 1 ? 'ren' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Stay / Hotel Tier
                  </label>
                  <select
                    value={accommodation}
                    onChange={(e) => setAccommodation(e.target.value)}
                    className="w-full bg-[#0b1a38] border border-white/15 text-white text-xs rounded-xl px-3 py-3 focus:outline-none"
                  >
                    <option value="Premium 4-Star" className="bg-[#10234a]">Premium 4-Star Resorts</option>
                    <option value="Luxury 5-Star & Heritage" className="bg-[#10234a]">Luxury 5-Star & Heritage Villas</option>
                    <option value="Standard 3-Star Budget" className="bg-[#10234a]">Comfortable 3-Star (Value)</option>
                    <option value="Private Houseboat / Ayurveda Retreat" className="bg-[#10234a]">Private Houseboat / Ayurveda Retreat</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Special Requirements or Flight Details
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Need Cochin airport Innova Crysta pickup, Arabic speaking driver, pool villa in Munnar, or flight quotes from Riyadh..."
                  className="w-full bg-[#0b1a38] border border-white/15 focus:border-[#42bfd8] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                  {formError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#20a88a] hover:bg-[#1a8a71] text-white rounded-xl font-heading font-extrabold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Send Enquiry to WhatsApp (+91 70929 36243)</span>
                <Send className="w-4 h-4 text-emerald-200" />
              </button>
            </form>
          </div>

          {/* Right Column: In-Page Confirmation & Trust */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dynamic In-Page Response Box if submitted */}
            {submittedMessage ? (
              <div className="bg-[#142c5c] border-2 border-[#20a88a] rounded-3xl p-6 sm:p-7 shadow-xl animate-in fade-in duration-300">
                <div className="flex items-center gap-2.5 text-[#20a88a] font-bold text-sm mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Enquiry Dispatched to WhatsApp!</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                  If WhatsApp did not automatically open on your device, tap the button below to start the chat directly:
                </p>

                <a
                  href={getWhatsAppLink(submittedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mb-3 inline-flex items-center justify-center gap-2 bg-[#20a88a] hover:bg-[#1a8a71] text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Open WhatsApp Directly</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors border border-white/20 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Enquiry Text Copied!' : 'Copy Enquiry Message Text'}</span>
                </button>
              </div>
            ) : (
              <div className="bg-[#142c5c] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl">
                <div className="flex items-center gap-2 text-sm font-bold text-[#f5d64c] mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Fast WhatsApp Response</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                  Our Onattukara travel coordinators respond with clear day-wise options, hotel recommendations, and transparent vehicle pricing within hours.
                </p>

                <div className="space-y-3.5 text-xs text-slate-200 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#20a88a] flex-shrink-0 mt-0.5" />
                    <span>Real humans only — no automated robotic loops</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#42bfd8] flex-shrink-0 mt-0.5" />
                    <span>Flexible hotel swaps and customized private routes</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#f5d64c] flex-shrink-0 mt-0.5" />
                    <span>Official desk: <strong>+91 70929 36243</strong></span>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Contact Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-xs text-slate-300 space-y-3">
              <div className="font-bold text-white text-sm">Need urgent assistance?</div>
              <p className="font-light leading-relaxed">
                You can also call our direct Kerala desk or chat with us right now on WhatsApp.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="text-white hover:text-[#42bfd8] font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <span>Direct Phone:</span>
                  <span className="text-[#42bfd8]">{CONTACT_INFO.phone}</span>
                </a>
                <a
                  href={getWhatsAppLink('Hello Nimble Holidays! I am calling from your website.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Chat directly on WhatsApp: {CONTACT_INFO.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
