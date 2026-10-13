'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTrip, CURRENCIES, CurrencyCode } from '@/context/TripContext';
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
  ArrowRight,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getWhatsAppLink } from '@/data/contact';

const COUNTRY_DIAL_CODES = [
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
];

export const TripPlanner: React.FC = () => {
  const {
    selectedDestinations,
    selectedIds,
    removeDestination,
    clearTrip,
    currency,
    setCurrency,
    plannerNotes,
    setPlannerNotes,
  } = useTrip();

  // Form Fields
  const [name, setName] = useState('');
  const [dialCode, setDialCode] = useState('+966');
  const [phone, setPhone] = useState('');
  const [residence, setResidence] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFlexible, setIsFlexible] = useState(false);
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [accommodation, setAccommodation] = useState('Premium 4-Star');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [includedServices, setIncludedServices] = useState<string[]>([
    'Airport transfers & vehicle',
    'Hotel reservations',
    'Sightseeing tours',
  ]);

  // Submission State
  const [enquiryRef, setEnquiryRef] = useState<string | null>(null);
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [today, setToday] = useState('');

  React.useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const toggleService = (svc: string) => {
    setIncludedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      setFormError('Please enter a valid WhatsApp number so our team can send the quotation.');
      return;
    }
    if (selectedDestinations.length === 0 && !plannerNotes.trim()) {
      setFormError('Please select at least one destination above or describe your trip in the notes.');
      return;
    }
    if (!isFlexible && startDate && endDate && endDate < startDate) {
      setFormError('Your travel end date is before the start date. Please verify your dates.');
      return;
    }

    const ref = `NH-KRL-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    setEnquiryRef(ref);

    const placesList = selectedDestinations.length
      ? selectedDestinations.map((d) => d.name).join(', ')
      : 'Custom destinations specified in notes';

    const datesText = isFlexible
      ? startDate
        ? `Flexible (Around ${startDate})`
        : 'Flexible dates'
      : startDate && endDate
      ? `${startDate} to ${endDate}`
      : startDate
      ? `Starting ${startDate}`
      : 'Dates to be decided';

    const fullPhone = `${dialCode} ${phone.trim()}`;

    const summary = [
      `🌴 *Nimble Holidays Custom Trip Enquiry* (${ref})`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `• *Lead Traveller:* ${name.trim()}`,
      `• *WhatsApp:* ${fullPhone}`,
      residence.trim() ? `• *Travelling From:* ${residence.trim()}` : null,
      `• *Selected Places:* ${placesList}`,
      `• *Travel Dates:* ${datesText}`,
      `• *Group Size:* ${adults} Adult(s)${Number(children) > 0 ? `, ${children} Child(ren)` : ''}`,
      `• *Stay Preference:* ${accommodation}`,
      budgetAmount
        ? `• *Target Budget:* ${CURRENCIES[currency].symbol} ${budgetAmount} ${currency} / person`
        : null,
      includedServices.length
        ? `• *Required Services:* ${includedServices.join(', ')}`
        : null,
      plannerNotes.trim() ? `• *Special Notes / Occasion:*\n  ${plannerNotes.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Submitted via Nimble Holidays Web Platform._`,
      `_Please prepare a customized itinerary and quotation._`,
    ]
      .filter(Boolean)
      .join('\n');

    setGeneratedSummary(summary);

    // Save lead to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('nh-leads') || '[]');
      existing.push({
        ref,
        name: name.trim(),
        phone: fullPhone,
        summary,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('nh-leads', JSON.stringify(existing.slice(-20)));
    } catch {
      // Ignore storage errors
    }
  };

  const copySummary = () => {
    if (!generatedSummary) return;
    navigator.clipboard.writeText(generatedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappHref = generatedSummary
    ? getWhatsAppLink(generatedSummary)
    : '#';

  return (
    <section id="trip-planner" className="py-20 lg:py-28 bg-[#10234a] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#42bfd8] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#42bfd8]" />
            <span>Create Your Own Trip · Quotation Request</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight mb-4">
            Have a journey in mind? <br />
            <span className="text-[#83d6e8] italic font-serif font-light">Let’s shape it together.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Review your selected places on the left, fill out your travel dates and preferences,
            and our team will prepare a transparent, customized quotation for you.
          </p>
        </div>

        {/* 2-Column Split: Trip Cart vs Quotation Form */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Your Trip List (Sticky) */}
          <div className="lg:col-span-5 bg-[#173266] rounded-3xl p-6 sm:p-7 border border-white/10 shadow-lg lg:sticky lg:top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Your Trip Wishlist
                </h3>
                <span className="text-xs text-[#83d6e8]">
                  {selectedDestinations.length}{' '}
                  {selectedDestinations.length === 1 ? 'place' : 'places'} selected
                </span>
              </div>
              {selectedDestinations.length > 0 && (
                <button
                  type="button"
                  onClick={clearTrip}
                  className="text-xs text-slate-300 hover:text-red-300 underline transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* List of Destinations */}
            {selectedDestinations.length === 0 ? (
              <div className="py-10 px-4 text-center border border-dashed border-white/20 rounded-2xl">
                <p className="text-sm text-slate-300 mb-3">
                  Your trip list is currently empty.
                </p>
                <a
                  href="#destinations"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f5d64c] hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  <span>Browse destinations above and tap + Add</span>
                </a>
              </div>
            ) : (
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                {selectedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 transition-colors"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-bold text-sm text-white truncate">
                        {dest.name}
                      </h4>
                      <span className="text-[11px] text-[#42bfd8] block">
                        {dest.regionLabel} · {dest.duration}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDestination(dest.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove from trip"
                      aria-label={`Remove ${dest.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Reassurance Note */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#20a88a] flex-shrink-0" />
                <span>Zero obligation · No payment taken here</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#f5d64c] flex-shrink-0" />
                <span>Fast customized quotation delivered on WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quotation Form or Result */}
          <div className="lg:col-span-7 bg-white text-slate-800 rounded-3xl p-6 sm:p-9 shadow-2xl border border-slate-100">
            {generatedSummary ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#20a88a]">
                      Quotation Request Prepared
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-[#182e5c]">
                      Reference #{enquiryRef}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#20a88a]/15 text-[#20a88a] flex items-center justify-center font-bold text-lg">
                    ✓
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Thank you, <strong>{name}</strong>! Your customized trip brief has been compiled.
                  Click below to send this directly to our travel specialists on WhatsApp. Our team will
                  review availability, optimize travel routes, and prepare your itemized quotation.
                </p>

                {/* Preformatted Summary Display */}
                <div className="relative">
                  <pre className="font-mono-code text-xs bg-slate-50 border border-slate-200 p-4 rounded-2xl whitespace-pre-wrap text-slate-800 leading-relaxed overflow-x-auto max-h-[300px]">
                    {generatedSummary}
                  </pre>
                </div>

                {/* Dispatch & Copy Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#67C15E] hover:bg-[#5bb353] text-white py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg text-center touch-manipulation min-h-[48px]"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Send Enquiry on WhatsApp</span>
                    <span>↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={copySummary}
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer touch-manipulation min-h-[44px]"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#20a88a]" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGeneratedSummary(null)}
                    className="py-2 sm:py-4 px-3 text-xs font-bold text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer text-center"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-[#182e5c] mb-1">
                    Tell us your travel preferences
                  </h3>
                  <p className="text-xs text-slate-500">
                    We tailor every itinerary to your budget, dates, and group composition.
                  </p>
                </div>

                {/* Full Name & WhatsApp */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Abdullah / Priya Menon"
                      className="w-full px-3.5 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      WhatsApp Number *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={dialCode}
                        onChange={(e) => setDialCode(e.target.value)}
                        className="w-28 px-2 py-3 text-xs font-bold bg-slate-100 border border-slate-200 rounded-xl focus:outline-none text-slate-800"
                      >
                        {COUNTRY_DIAL_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="5X XXX XXXX"
                        className="flex-1 min-w-0 px-3.5 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Country of Residence */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Where are you travelling from? (City / Country)
                  </label>
                  <input
                    type="text"
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    placeholder="e.g. Riyadh, Jeddah, Dammam, Dubai, Doha, Mumbai, London"
                    className="w-full px-3.5 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                  />
                </div>

                {/* Travel Dates & Flexible Toggle */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#318bc6]" />
                      <span>Travel Dates</span>
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFlexible}
                        onChange={(e) => setIsFlexible(e.target.checked)}
                        className="w-4 h-4 accent-[#20a88a] rounded"
                      />
                      <span>My dates are flexible</span>
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                        Travel Starts {isFlexible ? '(Tentative)' : ''}
                      </span>
                      <input
                        type="date"
                        min={today}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                      />
                    </div>

                    {!isFlexible && (
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                          Travel Ends
                        </span>
                        <input
                          type="date"
                          min={startDate || today}
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Adults, Children */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Adults (12+ yrs)
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 30].map((n) => (
                        <option key={n} value={n}>
                          {n} Adult{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Children (under 12)
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} Child{n > 1 ? 'ren' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stay Preference & Budget */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Accommodation Comfort
                    </label>
                    <select
                      value={accommodation}
                      onChange={(e) => setAccommodation(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    >
                      <option>Comfort (3-Star & Quality Inns)</option>
                      <option>Premium (4-Star Hotels & Stays)</option>
                      <option>Luxury (5-Star & Heritage Palaces)</option>
                      <option>Resorts, Private Villas & Houseboats</option>
                      <option>Open to Expert Suggestions</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Target Budget (per person)
                    </label>
                    <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50 focus-within:border-[#318bc6]">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                        className="bg-slate-100 text-xs font-bold px-3 py-3 border-r border-slate-200 focus:outline-none text-slate-700"
                      >
                        <option value="INR">₹ INR</option>
                        <option value="SAR">SAR</option>
                        <option value="AED">AED</option>
                        <option value="QAR">QAR</option>
                        <option value="KWD">KWD</option>
                        <option value="OMR">OMR</option>
                        <option value="USD">$ USD</option>
                      </select>
                      <input
                        type="number"
                        min="0"
                        value={budgetAmount}
                        onChange={(e) => setBudgetAmount(e.target.value)}
                        placeholder="e.g. 35000 / Flexible"
                        className="flex-1 min-w-0 px-3.5 py-3 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Inclusions Checkboxes */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Also Include in My Quotation
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Flight tickets enquiry',
                      'Airport transfers & vehicle',
                      'Hotel reservations',
                      'Sightseeing tours',
                      'Houseboat overnight stay',
                      'Ayurveda massage sessions',
                    ].map((svc) => (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => toggleService(svc)}
                        className={`text-xs px-3 py-2 rounded-xl border font-semibold transition-all cursor-pointer ${
                          includedServices.includes(svc)
                            ? 'bg-[#20a88a]/15 text-[#13745f] border-[#20a88a]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {includedServices.includes(svc) ? '✓ ' : '+ '}
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Notes */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Anything else we should know? (Occasion, food, mobility needs)
                  </label>
                  <textarea
                    rows={3}
                    value={plannerNotes}
                    onChange={(e) => setPlannerNotes(e.target.value)}
                    placeholder="e.g. Honeymoon trip, vegetarian meals, elderly parents joining, want tranquil scenic views..."
                    className="w-full px-3.5 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800 leading-relaxed"
                  />
                </div>

                {formError && (
                  <p className="text-xs font-semibold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                    {formError}
                  </p>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4.5 bg-[#182e5c] hover:bg-[#203a78] text-white rounded-xl font-bold text-sm sm:text-base shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#42bfd8]" />
                  <span>Request My Custom Quotation</span>
                  <ArrowRight className="w-4 h-4 text-[#f5d64c]" />
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  Your contact details are kept strictly confidential for your itinerary quotation only.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
